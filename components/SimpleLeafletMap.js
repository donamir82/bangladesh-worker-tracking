import React, { useState, useMemo } from 'react';
import { Users, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';

// Simple Leaflet Map Component that works with Next.js SSR
const SimpleLeafletMap = ({ workers, onCountrySelect, selectedCountry }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Calculate worker statistics by country
  const countryStats = useMemo(() => {
    const stats = {};
    workers.forEach(worker => {
      const country = worker.destination;
      if (!stats[country]) {
        stats[country] = { total: 0, safe: 0, emergency: 0, overdue: 0 };
      }
      stats[country].total++;
      if (worker.status === 'safe') stats[country].safe++;
      else if (worker.status === 'emergency') stats[country].emergency++;
      else if (worker.status === 'check_overdue') stats[country].overdue++;
    });
    return stats;
  }, [workers]);

  // Filter workers based on selected country
  const filteredWorkers = selectedCountry 
    ? workers.filter(worker => worker.destination === selectedCountry)
    : workers;

  // Initialize map when component mounts (client-side only)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeMap = async () => {
      try {
        // Import Leaflet dynamically
        const L = (await import('leaflet')).default;
        
        // Fix for default markers (use CDN)
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Create map
        const map = L.map('leaflet-map').setView([25.0, 55.0], 3);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add markers for each worker
        filteredWorkers.forEach(worker => {
          const color = worker.status === 'emergency' ? 'red' : 
                       worker.status === 'check_overdue' ? 'orange' : 'green';
          
          const marker = L.marker([worker.location.lat, worker.location.lng])
            .addTo(map)
            .bindPopup(`
              <div style="padding: 8px;">
                <h4 style="margin: 0 0 8px 0; font-weight: bold;">${worker.name}</h4>
                <p style="margin: 4px 0;"><strong>Country:</strong> ${worker.destination}</p>
                <p style="margin: 4px 0;"><strong>Status:</strong> 
                  <span style="color: ${color};">${worker.status.replace('_', ' ').toUpperCase()}</span>
                </p>
                <p style="margin: 4px 0;"><strong>Job:</strong> ${worker.jobCategory}</p>
                <button onclick="window.filterByCountry('${worker.destination}')" 
                        style="background: #2563eb; color: white; border: none; padding: 4px 8px; border-radius: 4px; margin-top: 8px; cursor: pointer;">
                  Filter by ${worker.destination}
                </button>
              </div>
            `);
        });

        // Add Bangladesh origin marker
        L.marker([23.6850, 90.3563])
          .addTo(map)
          .bindPopup(`
            <div style="padding: 8px;">
              <h4 style="margin: 0 0 8px 0; font-weight: bold;">🇧🇩 Bangladesh</h4>
              <p style="margin: 4px 0;">Origin Country</p>
              <p style="margin: 4px 0;">Workers deployed to ${Object.keys(countryStats).length} countries</p>
            </div>
          `);

        // Set global filter function
        window.filterByCountry = (country) => {
          if (onCountrySelect) {
            onCountrySelect(country === selectedCountry ? null : country);
          }
        };

        setIsMapLoaded(true);
        
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    initializeMap();
    
    // Cleanup
    return () => {
      if (window.filterByCountry) {
        delete window.filterByCountry;
      }
    };
  }, [filteredWorkers, selectedCountry, onCountrySelect, countryStats]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Professional Worker Tracking Map
        </h3>
        <div className="text-sm text-gray-500">
          {filteredWorkers.length} workers tracked • Interactive map
        </div>
      </div>

      {/* Map Container */}
      <div className="mb-6 rounded-lg overflow-hidden border border-gray-300" style={{ height: '600px', position: 'relative' }}>
        <div id="leaflet-map" style={{ height: '100%', width: '100%' }}></div>
        
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading interactive map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Country Statistics Grid */}
      <div>
        <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-blue-600" />
          Country Statistics
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(countryStats)
            .sort(([,a], [,b]) => b.total - a.total)
            .map(([country, stats]) => (
              <div
                key={country}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedCountry === country
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onCountrySelect?.(country === selectedCountry ? null : country)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">{country}</span>
                  <span className="text-lg font-bold text-blue-600">{stats.total}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium">{stats.safe}</span>
                  </div>
                  {stats.overdue > 0 && (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-orange-700 font-medium">{stats.overdue}</span>
                    </div>
                  )}
                  {stats.emergency > 0 && (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-red-700 font-medium">{stats.emergency}</span>
                    </div>
                  )}
                </div>
                
                {/* Status bar */}
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="flex h-full">
                    <div
                      className="bg-green-500 transition-all duration-300"
                      style={{ width: `${(stats.safe / stats.total) * 100}%` }}
                    />
                    <div
                      className="bg-orange-500 transition-all duration-300"
                      style={{ width: `${(stats.overdue / stats.total) * 100}%` }}
                    />
                    <div
                      className="bg-red-500 transition-all duration-300"
                      style={{ width: `${(stats.emergency / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Map Legend and Controls */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-sm text-gray-600">
            {selectedCountry ? (
              <span>
                <span className="font-semibold">Filtered by:</span> {selectedCountry} 
                <button 
                  onClick={() => onCountrySelect?.(null)}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filter
                </button>
              </span>
            ) : (
              'Showing all worker locations • Click markers for details'
            )}
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Safe</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Check Overdue</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Emergency</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          Professional interactive map • Click and drag to pan • Use mouse wheel to zoom
        </div>
      </div>
    </div>
  );
};

export default SimpleLeafletMap;
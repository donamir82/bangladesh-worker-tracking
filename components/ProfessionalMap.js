import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Users, AlertTriangle, CheckCircle, MapPin } from 'lucide-react';

// Custom map component with professional Leaflet/OpenStreetMap
const ProfessionalMap = ({ workers, onCountrySelect, selectedCountry }) => {
  const [map, setMap] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

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

  // Get marker color based on worker status
  const getMarkerColor = (status) => {
    switch (status) {
      case 'emergency': return '#ef4444'; // red
      case 'check_overdue': return '#f59e0b'; // orange
      case 'safe': return '#10b981'; // green
      default: return '#6b7280'; // gray
    }
  };

  // Create custom marker icon
  const createCustomIcon = (status, count = 1) => {
    const color = getMarkerColor(status);
    const size = Math.min(40, Math.max(20, 15 + count * 2)); // Scale with worker count
    
    return {
      iconUrl: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="${color}" stroke="#ffffff" stroke-width="2"/>
          <text x="12" y="16" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">
            ${count > 9 ? '9+' : count}
          </text>
        </svg>
      `)}`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    };
  };

  // Group workers by location for clustering
  const workerClusters = useMemo(() => {
    const clusters = {};
    workers.forEach(worker => {
      const key = `${worker.location.lat.toFixed(2)}_${worker.location.lng.toFixed(2)}_${worker.destination}`;
      if (!clusters[key]) {
        clusters[key] = {
          lat: worker.location.lat,
          lng: worker.location.lng,
          country: worker.destination,
          workers: [],
          worstStatus: 'safe'
        };
      }
      clusters[key].workers.push(worker);
      
      // Determine worst status for cluster color
      if (worker.status === 'emergency' || clusters[key].worstStatus === 'emergency') {
        clusters[key].worstStatus = 'emergency';
      } else if (worker.status === 'check_overdue' && clusters[key].worstStatus !== 'emergency') {
        clusters[key].worstStatus = 'check_overdue';
      }
    });
    return Object.values(clusters);
  }, [workers]);

  // Filter clusters based on selected country
  const filteredClusters = selectedCountry 
    ? workerClusters.filter(cluster => cluster.country === selectedCountry)
    : workerClusters;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Global Worker Tracking Map
        </h3>
        <div className="text-sm text-gray-500">
          {workers.length} workers tracked • Real-time locations
        </div>
      </div>

      {/* Professional Map Container */}
      <div className="mb-6 rounded-lg overflow-hidden border border-gray-300" style={{ height: '600px' }}>
        <MapContainer
          center={[25.0, 55.0]} // Center on Middle East
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          ref={setMap}
        >
          {/* OpenStreetMap tiles - professional and free */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Worker location markers */}
          {filteredClusters.map((cluster, index) => {
            const customIcon = createCustomIcon(cluster.worstStatus, cluster.workers.length);
            
            return (
              <Marker
                key={index}
                position={[cluster.lat, cluster.lng]}
                icon={customIcon}
              >
                <Popup className="custom-popup">
                  <div className="p-2">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      {cluster.country}
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <strong>{cluster.workers.length}</strong> worker{cluster.workers.length !== 1 ? 's' : ''} in this area
                      </div>
                      
                      <div className="space-y-1">
                        {cluster.workers.slice(0, 3).map((worker, idx) => (
                          <div key={idx} className="text-xs bg-gray-50 p-2 rounded">
                            <div className="font-medium">{worker.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                worker.status === 'safe' ? 'bg-green-100 text-green-700' :
                                worker.status === 'check_overdue' ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {worker.status === 'safe' ? 'Safe' : 
                                 worker.status === 'check_overdue' ? 'Check Overdue' : 'Emergency'}
                              </span>
                              <span className="text-gray-500">{worker.jobCategory}</span>
                            </div>
                          </div>
                        ))}
                        {cluster.workers.length > 3 && (
                          <div className="text-xs text-gray-500 text-center pt-1">
                            +{cluster.workers.length - 3} more workers
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={() => onCountrySelect?.(cluster.country === selectedCountry ? null : cluster.country)}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                      >
                        {selectedCountry === cluster.country ? 'Clear Filter' : 'Filter by ' + cluster.country}
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          {/* Bangladesh origin marker */}
          <Marker 
            position={[23.6850, 90.3563]} 
            icon={{
              iconUrl: `data:image/svg+xml,${encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#1d4ed8" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="6" fill="#ffffff" opacity="0.9"/>
                  <text x="12" y="16" text-anchor="middle" fill="#1d4ed8" font-family="Arial, sans-serif" font-size="10" font-weight="bold">BD</text>
                </svg>
              `)}`,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
              popupAnchor: [0, -16],
            }}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                  🇧🇩 Bangladesh
                </h4>
                <p className="text-sm text-gray-600">Origin Country</p>
                <p className="text-xs text-gray-500 mt-1">Workers deployed to {Object.keys(countryStats).length} countries</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
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
          • Click and drag to pan • Use mouse wheel to zoom • Click markers to see worker details
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMap;
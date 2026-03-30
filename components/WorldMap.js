import React, { useState, useMemo } from 'react';
import { Globe, MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';

// Professional Interactive World Map Component
const WorldMap = ({ workers, onCountrySelect, selectedCountry }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Calculate worker statistics by destination country
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

  // Get country color based on worker status
  const getCountryColor = (countryName) => {
    const stats = countryStats[countryName];
    if (!stats || stats.total === 0) return '#f3f4f6'; // Light gray for no workers
    if (stats.emergency > 0) return '#ef4444'; // Red for emergencies
    if (stats.overdue > 0) return '#f59e0b'; // Orange for overdue
    return '#10b981'; // Green for all safe
  };

  // Get country opacity based on worker count
  const getCountryOpacity = (countryName) => {
    const stats = countryStats[countryName];
    if (!stats || stats.total === 0) return 0.3;
    return Math.min(1, 0.4 + (stats.total / 20)); // Scale opacity with worker count
  };

  // Handle country click
  const handleCountryClick = (countryName) => {
    const stats = countryStats[countryName];
    if (stats && stats.total > 0) {
      onCountrySelect?.(countryName === selectedCountry ? null : countryName);
    }
  };

  // Pan/zoom handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Countries with Bangladeshi workers (larger, more detailed paths for better visibility)
  const workerCountries = [
    {
      name: 'Saudi Arabia',
      path: 'M650 240 L750 225 L780 280 L760 320 L700 310 L650 270 Z',
      labelX: 715,
      labelY: 270
    },
    {
      name: 'UAE', 
      path: 'M760 280 L800 275 L810 295 L790 305 L760 300 Z',
      labelX: 785,
      labelY: 290
    },
    {
      name: 'Qatar',
      path: 'M740 270 L755 265 L760 285 L745 290 Z',
      labelX: 750,
      labelY: 278
    },
    {
      name: 'Kuwait',
      path: 'M720 250 L745 245 L750 265 L730 270 Z',
      labelX: 735,
      labelY: 258
    },
    {
      name: 'Oman',
      path: 'M780 305 L820 300 L840 350 L810 365 L780 345 Z',
      labelX: 810,
      labelY: 330
    },
    {
      name: 'Bahrain',
      path: 'M745 268 L752 266 L754 274 L748 276 Z',
      labelX: 750,
      labelY: 271
    },
    {
      name: 'Jordan',
      path: 'M630 230 L655 225 L665 255 L640 265 Z',
      labelX: 648,
      labelY: 245
    },
    {
      name: 'Malaysia',
      path: 'M950 370 L1020 365 L1040 390 L1000 400 L970 395 L950 385 Z',
      labelX: 995,
      labelY: 382
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          Global Worker Distribution
        </h3>
        <div className="text-sm text-gray-500">
          Click countries to filter • {Object.values(countryStats).reduce((sum, stats) => sum + stats.total, 0)} workers tracked
        </div>
      </div>

      {/* Full-width map with zoom controls */}
      <div className="mb-6">
        <div className="relative bg-slate-50 rounded-lg border p-4" style={{ minHeight: '500px' }}>
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}
              className="bg-white hover:bg-gray-50 border border-gray-300 rounded px-3 py-1 text-sm font-medium shadow-sm"
            >
              🔍+
            </button>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
              className="bg-white hover:bg-gray-50 border border-gray-300 rounded px-3 py-1 text-sm font-medium shadow-sm"
            >
              🔍-
            </button>
            <button 
              onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
              className="bg-white hover:bg-gray-50 border border-gray-300 rounded px-3 py-1 text-sm font-medium shadow-sm"
            >
              Reset
            </button>
          </div>
          <svg 
            viewBox="0 0 1200 600" 
            className="w-full h-full cursor-move" 
            style={{ 
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transition: 'transform 0.2s ease'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
              {/* World background */}
              <rect width="1200" height="600" fill="#e2e8f0" className="opacity-20" />
              
              {/* Continents outline (simplified but larger) */}
              <g stroke="#94a3b8" strokeWidth="2" fill="#f1f5f9" opacity="0.3">
                {/* Africa simplified */}
                <path d="M580 240 L640 220 L680 240 L720 360 L680 460 L580 440 L540 380 L560 300 Z" />
                {/* Europe simplified */}
                <path d="M560 140 L640 130 L680 170 L620 200 L560 190 Z" />
                {/* Asia simplified */}  
                <path d="M680 120 L900 110 L1000 150 L1040 250 L980 320 L900 310 L800 250 L720 190 Z" />
                {/* Australia */}
                <path d="M900 450 L1000 440 L1020 480 L960 490 Z" />
                {/* Americas (for context) */}
                <path d="M100 200 L200 180 L250 300 L200 450 L100 420 L80 350 Z" />
                <path d="M200 100 L300 90 L320 200 L280 250 L200 240 Z" />
              </g>

              {/* Worker destination countries */}
              {workerCountries.map(country => {
                const stats = countryStats[country.name];
                const isSelected = selectedCountry === country.name;
                const isHovered = hoveredCountry === country.name;
                const hasWorkers = stats && stats.total > 0;
                
                if (!hasWorkers) return null;

                return (
                  <g key={country.name}>
                    {/* Country shape */}
                    <path
                      d={country.path}
                      fill={getCountryColor(country.name)}
                      opacity={getCountryOpacity(country.name)}
                      stroke={isSelected ? '#1d4ed8' : isHovered ? '#3b82f6' : '#6b7280'}
                      strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredCountry(country.name)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => handleCountryClick(country.name)}
                    />
                    
                    {/* Country label and stats */}
                    <g
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredCountry(country.name)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => handleCountryClick(country.name)}
                    >
                      <text
                        x={country.labelX}
                        y={country.labelY - 12}
                        textAnchor="middle"
                        className="text-sm font-bold fill-gray-900"
                        style={{ fontSize: '14px' }}
                      >
                        {country.name}
                      </text>
                      <text
                        x={country.labelX}
                        y={country.labelY + 8}
                        textAnchor="middle"
                        className="text-sm fill-gray-700"
                        style={{ fontSize: '12px' }}
                      >
                        {stats.total} workers
                      </text>
                    </g>
                    
                    {/* Status indicator */}
                    <circle
                      cx={country.labelX + 35}
                      cy={country.labelY - 12}
                      r="6"
                      fill={stats.emergency > 0 ? '#ef4444' : stats.overdue > 0 ? '#f59e0b' : '#10b981'}
                      className="drop-shadow-sm"
                    />
                  </g>
                );
              })}

              {/* Bangladesh (origin country) */}
              <g>
                <circle cx="850" cy="250" r="12" fill="#1d4ed8" className="animate-pulse" />
                <text x="870" y="258" className="text-lg font-bold fill-blue-800" style={{ fontSize: '16px' }}>
                  🇧🇩 Bangladesh
                </text>
                <text x="870" y="275" className="text-sm fill-blue-600" style={{ fontSize: '14px' }}>
                  Origin Country
                </text>
              </g>
            </svg>

            {/* Zoom/Pan instructions */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-sm z-10">
              <div className="text-xs text-gray-600">
                Use controls to zoom • Drag to pan when zoomed
              </div>
            </div>

            {/* Hover tooltip */}
            {hoveredCountry && (
              <div className="absolute top-20 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg z-20">
                <div className="text-sm font-semibold text-gray-900 mb-2">{hoveredCountry}</div>
                {countryStats[hoveredCountry] && (
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-600">Total Workers:</span>
                      <span className="font-semibold">{countryStats[hoveredCountry].total}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-green-600">Safe:</span>
                      <span className="font-semibold text-green-700">{countryStats[hoveredCountry].safe}</span>
                    </div>
                    {countryStats[hoveredCountry].overdue > 0 && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-orange-600">Overdue:</span>
                        <span className="font-semibold text-orange-700">{countryStats[hoveredCountry].overdue}</span>
                      </div>
                    )}
                    {countryStats[hoveredCountry].emergency > 0 && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-red-600">Emergency:</span>
                        <span className="font-semibold text-red-700">{countryStats[hoveredCountry].emergency}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">Click to filter workers</div>
              </div>
            )}
          </div>
        </div>

      {/* Country Statistics - Full width below map */}
      <div className="mt-6">
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
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedCountry === country
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleCountryClick(country)}
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
                      className="bg-green-500"
                      style={{ width: `${(stats.safe / stats.total) * 100}%` }}
                    />
                    <div
                      className="bg-orange-500"
                      style={{ width: `${(stats.overdue / stats.total) * 100}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${(stats.emergency / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Map Legend and Status */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-sm text-gray-600">
            {selectedCountry ? (
              <span>
                <span className="font-semibold">Filtered by:</span> {selectedCountry} 
                <button 
                  onClick={() => onCountrySelect(null)}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filter
                </button>
              </span>
            ) : (
              'Showing all countries with Bangladeshi workers'
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
      </div>
    </div>
  );
};

export default WorldMap;
import React, { useState, useMemo } from 'react';
import { Globe, MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';

// Professional Interactive World Map Component
const WorldMap = ({ workers, onCountrySelect, selectedCountry }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

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

  // Countries with Bangladeshi workers (simplified world map paths)
  const workerCountries = [
    {
      name: 'Saudi Arabia',
      path: 'M520 200 L580 190 L590 230 L570 250 L530 240 L520 220 Z',
      labelX: 550,
      labelY: 220
    },
    {
      name: 'UAE', 
      path: 'M580 230 L600 225 L605 235 L595 240 L580 235 Z',
      labelX: 592,
      labelY: 232
    },
    {
      name: 'Qatar',
      path: 'M570 225 L575 220 L577 230 L572 232 Z',
      labelX: 574,
      labelY: 227
    },
    {
      name: 'Kuwait',
      path: 'M560 210 L575 205 L578 215 L565 218 Z',
      labelX: 569,
      labelY: 211
    },
    {
      name: 'Oman',
      path: 'M590 240 L610 235 L620 260 L600 265 L590 250 Z',
      labelX: 605,
      labelY: 250
    },
    {
      name: 'Bahrain',
      path: 'M572 218 L576 216 L577 222 L574 223 Z',
      labelX: 574,
      labelY: 220
    },
    {
      name: 'Jordan',
      path: 'M510 190 L525 185 L530 205 L515 210 Z',
      labelX: 520,
      labelY: 198
    },
    {
      name: 'Malaysia',
      path: 'M700 280 L750 275 L760 290 L740 295 L720 292 L700 288 Z',
      labelX: 730,
      labelY: 285
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <div className="relative bg-slate-50 rounded-lg border p-4" style={{ aspectRatio: '16/10' }}>
            <svg viewBox="0 0 900 500" className="w-full h-full">
              {/* World background (simplified) */}
              <rect width="900" height="500" fill="#e2e8f0" className="opacity-20" />
              
              {/* Continents outline (very simplified) */}
              <g stroke="#94a3b8" strokeWidth="1" fill="#f1f5f9" opacity="0.3">
                {/* Africa simplified */}
                <path d="M480 200 L520 180 L540 200 L560 280 L520 350 L480 340 L460 300 L470 250 Z" />
                {/* Europe simplified */}
                <path d="M460 120 L520 110 L540 140 L500 160 L460 150 Z" />
                {/* Asia simplified */}  
                <path d="M540 100 L700 90 L800 120 L820 200 L780 250 L700 240 L640 200 L580 150 Z" />
                {/* Australia */}
                <path d="M700 350 L780 340 L800 370 L750 380 Z" />
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
                        y={country.labelY - 8}
                        textAnchor="middle"
                        className="text-xs font-semibold fill-gray-800"
                      >
                        {country.name}
                      </text>
                      <text
                        x={country.labelX}
                        y={country.labelY + 6}
                        textAnchor="middle"
                        className="text-xs fill-gray-600"
                      >
                        {stats.total} workers
                      </text>
                    </g>
                    
                    {/* Status indicator */}
                    <circle
                      cx={country.labelX + 25}
                      cy={country.labelY - 8}
                      r="4"
                      fill={stats.emergency > 0 ? '#ef4444' : stats.overdue > 0 ? '#f59e0b' : '#10b981'}
                      className="drop-shadow-sm"
                    />
                  </g>
                );
              })}

              {/* Bangladesh (origin country) */}
              <g>
                <circle cx="650" cy="200" r="8" fill="#1d4ed8" className="animate-pulse" />
                <text x="665" y="205" className="text-sm font-semibold fill-blue-800">
                  🇧🇩 Bangladesh
                </text>
                <text x="665" y="218" className="text-xs fill-blue-600">
                  Origin Country
                </text>
              </g>
            </svg>

            {/* Hover tooltip */}
            {hoveredCountry && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg z-10">
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

        {/* Country Statistics Panel */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            Country Statistics
          </h4>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {Object.entries(countryStats)
              .sort(([,a], [,b]) => b.total - a.total)
              .map(([country, stats]) => (
                <div
                  key={country}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedCountry === country
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleCountryClick(country)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{country}</span>
                    <span className="text-sm text-gray-600">{stats.total} workers</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-green-700">{stats.safe}</span>
                    </div>
                    {stats.overdue > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-orange-600" />
                        <span className="text-orange-700">{stats.overdue}</span>
                      </div>
                    )}
                    {stats.emergency > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-red-600" />
                        <span className="text-red-700">{stats.emergency}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Status bar */}
                  <div className="mt-2 bg-gray-200 rounded-full h-1.5 overflow-hidden">
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
      </div>

      {/* Map Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedCountry ? `Filtered by: ${selectedCountry}` : 'Showing all countries'}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Safe</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Overdue</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Emergency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
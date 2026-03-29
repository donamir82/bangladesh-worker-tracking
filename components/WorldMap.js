import React, { useState, useMemo } from 'react';
import { Globe, MapPin, Users, TrendingUp } from 'lucide-react';

// Simplified world map with major worker destination countries
const WorldMap = ({ workers, onCountrySelect, selectedCountry }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Calculate worker distribution by country
  const countryStats = useMemo(() => {
    const stats = {};
    workers.forEach(worker => {
      const country = worker.location.country;
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

  // Define country positions and info for Middle East focus
  const countries = [
    { id: 'SA', name: 'Saudi Arabia', x: 400, y: 180, color: '#10b981', size: 'large' },
    { id: 'AE', name: 'UAE', x: 430, y: 200, color: '#3b82f6', size: 'medium' },
    { id: 'QA', name: 'Qatar', x: 420, y: 190, color: '#8b5cf6', size: 'small' },
    { id: 'KW', name: 'Kuwait', x: 410, y: 170, color: '#f59e0b', size: 'medium' },
    { id: 'OM', name: 'Oman', x: 450, y: 210, color: '#ef4444', size: 'medium' },
    { id: 'BH', name: 'Bahrain', x: 415, y: 185, color: '#06b6d4', size: 'small' },
    { id: 'JO', name: 'Jordan', x: 380, y: 160, color: '#84cc16', size: 'medium' },
    { id: 'LB', name: 'Lebanon', x: 375, y: 155, color: '#f97316', size: 'small' },
  ];

  const getCountryRadius = (country, size) => {
    const baseSize = size === 'large' ? 25 : size === 'medium' ? 18 : 12;
    const workerCount = countryStats[country.name]?.total || 0;
    const multiplier = Math.min(2, Math.max(0.5, workerCount / 10));
    return baseSize * multiplier;
  };

  const getCountryColor = (country) => {
    const stats = countryStats[country.name];
    if (!stats || stats.total === 0) return '#d1d5db';
    if (stats.emergency > 0) return '#ef4444'; // Red if any emergencies
    if (stats.overdue > 0) return '#f59e0b'; // Orange if overdue
    return '#10b981'; // Green if all safe
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          Global Worker Distribution
        </h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>All Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Check Overdue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Emergency</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Simplified world map SVG */}
        <svg viewBox="0 0 800 400" className="w-full h-64 bg-blue-50 rounded-lg">
          {/* Background ocean */}
          <rect width="800" height="400" fill="#dbeafe" />
          
          {/* Simplified continents */}
          <path d="M100,150 Q200,120 300,140 Q400,160 450,150 Q500,140 600,160 Q650,180 700,170 L700,350 Q600,340 500,350 Q400,360 300,350 Q200,340 100,350 Z" fill="#f3f4f6" />
          <path d="M200,80 Q300,60 400,80 Q500,100 600,90 L600,200 Q500,180 400,190 Q300,200 200,190 Z" fill="#f3f4f6" />
          <path d="M450,220 Q550,200 650,220 Q700,240 750,230 L750,350 Q700,340 650,350 Q550,360 450,350 Z" fill="#f3f4f6" />
          
          {/* Country circles */}
          {countries.map(country => {
            const stats = countryStats[country.name];
            const radius = getCountryRadius(country, country.size);
            const color = getCountryColor(country);
            const isSelected = selectedCountry === country.name;
            const isHovered = hoveredCountry === country.name;
            
            return (
              <g key={country.id}>
                <circle
                  cx={country.x}
                  cy={country.y}
                  r={radius + (isSelected ? 5 : 0)}
                  fill={color}
                  stroke={isSelected ? '#1f2937' : '#ffffff'}
                  strokeWidth={isSelected ? 3 : 2}
                  className="cursor-pointer transition-all duration-200 hover:opacity-80"
                  onClick={() => onCountrySelect(country.name)}
                  onMouseEnter={() => setHoveredCountry(country.name)}
                  onMouseLeave={() => setHoveredCountry(null)}
                />
                <text
                  x={country.x}
                  y={country.y + 4}
                  textAnchor="middle"
                  className="text-xs font-bold fill-white pointer-events-none"
                >
                  {stats?.total || 0}
                </text>
                
                {/* Country label */}
                <text
                  x={country.x}
                  y={country.y - radius - 8}
                  textAnchor="middle"
                  className={`text-xs font-medium pointer-events-none ${
                    isHovered || isSelected ? 'fill-gray-900' : 'fill-gray-600'
                  }`}
                >
                  {country.name}
                </text>
              </g>
            );
          })}

          {/* Bangladesh indicator */}
          <g>
            <circle cx="500" cy="160" r="8" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
            <text x="500" y="145" textAnchor="middle" className="text-xs font-bold fill-gray-900">
              🇧🇩 Bangladesh
            </text>
          </g>
        </svg>

        {/* Country details tooltip */}
        {hoveredCountry && countryStats[hoveredCountry] && (
          <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-10">
            <h4 className="font-bold text-gray-900 mb-2">{hoveredCountry}</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between gap-4">
                <span>Total Workers:</span>
                <span className="font-medium">{countryStats[hoveredCountry].total}</span>
              </div>
              <div className="flex justify-between gap-4 text-green-600">
                <span>Safe:</span>
                <span className="font-medium">{countryStats[hoveredCountry].safe}</span>
              </div>
              {countryStats[hoveredCountry].overdue > 0 && (
                <div className="flex justify-between gap-4 text-orange-600">
                  <span>Check Overdue:</span>
                  <span className="font-medium">{countryStats[hoveredCountry].overdue}</span>
                </div>
              )}
              {countryStats[hoveredCountry].emergency > 0 && (
                <div className="flex justify-between gap-4 text-red-600">
                  <span>Emergency:</span>
                  <span className="font-medium">{countryStats[hoveredCountry].emergency}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Country stats grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(countryStats)
          .sort(([,a], [,b]) => b.total - a.total)
          .slice(0, 8)
          .map(([country, stats]) => (
          <div 
            key={country}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedCountry === country 
                ? 'border-bangladesh-green bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onCountrySelect(country)}
          >
            <div className="text-sm font-medium text-gray-900">{country}</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-green-600">{stats.safe} safe</span>
              {stats.emergency > 0 && (
                <span className="text-red-600">{stats.emergency} emergency</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCountry && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">
                Showing workers in {selectedCountry}
              </span>
            </div>
            <button
              onClick={() => onCountrySelect(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Show All Countries
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
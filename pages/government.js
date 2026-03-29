import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { workers, embassies, stats } from '../data/mockWorkers';
import { 
  Users, AlertTriangle, CheckCircle, MapPin, Building, Clock, 
  Activity, Shield, Search, ChevronRight, ChevronLeft, ChevronDown,
  Filter, X, Eye, ArrowUpDown, Home, Globe, User, FileText,
  TrendingUp, BarChart3, ArrowLeft
} from 'lucide-react';
import useEmergencySimulation from '../hooks/useEmergencySimulation';
import { useTranslation, useLanguage } from '../hooks/useLanguage';
import WorldMap from '../components/WorldMap';
import LiveAnalytics from '../components/LiveAnalytics';
import { 
  EmergencyBanner, 
  EmergencyTimeline, 
  EmergencyControls, 
  EmergencyStats 
} from '../components/EmergencySimulation';

const PAGE_SIZE = 10;

function StatusBadge({ status }) {
  const config = {
    safe: { bg: 'bg-green-100', text: 'text-green-700', label: 'Safe' },
    check_overdue: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Check Overdue' },
    emergency: { bg: 'bg-red-100', text: 'text-red-700', label: 'Emergency' },
  };
  const c = config[status] || config.safe;
  return <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${c.bg} ${c.text}`}>{c.label}</span>;
}

function SalaryBadge({ status }) {
  return status === 'paid'
    ? <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">Paid</span>
    : <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">Pending</span>;
}

function WorkerDetailModal({ worker, onClose }) {
  if (!worker) return null;
  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full z-50 flex items-start justify-center pt-10 pb-10" onClick={onClose}>
      <div className="relative w-11/12 max-w-2xl shadow-2xl rounded-xl bg-white" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b bg-gray-50 rounded-t-xl">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{worker.name}</h3>
            <p className="text-sm text-gray-500">{worker.id} • {worker.gender}, Age {worker.age}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={worker.status} />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Personal</h4>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Passport</dt><dd className="font-medium">{worker.passport}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Phone</dt><dd className="font-medium">{worker.phone}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Home District</dt><dd className="font-medium">{worker.homeDistrict}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Emergency</dt><dd className="font-medium text-right max-w-[200px]">{worker.emergencyContact}</dd></div>
              {worker.family.spouse && <div className="flex justify-between"><dt className="text-gray-500">Spouse</dt><dd className="font-medium">{worker.family.spouse}</dd></div>}
              <div className="flex justify-between"><dt className="text-gray-500">Children</dt><dd className="font-medium">{worker.family.children}</dd></div>
            </dl>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Employment</h4>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Employer</dt><dd className="font-medium text-right max-w-[200px]">{worker.employer}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Job Title</dt><dd className="font-medium">{worker.jobTitle}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Location</dt><dd className="font-medium">{worker.location.city}, {worker.destination}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Departure</dt><dd className="font-medium">{worker.departureDate}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Contract Expiry</dt><dd className="font-medium">{worker.contractExpiry}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Salary</dt><dd><SalaryBadge status={worker.salaryStatus} /></dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Health</dt><dd className="font-medium capitalize">{worker.healthStatus.replace(/_/g, ' ')}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Last Check-in</dt><dd className="font-medium">{new Date(worker.lastCheckIn).toLocaleString()}</dd></div>
            </dl>
          </div>
        </div>
        {worker.alerts && worker.alerts.length > 0 && (
          <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2 text-sm">⚠️ Active Alerts</h4>
            {worker.alerts.map(a => (
              <div key={a.id} className="text-sm text-red-800">
                <span className="font-medium uppercase">{a.type}</span>: {a.message}
                <div className="text-xs text-red-600 mt-0.5">{new Date(a.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm">Close</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Contact Embassy</button>
          {worker.status === 'emergency' && <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">Emergency Action</button>}
        </div>
      </div>
    </div>
  );
}

export default function GovernmentDashboard() {
  const [view, setView] = useState('national'); // national | country | workers
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mapSelectedCountry, setMapSelectedCountry] = useState(null);

  // Translation and language hooks
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  // Emergency simulation state
  const {
    simulation,
    startEmergencySimulation,
    resetSimulation,
    isSimulationActive
  } = useEmergencySimulation();

  // Breadcrumb navigation
  const navigateTo = (v, country = null) => {
    setView(v);
    setSelectedCountry(country);
    setMapSelectedCountry(null); // Clear map selection when navigating
    setPage(1);
    setSearchQuery('');
    setStatusFilter('all');
    setJobFilter('all');
  };

  // Map country selection handler
  const handleMapCountrySelect = (country) => {
    setMapSelectedCountry(country);
    setSelectedCountry(null); // Clear navigation selection
    setView('workers'); // Show workers view
    setPage(1);
  };

  // Filtered & sorted workers
  const filteredWorkers = useMemo(() => {
    let result = [...workers];
    
    // Country filter (from navigation or map)
    const activeCountry = selectedCountry || mapSelectedCountry;
    if (activeCountry) {
      result = result.filter(w => w.location.country === activeCountry);
    }
    if (statusFilter !== 'all') result = result.filter(w => w.status === statusFilter);
    if (jobFilter !== 'all') result = result.filter(w => w.jobCategory === jobFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.employer.toLowerCase().includes(q) ||
        w.homeDistrict.toLowerCase().includes(q) ||
        w.location.city.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      let va = a[sortField] || '';
      let vb = b[sortField] || '';
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [selectedCountry, mapSelectedCountry, statusFilter, jobFilter, searchQuery, sortField, sortDir]);

  const totalPages = Math.ceil(filteredWorkers.length / PAGE_SIZE);
  const pagedWorkers = filteredWorkers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  // Country stats
  const countryStats = useMemo(() => {
    const map = {};
    workers.forEach(w => {
      const country = w.location.country;
      if (!map[country]) map[country] = { total: 0, safe: 0, overdue: 0, emergency: 0 };
      map[country].total++;
      if (w.status === 'safe') map[country].safe++;
      else if (w.status === 'check_overdue') map[country].overdue++;
      else map[country].emergency++;
    });
    return map;
  }, []);

  // Job category labels
  const jobCategories = [...new Set(workers.map(w => w.jobCategory))].sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        {/* Government Header Bar */}
        <div className="bg-bangladesh-green">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-1.5">
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">🇧🇩 Government of the People's Republic of Bangladesh</div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={toggleLanguage}
                  className={`text-white text-sm px-2 py-0.5 rounded transition-colors ${
                    language === 'bn' ? 'bg-white/20' : 'border border-white/30 hover:bg-white/10'
                  }`}
                >
                  বাংলা
                </button>
                <button 
                  onClick={toggleLanguage}
                  className={`text-white text-sm px-2 py-0.5 rounded transition-colors ${
                    language === 'en' ? 'bg-white/20' : 'border border-white/30 hover:bg-white/10'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                {/* National Emblem */}
                <div className="w-10 h-10 bg-bangladesh-green rounded-full flex items-center justify-center border-2 border-bangladesh-green">
                  <div className="text-white font-bold text-sm">🇧🇩</div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">{t('Government Dashboard')}</h1>
                  <p className="text-xs text-gray-600">{t('Ministry of Expatriates\' Welfare and Overseas Employment')}</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-gray-500">
                  Live • {new Date().toLocaleTimeString()}
                </div>
                <div className="text-xs text-gray-400">
                  Bangladesh Government Cloud
                </div>
              </div>
              <button className="bg-bangladesh-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
                {t('Generate Report')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Alert Banner */}
      <EmergencyBanner simulation={simulation} onReset={resetSimulation} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <button onClick={() => navigateTo('national')} className={`flex items-center gap-1 ${view === 'national' ? 'text-bangladesh-green font-semibold' : 'text-gray-500 hover:text-gray-700'}`}>
            <Home className="w-4 h-4" /> National
          </button>
          {selectedCountry && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <button onClick={() => navigateTo('country', selectedCountry)} className={`flex items-center gap-1 ${view === 'country' ? 'text-bangladesh-green font-semibold' : 'text-gray-500 hover:text-gray-700'}`}>
                <Globe className="w-4 h-4" /> {selectedCountry}
              </button>
            </>
          )}
          {view === 'workers' && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-bangladesh-green font-semibold flex items-center gap-1">
                <Users className="w-4 h-4" /> Workers
              </span>
            </>
          )}
        </nav>

        {/* ===== NATIONAL VIEW ===== */}
        {view === 'national' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Total Workers')}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalWorkers.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl"><Users className="h-6 w-6 text-blue-600" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Safe')}</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{stats.safeWorkers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-0.5">99.9% of total</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl"><CheckCircle className="h-6 w-6 text-green-600" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Active Alerts')}</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{stats.alertsActive}</p>
                    <p className="text-xs text-red-500 mt-0.5">{stats.emergencyCases} emergency</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Check-ins Today</p>
                    <p className="text-2xl font-bold text-bangladesh-green mt-1">{stats.checkInsToday.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-0.5">79.8% compliance</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl"><Activity className="h-6 w-6 text-bangladesh-green" /></div>
                </div>
              </div>
            </div>

            {/* Emergency Simulation Controls & Stats */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">{t('Emergency Response System')}</h3>
                  <EmergencyControls 
                    workers={workers}
                    onSimulate={startEmergencySimulation}
                    isActive={isSimulationActive}
                    onReset={resetSimulation}
                  />
                </div>
                
                {/* Emergency Stats */}
                <EmergencyStats simulation={simulation} />
                
                {/* Emergency Timeline */}
                {isSimulationActive && (
                  <div className="mt-6">
                    <EmergencyTimeline simulation={simulation} />
                  </div>
                )}
                
                {!isSimulationActive && (
                  <div className="text-center py-8 text-gray-500">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p className="text-sm">
                      Click "Simulate Emergency Alert" to demonstrate the emergency response protocol
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* World Map */}
            <div className="mb-8">
              <WorldMap 
                workers={workers} 
                onCountrySelect={handleMapCountrySelect}
                selectedCountry={mapSelectedCountry}
              />
            </div>

            {/* Live Analytics */}
            <div className="mb-8">
              <LiveAnalytics 
                workers={workers}
                simulation={simulation}
              />
            </div>

            {/* Embassy Cards — clickable */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Embassy Overview</h3>
                <button onClick={() => navigateTo('workers')} className="text-sm text-bangladesh-green hover:underline font-medium flex items-center gap-1">
                  View All Workers <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {embassies.map(embassy => {
                  const cs = countryStats[embassy.country] || { total: 0, safe: 0, overdue: 0, emergency: 0 };
                  return (
                    <div
                      key={embassy.id}
                      onClick={() => navigateTo('country', embassy.country)}
                      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-bangladesh-green/30 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{embassy.flag}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-bangladesh-green transition-colors" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{embassy.country}</h4>
                      <p className="text-xs text-gray-500 mb-3">{embassy.workersCount.toLocaleString()} workers</p>
                      <div className="flex gap-2">
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{cs.safe} safe</span>
                        {cs.overdue > 0 && <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">{cs.overdue} overdue</span>}
                        {cs.emergency > 0 && <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">{cs.emergency} emergency</span>}
                      </div>
                      <div className="mt-3 text-xs text-gray-400">{cs.total} tracked in demo</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Alert Workers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" /> Workers Requiring Attention
                </h3>
                <span className="text-sm text-gray-500">{workers.filter(w => w.status !== 'safe').length} workers</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Worker</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Alert</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {workers.filter(w => w.status !== 'safe').map(worker => (
                      <tr key={worker.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3">
                          <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                          <div className="text-xs text-gray-500">{worker.id}</div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="text-sm text-gray-900">{worker.location.city}</div>
                          <div className="text-xs text-gray-500">{worker.destination}</div>
                        </td>
                        <td className="px-5 py-3"><StatusBadge status={worker.status} /></td>
                        <td className="px-5 py-3">
                          {worker.alerts?.[0] && <div className="text-xs text-gray-600 max-w-[200px]">{worker.alerts[0].message}</div>}
                        </td>
                        <td className="px-5 py-3">
                          <button onClick={() => setSelectedWorker(worker)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ===== COUNTRY VIEW ===== */}
        {view === 'country' && selectedCountry && (
          <>
            {(() => {
              const embassy = embassies.find(e => e.country === selectedCountry);
              const countryWorkers = workers.filter(w => w.destination === selectedCountry);
              const safe = countryWorkers.filter(w => w.status === 'safe').length;
              const overdue = countryWorkers.filter(w => w.status === 'check_overdue').length;
              const emergency = countryWorkers.filter(w => w.status === 'emergency').length;
              const jobBreakdown = {};
              countryWorkers.forEach(w => { jobBreakdown[w.jobCategory] = (jobBreakdown[w.jobCategory] || 0) + 1; });

              return (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigateTo('national')} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="text-3xl">{embassy?.flag}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCountry}</h2>
                      <p className="text-sm text-gray-500">{embassy?.name}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 shadow-sm border"><p className="text-xs font-medium text-gray-500 uppercase">Tracked Workers</p><p className="text-2xl font-bold mt-1">{countryWorkers.length}</p><p className="text-xs text-gray-400">{embassy?.workersCount.toLocaleString()} total est.</p></div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border"><p className="text-xs font-medium text-gray-500 uppercase">Safe</p><p className="text-2xl font-bold text-green-600 mt-1">{safe}</p></div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border"><p className="text-xs font-medium text-gray-500 uppercase">Overdue</p><p className="text-2xl font-bold text-yellow-600 mt-1">{overdue}</p></div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border"><p className="text-xs font-medium text-gray-500 uppercase">Emergency</p><p className="text-2xl font-bold text-red-600 mt-1">{emergency}</p></div>
                  </div>

                  {/* Job breakdown */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3">Worker Distribution by Job Category</h3>
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(jobBreakdown).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                        <div key={cat} className="bg-gray-50 rounded-lg px-4 py-2">
                          <span className="text-sm font-medium text-gray-700 capitalize">{cat}</span>
                          <span className="ml-2 text-sm font-bold text-bangladesh-green">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Embassy contact */}
                  {embassy && (
                    <div className="bg-white rounded-xl p-5 shadow-sm border mb-8">
                      <h3 className="font-semibold text-gray-900 mb-3">Embassy Contact</h3>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div><span className="text-gray-500">Address:</span><br/><span className="font-medium">{embassy.address}</span></div>
                        <div><span className="text-gray-500">Phone:</span><br/><span className="font-medium">{embassy.phone}</span></div>
                        <div><span className="text-gray-500">Email:</span><br/><span className="font-medium">{embassy.email}</span></div>
                      </div>
                    </div>
                  )}

                  <button onClick={() => { navigateTo('workers', selectedCountry); }} className="mb-6 bg-bangladesh-green text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors flex items-center gap-2">
                    <Users className="w-4 h-4" /> Browse All {countryWorkers.length} Workers
                  </button>
                </>
              );
            })()}
          </>
        )}

        {/* ===== WORKERS LIST VIEW ===== */}
        {view === 'workers' && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => selectedCountry ? navigateTo('country', selectedCountry) : navigateTo('national')} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCountry ? `Workers in ${selectedCountry}` : 'All Workers'}
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredWorkers.length} results</span>
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
                    placeholder="Search by name, ID, employer, district, city..."
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-bangladesh-green/20 focus:border-bangladesh-green outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium ${showFilters ? 'bg-bangladesh-green text-white border-bangladesh-green' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <Filter className="w-4 h-4" /> Filters
                </button>
              </div>

              {showFilters && (
                <div className="mt-3 pt-3 border-t flex flex-wrap gap-3">
                  {!selectedCountry && (
                    <select value={selectedCountry || 'all'} onChange={e => { setSelectedCountry(e.target.value === 'all' ? null : e.target.value); setPage(1); }} className="border rounded-lg px-3 py-2 text-sm">
                      <option value="all">All Countries</option>
                      {[...new Set(workers.map(w => w.destination))].sort().map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  )}
                  <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="border rounded-lg px-3 py-2 text-sm">
                    <option value="all">All Statuses</option>
                    <option value="safe">Safe</option>
                    <option value="check_overdue">Check Overdue</option>
                    <option value="emergency">Emergency</option>
                  </select>
                  <select value={jobFilter} onChange={e => { setJobFilter(e.target.value); setPage(1); }} className="border rounded-lg px-3 py-2 text-sm">
                    <option value="all">All Job Types</option>
                    {jobCategories.map(j => <option key={j} value={j} className="capitalize">{j}</option>)}
                  </select>
                  {(statusFilter !== 'all' || jobFilter !== 'all') && (
                    <button onClick={() => { setStatusFilter('all'); setJobFilter('all'); setPage(1); }} className="text-sm text-red-600 hover:underline flex items-center gap-1">
                      <X className="w-3 h-3" /> Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Workers Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th onClick={() => toggleSort('name')} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-gray-700">
                        <span className="flex items-center gap-1">Worker <ArrowUpDown className="w-3 h-3" /></span>
                      </th>
                      <th onClick={() => toggleSort('destination')} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-gray-700">
                        <span className="flex items-center gap-1">Location <ArrowUpDown className="w-3 h-3" /></span>
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employer</th>
                      <th onClick={() => toggleSort('status')} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:text-gray-700">
                        <span className="flex items-center gap-1">Status <ArrowUpDown className="w-3 h-3" /></span>
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Last Check-in</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {pagedWorkers.map(worker => (
                      <tr key={worker.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedWorker(worker)}>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                              <div className="text-xs text-gray-500">{worker.id} • {worker.homeDistrict}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="text-sm text-gray-900">{worker.location.city}</div>
                          <div className="text-xs text-gray-500">{worker.destination}</div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="text-sm text-gray-900 max-w-[180px] truncate">{worker.employer}</div>
                          <div className="text-xs text-gray-500">{worker.jobTitle}</div>
                        </td>
                        <td className="px-5 py-3"><StatusBadge status={worker.status} /></td>
                        <td className="px-5 py-3 text-sm text-gray-500">{new Date(worker.lastCheckIn).toLocaleDateString()}</td>
                        <td className="px-5 py-3">
                          <button onClick={e => { e.stopPropagation(); setSelectedWorker(worker); }} className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t bg-gray-50">
                  <p className="text-sm text-gray-500">
                    Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredWorkers.length)} of {filteredWorkers.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg text-sm font-medium ${p === page ? 'bg-bangladesh-green text-white' : 'border hover:bg-white text-gray-700'}`}>
                        {p}
                      </button>
                    ))}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {pagedWorkers.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <Search className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No workers found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Worker Detail Modal */}
      <WorkerDetailModal worker={selectedWorker} onClose={() => setSelectedWorker(null)} />
    </div>
  );
}

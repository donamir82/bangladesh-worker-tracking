import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { workers, embassies } from '../data/mockWorkers';
import { 
  MapPin, AlertTriangle, CheckCircle, Phone, Mail, User, Calendar,
  Shield, Building, Search, X, ChevronLeft, ChevronRight, Eye,
  ArrowUpDown, Filter, Clock, Home
} from 'lucide-react';

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
            </dl>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Employment</h4>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Employer</dt><dd className="font-medium text-right max-w-[200px]">{worker.employer}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Job</dt><dd className="font-medium">{worker.jobTitle}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">City</dt><dd className="font-medium">{worker.location.city}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Contract</dt><dd className="font-medium">{worker.departureDate} → {worker.contractExpiry}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Salary</dt><dd className={`font-medium ${worker.salaryStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{worker.salaryStatus}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Health</dt><dd className="font-medium capitalize">{worker.healthStatus.replace(/_/g, ' ')}</dd></div>
            </dl>
          </div>
        </div>
        {worker.alerts?.length > 0 && (
          <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2 text-sm">⚠️ Active Alert</h4>
            {worker.alerts.map(a => (
              <div key={a.id} className="text-sm text-red-800">
                <span className="font-medium uppercase">{a.type}</span>: {a.message}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">Close</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Contact Worker</button>
          {worker.status === 'emergency' && <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Emergency Response</button>}
        </div>
      </div>
    </div>
  );
}

export default function EmbassyPortal() {
  const [selectedEmbassy, setSelectedEmbassy] = useState('riyadh');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  const currentEmbassy = embassies.find(e => e.id === selectedEmbassy);

  const embassyWorkers = useMemo(() => {
    let result = workers.filter(w => {
      const country = currentEmbassy?.country || '';
      return w.destination === country;
    });
    if (statusFilter !== 'all') result = result.filter(w => w.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.id.toLowerCase().includes(q) ||
        w.employer.toLowerCase().includes(q) ||
        w.location.city.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      let va = a[sortField] || '';
      let vb = b[sortField] || '';
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      return sortDir === 'asc' ? (va < vb ? -1 : 1) : (va > vb ? -1 : 1);
    });
    return result;
  }, [selectedEmbassy, currentEmbassy, statusFilter, searchQuery, sortField, sortDir]);

  const totalPages = Math.ceil(embassyWorkers.length / PAGE_SIZE);
  const pagedWorkers = embassyWorkers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const allCountryWorkers = workers.filter(w => w.destination === currentEmbassy?.country);
  const safeCount = allCountryWorkers.filter(w => w.status === 'safe').length;
  const overdueCount = allCountryWorkers.filter(w => w.status === 'check_overdue').length;
  const emergencyCount = allCountryWorkers.filter(w => w.status === 'emergency').length;

  const switchEmbassy = (id) => {
    setSelectedEmbassy(id);
    setPage(1);
    setSearchQuery('');
    setStatusFilter('all');
  };

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <Link href="/" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Building className="h-6 w-6 text-white" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Embassy Portal</h1>
                <p className="text-xs text-gray-500">{currentEmbassy?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedEmbassy} 
                onChange={(e) => switchEmbassy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              >
                {embassies.map(embassy => (
                  <option key={embassy.id} value={embassy.id}>{embassy.flag} {embassy.country}</option>
                ))}
              </select>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 hidden sm:block">
                Emergency Protocol
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Embassy cards row */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {embassies.map(e => (
            <button
              key={e.id}
              onClick={() => switchEmbassy(e.id)}
              className={`flex-shrink-0 rounded-xl px-4 py-3 border text-left transition-all ${
                e.id === selectedEmbassy ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-white border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{e.flag}</span>
                <span className="text-sm font-semibold text-gray-900">{e.country}</span>
              </div>
              <div className="text-xs text-gray-500">{e.registeredWorkers} tracked • {e.recentAlerts} alerts</div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <p className="text-xs font-medium text-gray-500 uppercase">Total Workers</p>
            <p className="text-2xl font-bold mt-1">{allCountryWorkers.length}</p>
            <p className="text-xs text-gray-400">{currentEmbassy?.workersCount.toLocaleString()} est. nationally</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border cursor-pointer hover:border-green-300" onClick={() => { setStatusFilter(statusFilter === 'safe' ? 'all' : 'safe'); setPage(1); }}>
            <p className="text-xs font-medium text-gray-500 uppercase">Safe</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{safeCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border cursor-pointer hover:border-yellow-300" onClick={() => { setStatusFilter(statusFilter === 'check_overdue' ? 'all' : 'check_overdue'); setPage(1); }}>
            <p className="text-xs font-medium text-gray-500 uppercase">Overdue</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{overdueCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border cursor-pointer hover:border-red-300" onClick={() => { setStatusFilter(statusFilter === 'emergency' ? 'all' : 'emergency'); setPage(1); }}>
            <p className="text-xs font-medium text-gray-500 uppercase">Emergency</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{emergencyCount}</p>
          </div>
        </div>

        {/* Embassy Info */}
        {currentEmbassy && (
          <div className="bg-white rounded-xl p-5 shadow-sm border mb-6">
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> <span className="text-gray-600">{currentEmbassy.address}</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> <span className="text-gray-600">{currentEmbassy.emergencyHotline}</span></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> <span className="text-gray-600">{currentEmbassy.email}</span></div>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
                placeholder="Search workers by name, ID, employer..."
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
              {searchQuery && <button onClick={() => { setSearchQuery(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-gray-400" /></button>}
            </div>
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="border rounded-lg px-3 py-2.5 text-sm">
              <option value="all">All Statuses</option>
              <option value="safe">Safe</option>
              <option value="check_overdue">Check Overdue</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
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
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employer / Job</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">City</th>
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
                      <div className="text-sm text-gray-900 max-w-[180px] truncate">{worker.employer}</div>
                      <div className="text-xs text-gray-500">{worker.jobTitle}</div>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700">{worker.location.city}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={worker.status} />
                      {worker.alerts?.[0] && <div className="text-xs text-red-600 mt-1 max-w-[160px] truncate">{worker.alerts[0].message}</div>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-sm text-gray-700">{new Date(worker.lastCheckIn).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{new Date(worker.lastCheckIn).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button onClick={e => { e.stopPropagation(); setSelectedWorker(worker); }} className="text-sm text-blue-600 hover:text-blue-800 font-medium">View</button>
                        {worker.status === 'emergency' && <button className="text-sm text-red-600 hover:text-red-800 font-medium">SOS</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t bg-gray-50">
              <p className="text-sm text-gray-500">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, embassyWorkers.length)} of {embassyWorkers.length}
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg border hover:bg-white disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg text-sm font-medium ${p === page ? 'bg-blue-600 text-white' : 'border hover:bg-white'}`}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg border hover:bg-white disabled:opacity-40"><ChevronRight className="w-4 h-4" /></button>
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
      </div>

      <WorkerDetailModal worker={selectedWorker} onClose={() => setSelectedWorker(null)} />
    </div>
  );
}

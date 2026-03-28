import React, { useState } from 'react';
import Link from 'next/link';
import { workers } from '../data/mockWorkers';
import { 
  Heart, MapPin, CheckCircle, Clock, Phone, MessageCircle, 
  AlertTriangle, Calendar, DollarSign, User, Shield, Search,
  FileText, Activity, Home
} from 'lucide-react';

function StatusBadge({ status }) {
  const config = {
    safe: { bg: 'bg-green-100', text: 'text-green-700', label: 'Safe & Well', icon: '✅' },
    check_overdue: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Check-in Overdue', icon: '⚠️' },
    emergency: { bg: 'bg-red-100', text: 'text-red-700', label: 'Emergency', icon: '🚨' },
  };
  const c = config[status] || config.safe;
  return <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-full ${c.bg} ${c.text}`}>{c.icon} {c.label}</span>;
}

export default function FamilyPortal() {
  const [workerCode, setWorkerCode] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const q = workerCode.trim().toLowerCase();
    
    // Search by ID, phone, passport, or name
    const found = workers.find(w =>
      w.id.toLowerCase() === q ||
      w.phone.includes(q) ||
      w.passport.toLowerCase() === q ||
      w.name.toLowerCase().includes(q)
    );
    
    if (found) {
      setSelectedWorker(found);
      setShowLogin(false);
    } else {
      setError('Worker not found. Try a worker ID (e.g., BDW-2024-001), name, or phone number.');
    }
  };

  // Generate mock recent activity based on worker status
  const getRecentActivity = (worker) => {
    const activities = [];
    if (worker.status === 'safe') {
      activities.push({ type: 'checkin', msg: 'Daily check-in completed', time: 'Today, ' + new Date(worker.lastCheckIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), icon: CheckCircle, color: 'green' });
      activities.push({ type: 'location', msg: `Location confirmed: ${worker.location.city}`, time: 'Yesterday', icon: MapPin, color: 'blue' });
    } else if (worker.status === 'check_overdue') {
      activities.push({ type: 'overdue', msg: 'Check-in overdue — embassy notified', time: new Date(worker.lastCheckIn).toLocaleDateString(), icon: Clock, color: 'yellow' });
    } else {
      activities.push({ type: 'emergency', msg: worker.alerts?.[0]?.message || 'Emergency alert active', time: new Date(worker.lastCheckIn).toLocaleDateString(), icon: AlertTriangle, color: 'red' });
    }
    if (worker.salaryStatus === 'paid') {
      activities.push({ type: 'salary', msg: 'Salary received on time', time: 'March 25, 2026', icon: DollarSign, color: 'green' });
    } else {
      activities.push({ type: 'salary', msg: 'Salary payment pending', time: 'Expected March 30', icon: DollarSign, color: 'red' });
    }
    activities.push({ type: 'docs', msg: 'All documents verified & valid', time: 'Last checked: March 20', icon: FileText, color: 'blue' });
    return activities;
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Family Access Portal</h1>
              <p className="text-gray-500 mt-2">Stay connected with your loved one abroad</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="workerCode" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Worker ID, Name, or Phone
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="workerCode"
                    value={workerCode}
                    onChange={(e) => { setWorkerCode(e.target.value); setError(''); }}
                    placeholder="BDW-2024-001 or Abdul Rahman"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all">
                Access Information
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">Demo Access</h3>
              <p className="text-sm text-blue-700 mb-2">Try searching for any of these:</p>
              <div className="space-y-1 text-xs text-blue-600">
                <p>• <code className="bg-blue-100 px-1 rounded">BDW-2024-001</code> — {workers[0]?.name}</p>
                <p>• <code className="bg-blue-100 px-1 rounded">BDW-2024-004</code> — {workers[3]?.name} (emergency)</p>
                <p>• <code className="bg-blue-100 px-1 rounded">Fatema</code> — search by name</p>
                <p>• Any of {workers.length} tracked workers</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Need help? Call <span className="font-semibold">+880-2-9898989</span>
              </p>
              <Link href="/" className="text-sm text-orange-600 hover:underline mt-2 inline-block">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activity = getRecentActivity(selectedWorker);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Family Portal</h1>
              <p className="text-xs text-gray-500">Monitoring: {selectedWorker?.name}</p>
            </div>
          </div>
          <button onClick={() => { setShowLogin(true); setWorkerCode(''); }} className="text-sm text-orange-600 hover:underline font-medium">
            Switch Worker
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Main Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedWorker?.name}</h2>
                <p className="text-gray-500">{selectedWorker?.jobTitle} • {selectedWorker?.location.city}, {selectedWorker?.destination}</p>
              </div>
            </div>
            <StatusBadge status={selectedWorker?.status} />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{selectedWorker?.location.city}, {selectedWorker?.destination}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Contract</p>
                <p className="text-sm font-medium">Until {selectedWorker?.contractExpiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-500">Salary</p>
                <p className={`text-sm font-medium ${selectedWorker?.salaryStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedWorker?.salaryStatus === 'paid' ? 'Paid on time' : 'Payment pending'}
                </p>
              </div>
            </div>
          </div>

          {selectedWorker?.status === 'emergency' && selectedWorker?.alerts?.[0] && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2 text-red-800 font-semibold text-sm mb-1">
                <AlertTriangle className="w-4 h-4" /> Active Emergency Alert
              </div>
              <p className="text-sm text-red-700">{selectedWorker.alerts[0].message}</p>
              <p className="text-xs text-red-500 mt-1">Embassy has been notified and is responding</p>
            </div>
          )}

          {selectedWorker?.status === 'check_overdue' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-2 text-yellow-800 font-semibold text-sm mb-1">
                <Clock className="w-4 h-4" /> Check-in Overdue
              </div>
              <p className="text-sm text-yellow-700">Last check-in was on {new Date(selectedWorker.lastCheckIn).toLocaleDateString()}. Embassy is following up.</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border">
            <div className="p-5 border-b"><h3 className="font-bold text-gray-900">Recent Activity</h3></div>
            <div className="p-5 space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-full bg-${a.color}-100`}>
                    <a.icon className={`h-4 w-4 text-${a.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{a.msg}</p>
                    <p className="text-xs text-gray-500">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication */}
          <div className="bg-white rounded-2xl shadow-sm border">
            <div className="p-5 border-b"><h3 className="font-bold text-gray-900">Stay Connected</h3></div>
            <div className="p-5 space-y-3">
              <button className="w-full flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg"><MessageCircle className="h-5 w-5 text-blue-600" /></div>
                  <div className="text-left"><p className="font-medium text-sm text-gray-900">Send Message</p><p className="text-xs text-gray-500">Secure messaging</p></div>
                </div>
                <span className="text-gray-300">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg"><Phone className="h-5 w-5 text-green-600" /></div>
                  <div className="text-left"><p className="font-medium text-sm text-gray-900">Request Call</p><p className="text-xs text-gray-500">Schedule via embassy</p></div>
                </div>
                <span className="text-gray-300">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg"><AlertTriangle className="h-5 w-5 text-orange-600" /></div>
                  <div className="text-left"><p className="font-medium text-sm text-gray-900">Report Concern</p><p className="text-xs text-gray-500">Alert embassy staff</p></div>
                </div>
                <span className="text-gray-300">→</span>
              </button>

              <div className="mt-4 p-4 bg-orange-50 rounded-xl">
                <h4 className="font-semibold text-orange-900 text-sm mb-1">24/7 Emergency</h4>
                <p className="text-sm text-orange-800">{selectedWorker?.embassy}</p>
                <p className="text-sm text-orange-700 font-medium mt-1">
                  {selectedWorker?.destination === 'Saudi Arabia' ? '+966-11-488-1717' :
                   selectedWorker?.destination === 'UAE' ? '+971-4-397-5391' :
                   selectedWorker?.destination === 'Qatar' ? '+974-4460-0200' :
                   selectedWorker?.destination === 'Kuwait' ? '+965-2252-5061' :
                   '+880-2-9898989'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Details */}
        <div className="bg-white rounded-2xl shadow-sm border">
          <div className="p-5 border-b"><h3 className="font-bold text-gray-900">Worker Information</h3></div>
          <div className="p-5 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Employment</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Employer</dt><dd className="font-medium text-right max-w-[200px]">{selectedWorker?.employer}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Job Title</dt><dd className="font-medium">{selectedWorker?.jobTitle}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Work City</dt><dd className="font-medium">{selectedWorker?.location.city}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Departed</dt><dd className="font-medium">{selectedWorker?.departureDate}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Contract Until</dt><dd className="font-medium">{selectedWorker?.contractExpiry}</dd></div>
              </dl>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Health & Safety</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Health</dt><dd className="font-medium capitalize">{selectedWorker?.healthStatus.replace(/_/g, ' ')}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Documents</dt><dd className="font-medium text-green-600">All valid ✓</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Insurance</dt><dd className="font-medium">Covered</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Last Check-in</dt><dd className="font-medium">{new Date(selectedWorker?.lastCheckIn).toLocaleDateString()}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Home District</dt><dd className="font-medium">{selectedWorker?.homeDistrict}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

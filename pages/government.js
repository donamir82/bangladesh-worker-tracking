import React, { useState, useEffect } from 'react';
import { workers, embassies, stats } from '../data/mockWorkers';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Building, 
  Clock, 
  DollarSign,
  Activity,
  Shield,
  Phone
} from 'lucide-react';

export default function GovernmentDashboard() {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [alertWorkers, setAlertWorkers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Filter workers with alerts
    const workersWithAlerts = workers.filter(worker => 
      worker.status === 'emergency' || worker.status === 'check_overdue'
    );
    setAlertWorkers(workersWithAlerts);

    // Mock recent activity
    setRecentActivity([
      {
        id: 1,
        type: 'check_in',
        message: 'Md. Abdul Rahman checked in from Riyadh',
        time: '2 minutes ago',
        country: 'Saudi Arabia'
      },
      {
        id: 2,
        type: 'alert',
        message: 'Medical emergency alert from Nasir Ahmed in Kuwait',
        time: '1 hour ago',
        country: 'Kuwait',
        priority: 'high'
      },
      {
        id: 3,
        type: 'check_in',
        message: 'Salma Begum checked in from Muscat',
        time: '3 hours ago',
        country: 'Oman'
      },
      {
        id: 4,
        type: 'overdue',
        message: 'Check-in overdue: Fatema Khatun (Dubai)',
        time: '6 hours ago',
        country: 'UAE'
      }
    ]);
  }, []);

  const filteredWorkers = selectedCountry === 'all' 
    ? workers 
    : workers.filter(worker => worker.destination === selectedCountry);

  const getStatusColor = (status) => {
    switch(status) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'check_overdue': return 'text-yellow-600 bg-yellow-100';
      case 'emergency': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'safe': return 'Safe';
      case 'check_overdue': return 'Check Overdue';
      case 'emergency': return 'Emergency';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-bangladesh-green rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Government Dashboard</h1>
                <p className="text-sm text-gray-500">Ministry of Expatriates' Welfare</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
              <div className="h-8 w-px bg-gray-300"></div>
              <button className="bg-bangladesh-green text-white px-4 py-2 rounded-lg text-sm font-medium">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Workers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalWorkers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Safe Workers</p>
                <p className="text-2xl font-bold text-green-600">{stats.safeWorkers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{stats.alertsActive}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Check-ins</p>
                <p className="text-2xl font-bold text-bangladesh-green">{stats.checkInsToday.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-bangladesh-green" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Embassy Status */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Embassy Overview</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {embassies.map(embassy => (
                    <div key={embassy.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{embassy.name}</h4>
                          <p className="text-sm text-gray-500">{embassy.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {embassy.workersCount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">workers</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${embassy.recentAlerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {embassy.recentAlerts}
                        </div>
                        <div className="text-sm text-gray-500">alerts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full ${
                        activity.type === 'alert' ? 'bg-red-100' :
                        activity.type === 'overdue' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                        {activity.type === 'alert' ? 
                          <AlertTriangle className="h-4 w-4 text-red-600" /> :
                          activity.type === 'overdue' ?
                          <Clock className="h-4 w-4 text-yellow-600" /> :
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time} • {activity.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Workers Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Workers Requiring Attention</h3>
              <select 
                value={selectedCountry} 
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Countries</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="UAE">UAE</option>
                <option value="Qatar">Qatar</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Oman">Oman</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Worker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Check-in
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alertWorkers.map(worker => (
                  <tr key={worker.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                        <div className="text-sm text-gray-500">{worker.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{worker.location.city}</div>
                      <div className="text-sm text-gray-500">{worker.destination}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(worker.status)}`}>
                        {getStatusText(worker.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(worker.lastCheckIn).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-bangladesh-green hover:text-bangladesh-red mr-4">
                        Contact Embassy
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
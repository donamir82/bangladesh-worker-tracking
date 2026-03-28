import React, { useState } from 'react';
import { workers, embassies } from '../data/mockWorkers';
import { 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  Mail, 
  User, 
  Calendar,
  Shield,
  Building
} from 'lucide-react';

export default function EmbassyPortal() {
  const [selectedEmbassy, setSelectedEmbassy] = useState('riyadh');
  const [selectedWorker, setSelectedWorker] = useState(null);

  const currentEmbassy = embassies.find(e => e.id === selectedEmbassy);
  const embassyWorkers = workers.filter(worker => 
    worker.embassy.toLowerCase().includes(currentEmbassy?.country.toLowerCase() || '')
  );

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
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Embassy Portal</h1>
                <p className="text-sm text-gray-500">{currentEmbassy?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedEmbassy} 
                onChange={(e) => setSelectedEmbassy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {embassies.map(embassy => (
                  <option key={embassy.id} value={embassy.id}>{embassy.country}</option>
                ))}
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Emergency Protocol
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Embassy Info & Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Embassy Information</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{currentEmbassy?.country}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{currentEmbassy?.emergencyHotline}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{currentEmbassy?.email}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {embassyWorkers.length}
                </div>
                <div className="text-sm text-gray-600">Workers in jurisdiction</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Safe Workers</p>
                    <p className="text-2xl font-bold text-green-600">
                      {embassyWorkers.filter(w => w.status === 'safe').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Overdue Check-ins</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {embassyWorkers.filter(w => w.status === 'check_overdue').length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Emergency Cases</p>
                    <p className="text-2xl font-bold text-red-600">
                      {embassyWorkers.filter(w => w.status === 'emergency').length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workers Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Workers in {currentEmbassy?.country}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Worker Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employer
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
                {embassyWorkers.map(worker => (
                  <tr key={worker.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                          <div className="text-sm text-gray-500">{worker.id}</div>
                          <div className="text-sm text-gray-500">{worker.homeDistrict}, Bangladesh</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{worker.employer}</div>
                      <div className="text-sm text-gray-500">{worker.jobTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(worker.status)}`}>
                        {getStatusText(worker.status)}
                      </span>
                      {worker.alerts && worker.alerts.length > 0 && (
                        <div className="mt-1 text-xs text-red-600">
                          {worker.alerts[0].message}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(worker.lastCheckIn).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(worker.lastCheckIn).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button 
                        onClick={() => setSelectedWorker(worker)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Contact Worker
                      </button>
                      {worker.status === 'emergency' && (
                        <button className="text-red-600 hover:text-red-900">
                          Emergency Response
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Worker Details</h3>
                <button 
                  onClick={() => setSelectedWorker(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {selectedWorker.name}</div>
                    <div><span className="font-medium">Age:</span> {selectedWorker.age}</div>
                    <div><span className="font-medium">Passport:</span> {selectedWorker.passport}</div>
                    <div><span className="font-medium">Phone:</span> {selectedWorker.phone}</div>
                    <div><span className="font-medium">Home District:</span> {selectedWorker.homeDistrict}</div>
                    <div><span className="font-medium">Emergency Contact:</span> {selectedWorker.emergencyContact}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Employment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Employer:</span> {selectedWorker.employer}</div>
                    <div><span className="font-medium">Job Title:</span> {selectedWorker.jobTitle}</div>
                    <div><span className="font-medium">Location:</span> {selectedWorker.location.city}</div>
                    <div><span className="font-medium">Contract Expiry:</span> {selectedWorker.contractExpiry}</div>
                    <div><span className="font-medium">Salary Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        selectedWorker.salaryStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedWorker.salaryStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedWorker.alerts && selectedWorker.alerts.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Active Alerts</h4>
                  {selectedWorker.alerts.map(alert => (
                    <div key={alert.id} className="text-sm text-red-800">
                      <div className="font-medium">{alert.type.toUpperCase()}</div>
                      <div>{alert.message}</div>
                      <div className="text-xs text-red-600 mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setSelectedWorker(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Contact Worker
                </button>
                {selectedWorker.status === 'emergency' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Emergency Action
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { workers } from '../data/mockWorkers';
import { 
  Heart, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Phone, 
  MessageCircle, 
  AlertTriangle,
  Calendar,
  DollarSign,
  User
} from 'lucide-react';

export default function FamilyPortal() {
  const [workerCode, setWorkerCode] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // For demo purposes, we'll use the first worker
  const demoWorker = workers[0];

  const handleLogin = (e) => {
    e.preventDefault();
    if (workerCode) {
      setSelectedWorker(demoWorker);
      setShowLogin(false);
    }
  };

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
      case 'safe': return 'Safe & Well';
      case 'check_overdue': return 'Check-in Overdue';
      case 'emergency': return 'Emergency';
      default: return 'Unknown';
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Family Access Portal</h1>
              <p className="text-gray-600 mt-2">Stay connected with your loved one abroad</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="workerCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Worker ID or Phone Number
                </label>
                <input
                  type="text"
                  id="workerCode"
                  value={workerCode}
                  onChange={(e) => setWorkerCode(e.target.value)}
                  placeholder="Enter BDW-2024-001 or +880171234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Access Information
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Demo Access</h3>
              <p className="text-sm text-blue-800 mb-2">
                For demonstration, enter any text above to access sample worker information.
              </p>
              <p className="text-xs text-blue-700">
                Sample ID: BDW-2024-001 (Md. Abdul Rahman)
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Need help? Call the helpline: <br />
                <span className="font-medium">+880-2-9898989</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Family Portal</h1>
                <p className="text-sm text-gray-500">Monitoring: {selectedWorker?.name}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowLogin(true)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Switch Worker
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedWorker?.name}</h2>
                <p className="text-gray-500">{selectedWorker?.jobTitle} in {selectedWorker?.destination}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(selectedWorker?.status)}`}>
                {getStatusText(selectedWorker?.status)}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Last check-in: {new Date(selectedWorker?.lastCheckIn).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Current Location</p>
                <p className="text-sm text-gray-500">{selectedWorker?.location.city}, {selectedWorker?.destination}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Contract Status</p>
                <p className="text-sm text-gray-500">Valid until {selectedWorker?.contractExpiry}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Salary Status</p>
                <p className={`text-sm ${selectedWorker?.salaryStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedWorker?.salaryStatus === 'paid' ? 'Paid on time' : 'Payment pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Daily check-in completed</p>
                    <p className="text-xs text-gray-500">Today at 8:30 AM local time</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Location updated</p>
                    <p className="text-xs text-gray-500">Yesterday at 6:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Salary received</p>
                    <p className="text-xs text-gray-500">March 25, 2024</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Message sent to family</p>
                    <p className="text-xs text-gray-500">March 24, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Stay Connected</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Send Message</p>
                      <p className="text-sm text-gray-500">Send a secure message</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Request Call</p>
                      <p className="text-sm text-gray-500">Schedule a call through embassy</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Report Concern</p>
                      <p className="text-sm text-gray-500">Report if you're worried</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Emergency Contact</h4>
                <p className="text-sm text-orange-800 mb-2">
                  {selectedWorker?.embassy}
                </p>
                <p className="text-sm text-orange-800">
                  24/7 Hotline: <span className="font-medium">+966-11-488-1717</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Worker Information */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Worker Information</h3>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Employment Details</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Employer:</span> {selectedWorker?.employer}</div>
                  <div><span className="font-medium">Job Title:</span> {selectedWorker?.jobTitle}</div>
                  <div><span className="font-medium">Work Location:</span> {selectedWorker?.location.city}</div>
                  <div><span className="font-medium">Departure Date:</span> {selectedWorker?.departureDate}</div>
                  <div><span className="font-medium">Contract Expiry:</span> {selectedWorker?.contractExpiry}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Health & Safety</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Health Status:</span> 
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {selectedWorker?.healthStatus}
                    </span>
                  </div>
                  <div><span className="font-medium">Documents:</span> All valid</div>
                  <div><span className="font-medium">Insurance:</span> Covered</div>
                  <div><span className="font-medium">Last Check-in:</span> {new Date(selectedWorker?.lastCheckIn).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
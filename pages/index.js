import React from 'react';
import Link from 'next/link';
import { Shield, Users, Building, Heart, MapPin, AlertTriangle } from 'lucide-react';
import { stats } from '../data/mockWorkers';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-bangladesh-green rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Bangladesh Worker Protection System</h1>
                <p className="text-sm text-gray-500">Ministry of Expatriates' Welfare and Overseas Employment</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-6 bg-bangladesh-green rounded-sm"></div>
              <div className="w-8 h-6 bg-bangladesh-red rounded-sm"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Protecting Our Workers Abroad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real-time tracking and safety monitoring for 1.5+ million Bangladeshi workers 
            across the Middle East. Ensuring their safety, security, and well-being.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-bangladesh-green">1.51M</div>
              <div className="text-sm text-gray-500">Protected Workers</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-500">Safe Status</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-500">Countries</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-500">Embassies</div>
            </div>
          </div>
        </div>

        {/* Access Portals */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Government Portal */}
          <Link href="/government" className="group">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 group-hover:border-bangladesh-green">
              <div className="w-16 h-16 bg-bangladesh-green rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Government Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Complete oversight of all overseas workers. National statistics, emergency alerts, 
                and policy insights for ministry officials.
              </p>
              <div className="flex items-center text-bangladesh-green font-semibold">
                Access Dashboard <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Embassy Portal */}
          <Link href="/embassy" className="group">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 group-hover:border-blue-500">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Embassy Portal</h3>
              <p className="text-gray-600 mb-4">
                Regional worker monitoring for embassy staff. Track workers in your jurisdiction, 
                respond to emergencies, and coordinate with local authorities.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                Embassy Access <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Family Portal */}
          <Link href="/family" className="group">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 group-hover:border-orange-500">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Family Access</h3>
              <p className="text-gray-600 mb-4">
                Stay connected with your loved ones abroad. Check their safety status, 
                location updates, and communicate through secure channels.
              </p>
              <div className="flex items-center text-orange-600 font-semibold">
                Family Login <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">System Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Location</h4>
              <p className="text-gray-600">GPS tracking with privacy controls and emergency location sharing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">SOS Alerts</h4>
              <p className="text-gray-600">Instant emergency notifications to embassies and authorities</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Family Connect</h4>
              <p className="text-gray-600">Secure communication channels between workers and families</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">© 2024 Ministry of Expatriates' Welfare and Overseas Employment</p>
              <p className="text-xs text-gray-400">Government of the People's Republic of Bangladesh</p>
            </div>
            <div className="text-sm">
              <p>Powered by Bangladesh Government Cloud (BDCCL)</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
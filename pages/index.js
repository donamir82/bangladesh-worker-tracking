import React from 'react';
import Link from 'next/link';
import { Shield, Users, Building, Heart, MapPin, AlertTriangle } from 'lucide-react';
import { stats } from '../data/mockWorkers';
import { useLanguage, useTranslation } from '../hooks/useLanguage';

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        {/* Government Header Bar */}
        <div className="bg-bangladesh-green">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">🇧🇩 {t('Government of the People\'s Republic of Bangladesh')}</div>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setLanguage('bn')}
                  className={`text-white text-sm border border-white/30 px-3 py-1 rounded hover:bg-white/10 ${language === 'bn' ? 'bg-white/20' : ''}`}
                >
                  বাংলা
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-white text-sm px-3 py-1 rounded hover:bg-white/10 ${language === 'en' ? 'bg-white/20' : 'border border-white/30'}`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {/* National Emblem */}
              <div className="w-12 h-12 bg-bangladesh-green rounded-full flex items-center justify-center border-2 border-bangladesh-green">
                <div className="text-white font-bold text-lg">🇧🇩</div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('Bangladesh Worker Protection System')}</h1>
                <p className="text-sm text-gray-600">{t('Ministry of Expatriates\' Welfare and Overseas Employment')}</p>
                <p className="text-xs text-gray-500">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right text-xs text-gray-500">
                <div>{t('Powered by')}</div>
                <div className="font-medium">{t('Bangladesh Government Cloud')}</div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-6 bg-bangladesh-green rounded-sm"></div>
                <div className="w-8 h-6 bg-bangladesh-red rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('Protecting Our Workers Abroad')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('Real-time tracking and safety monitoring for 1.5+ million Bangladeshi workers across the Middle East. Ensuring their safety, security, and well-being.')}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-bangladesh-green">1.51M</div>
              <div className="text-sm text-gray-500">{t('Protected Workers')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-500">{t('Safe Status')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-500">{t('Countries')}</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-500">{t('Embassies')}</div>
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('Government Dashboard')}</h3>
              <p className="text-gray-600 mb-4">
                {t('Complete oversight of all overseas workers. National statistics, emergency alerts, and policy insights for ministry officials.')}
              </p>
              <div className="flex items-center text-bangladesh-green font-semibold">
                {t('Access Dashboard')} <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Embassy Portal */}
          <Link href="/embassy" className="group">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 group-hover:border-blue-500">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('Embassy Portal')}</h3>
              <p className="text-gray-600 mb-4">
                {t('Regional worker monitoring for embassy staff. Track workers in your jurisdiction, respond to emergencies, and coordinate with local authorities.')}
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                {t('Embassy Access')} <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Family Portal */}
          <Link href="/family" className="group">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 group-hover:border-orange-500">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('Family Access')}</h3>
              <p className="text-gray-600 mb-4">
                {t('Stay connected with your loved ones abroad. Check their safety status, location updates, and communicate through secure channels.')}
              </p>
              <div className="flex items-center text-orange-600 font-semibold">
                {t('Family Login')} <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('System Features')}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('Real-time Location')}</h4>
              <p className="text-gray-600">{t('GPS tracking with privacy controls and emergency location sharing')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('SOS Alerts')}</h4>
              <p className="text-gray-600">{t('Instant emergency notifications to embassies and authorities')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('Family Connect')}</h4>
              <p className="text-gray-600">{t('Secure communication channels between workers and families')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">© 2024 {t('Ministry of Expatriates\' Welfare and Overseas Employment')}</p>
              <p className="text-xs text-gray-400">{t('Government of the People\'s Republic of Bangladesh')}</p>
            </div>
            <div className="text-sm">
              <p>{t('Powered by')} {t('Bangladesh Government Cloud')} (BDCCL)</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
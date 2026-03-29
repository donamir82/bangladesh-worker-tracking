import { useState, createContext, useContext } from 'react';

// Language Context
const LanguageContext = createContext();

// Bengali translations for key interface elements
const translations = {
  en: {
    // Navigation
    'Government Dashboard': 'Government Dashboard',
    'Embassy Portal': 'Embassy Portal', 
    'Family Access': 'Family Access',
    'Home': 'Home',
    'National': 'National',
    'Workers': 'Workers',
    'Generate Report': 'Generate Report',
    'Emergency Protocol': 'Emergency Protocol',
    'Back to Home': 'Back to Home',

    // Headers and Titles
    'Bangladesh Worker Protection System': 'Bangladesh Worker Protection System',
    'Ministry of Expatriates\' Welfare and Overseas Employment': 'Ministry of Expatriates\' Welfare and Overseas Employment',
    'Government of the People\'s Republic of Bangladesh': 'Government of the People\'s Republic of Bangladesh',
    'Bangladesh Government Cloud': 'Bangladesh Government Cloud',
    
    // Worker Status
    'Safe': 'Safe',
    'Emergency': 'Emergency', 
    'Check Overdue': 'Check Overdue',
    'All': 'All',
    
    // Statistics
    'Total Workers': 'Total Workers',
    'Safe Workers': 'Safe Workers', 
    'Active Alerts': 'Active Alerts',
    'Check-ins Today': 'Check-ins Today',
    'Emergency Response System': 'Emergency Response System',
    'Global Worker Distribution': 'Global Worker Distribution',
    'Live Analytics': 'Live Analytics',
    
    // Actions
    'Search': 'Search',
    'Filter': 'Filter',
    'Reset': 'Reset',
    'View Details': 'View Details',
    'Simulate Emergency Alert': 'Simulate Emergency Alert',
    'Reset Simulation': 'Reset Simulation',
    'Emergency Simulation Active': 'Emergency Simulation Active',
    
    // Worker Details
    'Name': 'Name',
    'Location': 'Location', 
    'Status': 'Status',
    'Employer': 'Employer',
    'Phone': 'Phone',
    'Age': 'Age',
    'Gender': 'Gender',
    'Passport': 'Passport',
    'Home District': 'Home District',
    'Emergency Contact': 'Emergency Contact',
    'Job Category': 'Job Category',
    'Salary Status': 'Salary Status',
    'Paid': 'Paid',
    'Pending': 'Pending',
    
    // Emergency Timeline
    'SOS Button Pressed': 'SOS Button Pressed',
    'Emergency Detected': 'Emergency Detected', 
    'Family Notified': 'Family Notified',
    'Embassy Contacted': 'Embassy Contacted',
    'Response Team Activated': 'Response Team Activated',
    'Contact Established': 'Contact Established',
    'Emergency Response Timeline': 'Emergency Response Timeline',
    'Situation Resolved': 'Situation Resolved',
    
    // Countries
    'Saudi Arabia': 'Saudi Arabia',
    'UAE': 'UAE', 
    'Qatar': 'Qatar',
    'Kuwait': 'Kuwait',
    'Oman': 'Oman',
    'Bahrain': 'Bahrain',
    'Jordan': 'Jordan',
    'Lebanon': 'Lebanon',
    
    // Time
    'Live': 'Live',
    'Last updated': 'Last updated',
    'Duration': 'Duration',
    'Response Time': 'Response Time',
    'Alerts Sent': 'Alerts Sent',
    'Timeline Events': 'Timeline Events',
    'Current Phase': 'Current Phase'
  },
  
  bn: {
    // Navigation  
    'Government Dashboard': 'সরকারি ড্যাশবোর্ড',
    'Embassy Portal': 'দূতাবাস পোর্টাল',
    'Family Access': 'পারিবারিক প্রবেশ',
    'Home': 'হোম',
    'National': 'জাতীয়',
    'Workers': 'শ্রমিক',
    'Generate Report': 'রিপোর্ট তৈরি করুন',
    'Emergency Protocol': 'জরুরি প্রোটোকল',
    'Back to Home': 'হোমে ফিরে যান',

    // Headers and Titles
    'Bangladesh Worker Protection System': 'বাংলাদেশ শ্রমিক সুরক্ষা ব্যবস্থা',
    'Ministry of Expatriates\' Welfare and Overseas Employment': 'প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়',
    'Government of the People\'s Republic of Bangladesh': 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    'Bangladesh Government Cloud': 'বাংলাদেশ সরকারি ক্লাউড',
    
    // Worker Status
    'Safe': 'নিরাপদ',
    'Emergency': 'জরুরি',
    'Check Overdue': 'চেক বিলম্বিত',
    'All': 'সকল',
    
    // Statistics  
    'Total Workers': 'মোট শ্রমিক',
    'Safe Workers': 'নিরাপদ শ্রমিক',
    'Active Alerts': 'সক্রিয় সতর্কতা',
    'Check-ins Today': 'আজকের চেক-ইন',
    'Emergency Response System': 'জরুরি প্রতিক্রিয়া ব্যবস্থা',
    'Global Worker Distribution': 'বৈশ্বিক শ্রমিক বিতরণ',
    'Live Analytics': 'লাইভ বিশ্লেষণ',
    
    // Actions
    'Search': 'খুঁজুন',
    'Filter': 'ছাঁকনি',
    'Reset': 'রিসেট',
    'View Details': 'বিস্তারিত দেখুন',
    'Simulate Emergency Alert': 'জরুরি সতর্কতা অনুকরণ',
    'Reset Simulation': 'অনুকরণ রিসেট',
    'Emergency Simulation Active': 'জরুরি অনুকরণ সক্রিয়',
    
    // Worker Details
    'Name': 'নাম',
    'Location': 'অবস্থান',
    'Status': 'অবস্থা', 
    'Employer': 'নিয়োগকর্তা',
    'Phone': 'ফোন',
    'Age': 'বয়স',
    'Gender': 'লিঙ্গ',
    'Passport': 'পাসপোর্ট',
    'Home District': 'বাড়ির জেলা',
    'Emergency Contact': 'জরুরি যোগাযোগ',
    'Job Category': 'কাজের ধরন',
    'Salary Status': 'বেতনের অবস্থা',
    'Paid': 'পরিশোধিত',
    'Pending': 'অমীমাংসিত',
    
    // Emergency Timeline
    'SOS Button Pressed': 'এসওএস বোতাম চাপা হয়েছে',
    'Emergency Detected': 'জরুরি অবস্থা শনাক্ত',
    'Family Notified': 'পরিবারকে জানানো হয়েছে', 
    'Embassy Contacted': 'দূতাবাসের সাথে যোগাযোগ',
    'Response Team Activated': 'প্রতিক্রিয়া দল সক্রিয়',
    'Contact Established': 'যোগাযোগ স্থাপিত',
    'Emergency Response Timeline': 'জরুরি প্রতিক্রিয়ার সময়রেখা',
    'Situation Resolved': 'পরিস্থিতি সমাধান',
    
    // Countries (keeping English for international recognition)
    'Saudi Arabia': 'সৌদি আরব',
    'UAE': 'সংযুক্ত আরব আমিরাত',
    'Qatar': 'কাতার', 
    'Kuwait': 'কুয়েত',
    'Oman': 'ওমান',
    'Bahrain': 'বাহরাইন',
    'Jordan': 'জর্ডান',
    'Lebanon': 'লেবানন',
    
    // Time
    'Live': 'লাইভ',
    'Last updated': 'শেষ আপডেট',
    'Duration': 'সময়কাল',
    'Response Time': 'প্রতিক্রিয়ার সময়',
    'Alerts Sent': 'সতর্কতা পাঠানো',
    'Timeline Events': 'সময়রেখার ঘটনা',
    'Current Phase': 'বর্তমান পর্যায়'
  }
};

// Language Hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation function
export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key, fallback = key) => {
    return translations[language]?.[key] || translations.en[key] || fallback;
  };
  
  return { t };
}

// Language Provider Component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };
  
  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isBengali: language === 'bn'
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default useLanguage;
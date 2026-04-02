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
    'Current Phase': 'Current Phase',

    // Homepage Content
    'Protecting Our Workers Abroad': 'Protecting Our Workers Abroad',
    'Real-time tracking and safety monitoring for 1.5+ million Bangladeshi workers across the Middle East. Ensuring their safety, security, and well-being.': 'Real-time tracking and safety monitoring for 1.5+ million Bangladeshi workers across the Middle East. Ensuring their safety, security, and well-being.',
    'Protected Workers': 'Protected Workers',
    'Safe Status': 'Safe Status',
    'Countries': 'Countries',
    'Embassies': 'Embassies',
    'Complete oversight of all overseas workers. National statistics, emergency alerts, and policy insights for ministry officials.': 'Complete oversight of all overseas workers. National statistics, emergency alerts, and policy insights for ministry officials.',
    'Access Dashboard': 'Access Dashboard',
    'Regional worker monitoring for embassy staff. Track workers in your jurisdiction, respond to emergencies, and coordinate with local authorities.': 'Regional worker monitoring for embassy staff. Track workers in your jurisdiction, respond to emergencies, and coordinate with local authorities.',
    'Embassy Access': 'Embassy Access',
    'Stay connected with your loved ones abroad. Check their safety status, location updates, and communicate through secure channels.': 'Stay connected with your loved ones abroad. Check their safety status, location updates, and communicate through secure channels.',
    'Family Login': 'Family Login',
    'System Features': 'System Features',
    'Real-time Location': 'Real-time Location',
    'GPS tracking with privacy controls and emergency location sharing': 'GPS tracking with privacy controls and emergency location sharing',
    'SOS Alerts': 'SOS Alerts',
    'Instant emergency notifications to embassies and authorities': 'Instant emergency notifications to embassies and authorities',
    'Family Connect': 'Family Connect',
    'Secure communication channels between workers and families': 'Secure communication channels between workers and families',
    'Powered by': 'Powered by'
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
    'Current Phase': 'বর্তমান পর্যায়',

    // Homepage Content
    'Protecting Our Workers Abroad': 'বিদেশে আমাদের শ্রমিকদের সুরক্ষা',
    'Real-time tracking and safety monitoring for 1.5+ million Bangladeshi workers across the Middle East. Ensuring their safety, security, and well-being.': 'মধ্যপ্রাচ্য জুড়ে ১৫+ লাখ বাংলাদেশী শ্রমিকের জন্য রিয়েল-টাইম ট্র্যাকিং এবং নিরাপত্তা নিরীক্ষণ। তাদের নিরাপত্তা, সুরক্ষা এবং কল্যাণ নিশ্চিত করা।',
    'Protected Workers': 'সুরক্ষিত শ্রমিক',
    'Safe Status': 'নিরাপদ অবস্থা',
    'Countries': 'দেশসমূহ',
    'Embassies': 'দূতাবাসসমূহ',
    'Complete oversight of all overseas workers. National statistics, emergency alerts, and policy insights for ministry officials.': 'সমস্ত প্রবাসী শ্রমিকের সম্পূর্ণ তত্ত্বাবধান। মন্ত্রণালয়ের কর্মকর্তাদের জন্য জাতীয় পরিসংখ্যান, জরুরি সতর্কতা এবং নীতি অন্তর্দৃষ্টি।',
    'Access Dashboard': 'ড্যাশবোর্ড অ্যাক্সেস',
    'Regional worker monitoring for embassy staff. Track workers in your jurisdiction, respond to emergencies, and coordinate with local authorities.': 'দূতাবাস কর্মীদের জন্য আঞ্চলিক শ্রমিক পর্যবেক্ষণ। আপনার এখতিয়ারে শ্রমিকদের ট্র্যাক করুন, জরুরি অবস্থায় সাড়া দিন এবং স্থানীয় কর্তৃপক্ষের সাথে সমন্বয় করুন।',
    'Embassy Access': 'দূতাবাস অ্যাক্সেস',
    'Stay connected with your loved ones abroad. Check their safety status, location updates, and communicate through secure channels.': 'বিদেশে আপনার প্রিয়জনদের সাথে যুক্ত থাকুন। তাদের নিরাপত্তার অবস্থা, অবস্থান আপডেট দেখুন এবং নিরাপদ চ্যানেলের মাধ্যমে যোগাযোগ করুন।',
    'Family Login': 'পারিবারিক লগইন',
    'System Features': 'সিস্টেম বৈশিষ্ট্য',
    'Real-time Location': 'রিয়েল-টাইম অবস্থান',
    'GPS tracking with privacy controls and emergency location sharing': 'গোপনীয়তা নিয়ন্ত্রণ এবং জরুরি অবস্থান ভাগাভাগি সহ জিপিএস ট্র্যাকিং',
    'SOS Alerts': 'এসওএস সতর্কতা',
    'Instant emergency notifications to embassies and authorities': 'দূতাবাস এবং কর্তৃপক্ষের কাছে তাৎক্ষণিক জরুরি বিজ্ঞপ্তি',
    'Family Connect': 'পারিবারিক সংযোগ',
    'Secure communication channels between workers and families': 'শ্রমিক এবং পরিবারের মধ্যে নিরাপদ যোগাযোগ চ্যানেল',
    'Powered by': 'চালিত'
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
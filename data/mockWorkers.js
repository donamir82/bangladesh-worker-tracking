// Mock data for Bangladesh overseas workers
export const workers = [
  {
    id: 'BDW-2024-001',
    name: 'Md. Abdul Rahman',
    age: 28,
    passport: 'BD1234567',
    phone: '+880171234567',
    emergencyContact: 'Rashida Rahman (Wife) - +880181234567',
    homeDistrict: 'Cumilla',
    destination: 'Saudi Arabia',
    employer: 'Al-Rashid Construction Co.',
    jobTitle: 'Construction Worker',
    departureDate: '2024-03-15',
    contractExpiry: '2026-03-15',
    location: {
      lat: 24.7136,
      lng: 46.6753,
      city: 'Riyadh',
      lastUpdate: '2024-03-28T08:30:00Z'
    },
    status: 'safe',
    lastCheckIn: '2024-03-28T08:00:00Z',
    embassy: 'Bangladesh Embassy, Riyadh',
    salaryStatus: 'paid',
    healthStatus: 'good',
    documents: ['passport', 'visa', 'work_permit', 'medical_certificate'],
    family: {
      spouse: 'Rashida Rahman',
      children: 2,
      address: 'Cumilla, Bangladesh'
    }
  },
  {
    id: 'BDW-2024-002',
    name: 'Fatema Khatun',
    age: 24,
    passport: 'BD2345678',
    phone: '+880172345678',
    emergencyContact: 'Md. Karim (Husband) - +880182345678',
    homeDistrict: 'Sylhet',
    destination: 'UAE',
    employer: 'Dubai Household Services',
    jobTitle: 'Domestic Worker',
    departureDate: '2024-02-20',
    contractExpiry: '2026-02-20',
    location: {
      lat: 25.2048,
      lng: 55.2708,
      city: 'Dubai',
      lastUpdate: '2024-03-28T09:15:00Z'
    },
    status: 'check_overdue',
    lastCheckIn: '2024-03-26T18:00:00Z',
    embassy: 'Bangladesh Consulate General, Dubai',
    salaryStatus: 'pending',
    healthStatus: 'good',
    documents: ['passport', 'visa', 'work_permit', 'medical_certificate'],
    family: {
      spouse: 'Md. Karim',
      children: 1,
      address: 'Sylhet, Bangladesh'
    }
  },
  {
    id: 'BDW-2024-003',
    name: 'Md. Rahim Uddin',
    age: 32,
    passport: 'BD3456789',
    phone: '+880173456789',
    emergencyContact: 'Nasir Uddin (Brother) - +880183456789',
    homeDistrict: 'Rangpur',
    destination: 'Qatar',
    employer: 'Doha Logistics Ltd.',
    jobTitle: 'Warehouse Supervisor',
    departureDate: '2024-01-10',
    contractExpiry: '2027-01-10',
    location: {
      lat: 25.2854,
      lng: 51.5310,
      city: 'Doha',
      lastUpdate: '2024-03-28T10:00:00Z'
    },
    status: 'safe',
    lastCheckIn: '2024-03-28T09:45:00Z',
    embassy: 'Bangladesh Embassy, Doha',
    salaryStatus: 'paid',
    healthStatus: 'good',
    documents: ['passport', 'visa', 'work_permit', 'medical_certificate'],
    family: {
      spouse: 'Salma Khatun',
      children: 3,
      address: 'Rangpur, Bangladesh'
    }
  },
  {
    id: 'BDW-2024-004',
    name: 'Nasir Ahmed',
    age: 26,
    passport: 'BD4567890',
    phone: '+880174567890',
    emergencyContact: 'Rashida Ahmed (Mother) - +880184567890',
    homeDistrict: 'Barisal',
    destination: 'Kuwait',
    employer: 'Kuwait Oil Services',
    jobTitle: 'Technician',
    departureDate: '2024-03-01',
    contractExpiry: '2026-03-01',
    location: {
      lat: 29.3759,
      lng: 47.9774,
      city: 'Kuwait City',
      lastUpdate: '2024-03-28T07:20:00Z'
    },
    status: 'emergency',
    lastCheckIn: '2024-03-27T15:30:00Z',
    embassy: 'Bangladesh Embassy, Kuwait',
    salaryStatus: 'paid',
    healthStatus: 'medical_attention_needed',
    documents: ['passport', 'visa', 'work_permit', 'medical_certificate'],
    family: {
      spouse: null,
      children: 0,
      address: 'Barisal, Bangladesh'
    },
    alerts: [
      {
        id: 'ALERT-001',
        type: 'medical',
        message: 'Worker reported workplace injury - needs medical attention',
        timestamp: '2024-03-27T15:30:00Z',
        priority: 'high',
        status: 'active'
      }
    ]
  },
  {
    id: 'BDW-2024-005',
    name: 'Salma Begum',
    age: 30,
    passport: 'BD5678901',
    phone: '+880175678901',
    emergencyContact: 'Abdul Begum (Father) - +880185678901',
    homeDistrict: 'Mymensingh',
    destination: 'Oman',
    employer: 'Muscat Hospitality Group',
    jobTitle: 'Hotel Cleaner',
    departureDate: '2024-02-05',
    contractExpiry: '2025-02-05',
    location: {
      lat: 23.5859,
      lng: 58.4059,
      city: 'Muscat',
      lastUpdate: '2024-03-28T11:00:00Z'
    },
    status: 'safe',
    lastCheckIn: '2024-03-28T10:30:00Z',
    embassy: 'Bangladesh Embassy, Muscat',
    salaryStatus: 'paid',
    healthStatus: 'good',
    documents: ['passport', 'visa', 'work_permit', 'medical_certificate'],
    family: {
      spouse: null,
      children: 0,
      address: 'Mymensingh, Bangladesh'
    }
  }
];

export const embassies = [
  {
    id: 'riyadh',
    name: 'Bangladesh Embassy, Riyadh',
    country: 'Saudi Arabia',
    address: 'Diplomatic Quarter, Riyadh 11693, Saudi Arabia',
    phone: '+966-11-488-1717',
    email: 'bdembassy@mofa.gov.bd',
    emergencyHotline: '+966-11-488-1717',
    workersCount: 450000,
    recentAlerts: 2
  },
  {
    id: 'dubai',
    name: 'Bangladesh Consulate General, Dubai', 
    country: 'UAE',
    address: 'Villa No. 22, Street No. 18A, Al Wasl Road, Dubai',
    phone: '+971-4-397-5391',
    email: 'cgdubai@mofa.gov.bd',
    emergencyHotline: '+971-4-397-5391',
    workersCount: 280000,
    recentAlerts: 1
  },
  {
    id: 'doha',
    name: 'Bangladesh Embassy, Doha',
    country: 'Qatar',
    address: 'Area No. 47, Street No. 220, Villa No. 13, New Doha',
    phone: '+974-4460-0200',
    email: 'bdembassy.doha@mofa.gov.bd',
    emergencyHotline: '+974-4460-0200',
    workersCount: 380000,
    recentAlerts: 0
  },
  {
    id: 'kuwait',
    name: 'Bangladesh Embassy, Kuwait',
    country: 'Kuwait',
    address: 'Diplomatic Area, Block 4, Street 1, Villa 24',
    phone: '+965-2252-5061',
    email: 'bdembassy.kuwait@mofa.gov.bd',
    emergencyHotline: '+965-2252-5061',
    workersCount: 220000,
    recentAlerts: 3
  },
  {
    id: 'muscat',
    name: 'Bangladesh Embassy, Muscat',
    country: 'Oman',
    address: 'Way No. 3021, Villa No. 1948, Al Khuwair',
    phone: '+968-2448-9900',
    email: 'bdembassy.muscat@mofa.gov.bd',
    emergencyHotline: '+968-2448-9900',
    workersCount: 180000,
    recentAlerts: 1
  }
];

export const stats = {
  totalWorkers: 1510000,
  safeWorkers: 1508500,
  alertsActive: 7,
  checkInsToday: 1205000,
  emergencyCases: 3,
  countries: 8,
  embassies: 12,
  lastUpdate: '2024-03-28T11:00:00Z'
};
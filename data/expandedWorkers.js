// Expanded mock data for Bangladesh overseas workers - 75 realistic profiles

const bangladeshiNames = {
  male: [
    'Md. Abdul Rahman', 'Md. Karim Uddin', 'Md. Rahim Uddin', 'Nasir Ahmed', 'Md. Rafiq Islam',
    'Md. Shahidul Islam', 'Md. Anwar Hossain', 'Md. Mizanur Rahman', 'Md. Jalal Uddin', 'Md. Fazlul Haque',
    'Md. Shamsul Alam', 'Md. Nurul Islam', 'Md. Aminul Islam', 'Md. Moklesur Rahman', 'Md. Bellal Hossain',
    'Md. Harun Or Rashid', 'Md. Mahbubur Rahman', 'Md. Delwar Hossain', 'Md. Mosharraf Hossain', 'Md. Kamrul Islam',
    'Md. Abdur Rouf', 'Md. Golam Mostafa', 'Md. Sirajul Islam', 'Md. Mostofa Kamal', 'Md. Ruhul Amin'
  ],
  female: [
    'Fatema Khatun', 'Rashida Begum', 'Salma Khatun', 'Nasreen Akter', 'Rahima Begum',
    'Ruma Akter', 'Sheuly Begum', 'Marium Khatun', 'Halima Khatun', 'Asma Begum',
    'Nazma Khatun', 'Rubina Akter', 'Taslima Begum', 'Maksuda Khatun', 'Kulsum Begum',
    'Rehana Khatun', 'Shahinur Begum', 'Monowara Khatun', 'Kohinoor Begum', 'Firoza Khatun'
  ]
};

const districts = [
  'Cumilla', 'Sylhet', 'Rangpur', 'Barisal', 'Mymensingh', 'Chattogram', 'Dhaka', 'Rajshahi',
  'Khulna', 'Noakhali', 'Brahmanbaria', 'Habiganj', 'Sunamganj', 'Moulvibazar', 'Dinajpur',
  'Thakurgaon', 'Panchagarh', 'Nilphamari', 'Lalmonirhat', 'Kurigram', 'Gaibandha', 'Bogura',
  'Naogaon', 'Joypurhat', 'Chapainawabganj', 'Natore', 'Sirajganj', 'Pabna', 'Manikganj'
];

const jobTypes = {
  'Saudi Arabia': ['Construction Worker', 'Security Guard', 'Driver', 'Technician', 'Cleaner', 'Factory Worker'],
  'UAE': ['Domestic Worker', 'Hotel Staff', 'Driver', 'Sales Assistant', 'Cleaner', 'Security Guard'],
  'Qatar': ['Construction Worker', 'Stadium Worker', 'Driver', 'Hotel Staff', 'Warehouse Supervisor', 'Technician'],
  'Kuwait': ['Oil Technician', 'Domestic Worker', 'Driver', 'Construction Worker', 'Security Guard', 'Cleaner'],
  'Oman': ['Hotel Staff', 'Construction Worker', 'Driver', 'Domestic Worker', 'Factory Worker', 'Cleaner'],
  'Bahrain': ['Factory Worker', 'Hotel Staff', 'Driver', 'Domestic Worker', 'Construction Worker'],
  'Jordan': ['Garment Worker', 'Factory Worker', 'Domestic Worker', 'Construction Worker'],
  'Lebanon': ['Domestic Worker', 'Cleaner', 'Factory Worker', 'Agricultural Worker']
};

const employers = {
  'Saudi Arabia': ['Al-Rashid Construction Co.', 'Saudi Aramco Contractors', 'Riyadh Development Co.', 'Kingdom Holdings', 'SABIC Industrial', 'Al-Khobar Services'],
  'UAE': ['Dubai Household Services', 'Emirates Hotel Group', 'Abu Dhabi Properties', 'Sharjah Trading Co.', 'Dubai Mall Services', 'Etisalat Contractors'],
  'Qatar': ['Doha Logistics Ltd.', 'Qatar Foundation', 'Al-Rayyan Construction', 'Hamad Medical Services', 'Qatar Airways Ground', 'World Cup Facilities'],
  'Kuwait': ['Kuwait Oil Services', 'Al-Jahra Construction', 'Kuwait Logistics', 'Al-Ahmadi Services', 'Kuwait Healthcare', 'National Industries'],
  'Oman': ['Muscat Hospitality Group', 'Royal Oman Services', 'Sohar Industrial', 'Nizwa Construction', 'Sultan Qaboos Services', 'Oman Oil Support'],
  'Bahrain': ['Manama Services Group', 'Bahrain Aluminum', 'Gulf Hotel Services', 'Riffa Construction', 'Bahrain Petroleum'],
  'Jordan': ['Amman Garment Factory', 'Jordan Valley Agriculture', 'King Hussein Services', 'Aqaba Port Services'],
  'Lebanon': ['Beirut Household Services', 'Cedar Services Co.', 'Mount Lebanon Construction', 'Tripoli Industries']
};

const embassyMap = {
  'Saudi Arabia': 'Bangladesh Embassy, Riyadh',
  'UAE': 'Bangladesh Consulate General, Dubai',
  'Qatar': 'Bangladesh Embassy, Doha', 
  'Kuwait': 'Bangladesh Embassy, Kuwait',
  'Oman': 'Bangladesh Embassy, Muscat',
  'Bahrain': 'Bangladesh Embassy, Manama',
  'Jordan': 'Bangladesh Embassy, Amman',
  'Lebanon': 'Bangladesh Embassy, Beirut'
};

const cities = {
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar'],
  'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Fujairah', 'Ras Al Khaimah'],
  'Qatar': ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor'],
  'Kuwait': ['Kuwait City', 'Al Ahmadi', 'Hawally', 'Al Farwaniyah', 'Al Jahra'],
  'Oman': ['Muscat', 'Salalah', 'Nizwa', 'Sur', 'Sohar'],
  'Bahrain': ['Manama', 'Muharraq', 'Riffa', 'Hamad Town', 'Isa Town'],
  'Jordan': ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Madaba'],
  'Lebanon': ['Beirut', 'Tripoli', 'Sidon', 'Zahle', 'Baalbek']
};

function generateWorkers() {
  const workers = [];
  let workerId = 1;
  
  // Distribution: SA: 25, UAE: 18, Qatar: 15, Kuwait: 10, Oman: 7, Others: 10
  const countryDistribution = {
    'Saudi Arabia': 25,
    'UAE': 18, 
    'Qatar': 15,
    'Kuwait': 10,
    'Oman': 7,
    'Bahrain': 4,
    'Jordan': 3,
    'Lebanon': 3
  };

  for (const [country, count] of Object.entries(countryDistribution)) {
    for (let i = 0; i < count; i++) {
      const isGender = Math.random() > 0.7 ? 'female' : 'male'; // 70% male, 30% female
      const namePool = bangladeshiNames[isGender];
      const name = namePool[Math.floor(Math.random() * namePool.length)];
      const district = districts[Math.floor(Math.random() * districts.length)];
      const jobPool = jobTypes[country];
      const jobTitle = jobPool[Math.floor(Math.random() * jobPool.length)];
      const employerPool = employers[country];
      const employer = employerPool[Math.floor(Math.random() * employerPool.length)];
      const cityPool = cities[country];
      const city = cityPool[Math.floor(Math.random() * cityPool.length)];
      
      // Generate realistic coordinates for each city
      const cityCoords = getCityCoordinates(city, country);
      
      // Status distribution: 90% safe, 8% check_overdue, 2% emergency
      const statusRandom = Math.random();
      let status = 'safe';
      if (statusRandom > 0.98) status = 'emergency';
      else if (statusRandom > 0.90) status = 'check_overdue';
      
      // Generate realistic dates
      const departureDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      const contractExpiry = new Date(departureDate);
      contractExpiry.setFullYear(contractExpiry.getFullYear() + 2);
      
      // Generate recent check-in times
      const lastCheckIn = new Date();
      if (status === 'check_overdue') {
        lastCheckIn.setHours(lastCheckIn.getHours() - (24 + Math.floor(Math.random() * 48))); // 1-3 days ago
      } else if (status === 'emergency') {
        lastCheckIn.setHours(lastCheckIn.getHours() - (48 + Math.floor(Math.random() * 72))); // 2-5 days ago  
      } else {
        lastCheckIn.setHours(lastCheckIn.getHours() - Math.floor(Math.random() * 24)); // Within last 24 hours
      }
      
      const worker = {
        id: `BDW-2024-${workerId.toString().padStart(3, '0')}`,
        name: name,
        age: 22 + Math.floor(Math.random() * 18), // Age 22-40
        passport: `BD${1000000 + workerId}`,
        phone: `+88017${Math.floor(1000000 + Math.random() * 9000000)}`,
        emergencyContact: generateEmergencyContact(isGender, district),
        homeDistrict: district,
        destination: country,
        employer: employer,
        jobTitle: jobTitle,
        departureDate: departureDate.toISOString().split('T')[0],
        contractExpiry: contractExpiry.toISOString().split('T')[0],
        location: {
          lat: cityCoords.lat + (Math.random() - 0.5) * 0.1, // Small variance
          lng: cityCoords.lng + (Math.random() - 0.5) * 0.1,
          city: city,
          lastUpdate: new Date().toISOString()
        },
        status: status,
        lastCheckIn: lastCheckIn.toISOString(),
        embassy: embassyMap[country],
        salaryStatus: Math.random() > 0.15 ? 'paid' : 'pending', // 85% paid on time
        healthStatus: status === 'emergency' ? 'medical_attention_needed' : 'good',
        documents: ['passport', 'visa', 'work_permit', 'medical_certificate'],
        family: {
          spouse: isGender === 'male' ? (Math.random() > 0.3 ? generateSpouseName('female') : null) : (Math.random() > 0.4 ? generateSpouseName('male') : null),
          children: Math.floor(Math.random() * 4), // 0-3 children
          address: `${district}, Bangladesh`
        }
      };
      
      // Add alerts for emergency cases
      if (status === 'emergency') {
        worker.alerts = [{
          id: `ALERT-${workerId}`,
          type: Math.random() > 0.5 ? 'medical' : 'workplace',
          message: Math.random() > 0.5 ? 'Worker reported workplace injury - needs medical attention' : 'Lost contact with worker - emergency response required',
          timestamp: lastCheckIn,
          priority: 'high',
          status: 'active'
        }];
      }
      
      workers.push(worker);
      workerId++;
    }
  }
  
  return workers;
}

function getCityCoordinates(city, country) {
  const coords = {
    // Saudi Arabia
    'Riyadh': { lat: 24.7136, lng: 46.6753 },
    'Jeddah': { lat: 21.4858, lng: 39.1925 },
    'Dammam': { lat: 26.4207, lng: 50.0888 },
    'Mecca': { lat: 21.3891, lng: 39.8579 },
    'Medina': { lat: 24.5247, lng: 39.5692 },
    'Khobar': { lat: 26.2172, lng: 50.1971 },
    
    // UAE  
    'Dubai': { lat: 25.2048, lng: 55.2708 },
    'Abu Dhabi': { lat: 24.2532, lng: 54.3665 },
    'Sharjah': { lat: 25.3463, lng: 55.4209 },
    'Al Ain': { lat: 24.2075, lng: 55.7447 },
    'Fujairah': { lat: 25.1164, lng: 56.3411 },
    'Ras Al Khaimah': { lat: 25.7889, lng: 55.9758 },
    
    // Qatar
    'Doha': { lat: 25.2854, lng: 51.5310 },
    'Al Rayyan': { lat: 25.2919, lng: 51.4240 },
    'Al Wakrah': { lat: 25.1654, lng: 51.6042 },
    'Umm Salal': { lat: 25.4097, lng: 51.4059 },
    'Al Khor': { lat: 25.6851, lng: 51.4969 },
    
    // Kuwait
    'Kuwait City': { lat: 29.3759, lng: 47.9774 },
    'Al Ahmadi': { lat: 29.0770, lng: 48.0836 },
    'Hawally': { lat: 29.3328, lng: 48.0289 },
    'Al Farwaniyah': { lat: 29.2775, lng: 47.9578 },
    'Al Jahra': { lat: 29.3375, lng: 47.6581 },
    
    // Oman
    'Muscat': { lat: 23.5859, lng: 58.4059 },
    'Salalah': { lat: 17.0151, lng: 54.0924 },
    'Nizwa': { lat: 22.9333, lng: 57.5333 },
    'Sur': { lat: 22.5667, lng: 59.5289 },
    'Sohar': { lat: 24.3472, lng: 56.7500 },
    
    // Bahrain
    'Manama': { lat: 26.2285, lng: 50.5860 },
    'Muharraq': { lat: 26.2541, lng: 50.6167 },
    'Riffa': { lat: 26.1300, lng: 50.5550 },
    'Hamad Town': { lat: 26.1167, lng: 50.4833 },
    'Isa Town': { lat: 26.1736, lng: 50.5478 },
    
    // Jordan
    'Amman': { lat: 31.9539, lng: 35.9106 },
    'Zarqa': { lat: 32.0728, lng: 36.0876 },
    'Irbid': { lat: 32.5556, lng: 35.8500 },
    'Aqaba': { lat: 29.5267, lng: 35.0067 },
    'Madaba': { lat: 31.7167, lng: 35.7833 },
    
    // Lebanon
    'Beirut': { lat: 33.8938, lng: 35.5018 },
    'Tripoli': { lat: 34.4333, lng: 35.8500 },
    'Sidon': { lat: 33.5633, lng: 35.3689 },
    'Zahle': { lat: 33.8467, lng: 35.9017 },
    'Baalbek': { lat: 34.0058, lng: 36.2089 }
  };
  
  return coords[city] || { lat: 25.0000, lng: 50.0000 }; // Default fallback
}

function generateEmergencyContact(gender, district) {
  const relationNames = {
    male: {
      wife: bangladeshiNames.female,
      mother: bangladeshiNames.female,
      brother: bangladeshiNames.male
    },
    female: {
      husband: bangladeshiNames.male,
      father: bangladeshiNames.male,
      mother: bangladeshiNames.female,
      brother: bangladeshiNames.male
    }
  };
  
  let relation, relationPool;
  if (gender === 'male') {
    const relations = ['wife', 'mother', 'brother'];
    relation = relations[Math.floor(Math.random() * relations.length)];
    relationPool = relationNames.male[relation];
  } else {
    const relations = ['husband', 'father', 'mother', 'brother'];
    relation = relations[Math.floor(Math.random() * relations.length)];
    relationPool = relationNames.female[relation];
  }
  
  const contactName = relationPool[Math.floor(Math.random() * relationPool.length)];
  const phone = `+88018${Math.floor(1000000 + Math.random() * 9000000)}`;
  
  return `${contactName} (${relation.charAt(0).toUpperCase() + relation.slice(1)}) - ${phone}`;
}

function generateSpouseName(gender) {
  const namePool = bangladeshiNames[gender];
  return namePool[Math.floor(Math.random() * namePool.length)];
}

export const expandedWorkers = generateWorkers();

// Updated embassy data with more realistic counts
export const updatedEmbassies = [
  {
    id: 'riyadh',
    name: 'Bangladesh Embassy, Riyadh',
    country: 'Saudi Arabia', 
    address: 'Diplomatic Quarter, Riyadh 11693, Saudi Arabia',
    phone: '+966-11-488-1717',
    email: 'bdembassy@mofa.gov.bd',
    emergencyHotline: '+966-11-488-1717',
    workersCount: 450000,
    recentAlerts: expandedWorkers.filter(w => w.destination === 'Saudi Arabia' && w.status !== 'safe').length
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
    recentAlerts: expandedWorkers.filter(w => w.destination === 'UAE' && w.status !== 'safe').length
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
    recentAlerts: expandedWorkers.filter(w => w.destination === 'Qatar' && w.status !== 'safe').length
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
    recentAlerts: expandedWorkers.filter(w => w.destination === 'Kuwait' && w.status !== 'safe').length
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
    recentAlerts: expandedWorkers.filter(w => w.destination === 'Oman' && w.status !== 'safe').length
  },
  {
    id: 'manama',
    name: 'Bangladesh Embassy, Manama',
    country: 'Bahrain',
    address: 'Building 1626, Road 4141, Block 341, Manama',
    phone: '+973-1774-3031',
    email: 'bdembassy.manama@mofa.gov.bd', 
    emergencyHotline: '+973-1774-3031',
    workersCount: 85000,
    recentAlerts: expandedWorkers.filter(w => w.destination === 'Bahrain' && w.status !== 'safe').length
  },
  {
    id: 'amman',
    name: 'Bangladesh Embassy, Amman',
    country: 'Jordan',
    address: '7th Circle, Jabal Amman, Amman 11183, Jordan',
    phone: '+962-6-464-4178',
    email: 'bdembassy.amman@mofa.gov.bd',
    emergencyHotline: '+962-6-464-4178',
    workersCount: 75000,
    recentAlerts: expandedWorkers.filter(w => w.destination === 'Jordan' && w.status !== 'safe').length
  },
  {
    id: 'beirut',
    name: 'Bangladesh Embassy, Beirut',
    country: 'Lebanon',
    address: 'Sin El Fil, Metn, Mount Lebanon, Lebanon',
    phone: '+961-1-494-016',
    email: 'bdembassy.beirut@mofa.gov.bd',
    emergencyHotline: '+961-1-494-016',
    workersCount: 65000,
    recentAlerts: expandedWorkers.filter(w => w.destination === 'Lebanon' && w.status !== 'safe').length
  }
];

// Updated stats
export const updatedStats = {
  totalWorkers: 1510000,
  safeWorkers: 1510000 - expandedWorkers.filter(w => w.status !== 'safe').length,
  alertsActive: expandedWorkers.filter(w => w.status !== 'safe').length,
  checkInsToday: Math.floor(1510000 * 0.8), // 80% checked in today
  emergencyCases: expandedWorkers.filter(w => w.status === 'emergency').length,
  countries: 8,
  embassies: 8,
  lastUpdate: new Date().toISOString()
};
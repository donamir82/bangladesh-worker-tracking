// Mock data for Bangladesh overseas workers — expanded dataset

// Helper to generate realistic data
const bangladeshDistricts = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Rangpur', 'Barisal',
  'Mymensingh', 'Cumilla', 'Gazipur', 'Narayanganj', 'Tangail', 'Bogura',
  'Jessore', 'Dinajpur', 'Brahmanbaria', 'Narsingdi', 'Noakhali', 'Feni',
  'Habiganj', 'Moulvibazar', 'Sunamganj', 'Kishoreganj', 'Sherpur', 'Netrokona',
  'Jamalpur', 'Pabna', 'Sirajganj', 'Natore', 'Chapainawabganj', 'Satkhira',
  'Cox\'s Bazar', 'Chandpur', 'Lakshmipur', 'Pirojpur', 'Patuakhali', 'Barguna',
  'Jhenaidah', 'Magura', 'Gopalganj', 'Madaripur', 'Shariatpur', 'Faridpur',
  'Manikganj', 'Munshiganj', 'Narail', 'Kushtia', 'Meherpur', 'Chuadanga'
];

const maleFirstNames = [
  'Md. Abdul', 'Md. Rahim', 'Md. Karim', 'Md. Hasan', 'Md. Rafiq', 'Md. Jamal',
  'Md. Shahid', 'Md. Nasir', 'Md. Faruk', 'Md. Sohel', 'Md. Rashed', 'Md. Mamun',
  'Md. Shafiq', 'Md. Delwar', 'Md. Zahir', 'Md. Billal', 'Md. Anwar', 'Md. Kamrul',
  'Md. Rezaul', 'Md. Mostafa', 'Md. Habib', 'Md. Ibrahim', 'Md. Monir', 'Md. Aziz',
  'Md. Firoz', 'Md. Sumon', 'Md. Rubel', 'Md. Shahin', 'Md. Alamgir', 'Md. Babul'
];

const maleLastNames = [
  'Rahman', 'Uddin', 'Ahmed', 'Hossain', 'Islam', 'Khan', 'Mia', 'Chowdhury',
  'Ali', 'Sarker', 'Talukder', 'Sikder', 'Bhuiyan', 'Siddique', 'Akter',
  'Prodhan', 'Mondol', 'Sheikh', 'Bepari', 'Mazumder'
];

const femaleNames = [
  'Fatema Khatun', 'Salma Begum', 'Rina Akter', 'Nasima Khatun', 'Ruma Begum',
  'Shahida Akter', 'Kulsum Begum', 'Monira Khatun', 'Taslima Begum', 'Shirin Akter',
  'Rahima Begum', 'Josna Khatun', 'Parveen Akter', 'Halima Begum', 'Nargis Khatun'
];

const saudiEmployers = [
  'Al-Rashid Construction Co.', 'Saudi Binladin Group', 'Al Haramain Facility Services',
  'Al Rajhi Hospitality', 'Saudi Oger Ltd.', 'Al-Tamimi & Company', 'Jeddah Household Services',
  'Al-Madinah Construction', 'Riyadh Star Services', 'Al-Qassim Agricultural Co.',
  'Saudi Arabian Maintenance Co.', 'Dammam Industrial Group', 'Al-Khobar Services Ltd.'
];

const uaeEmployers = [
  'Dubai Household Services', 'Emaar Properties LLC', 'Al Futtaim Group',
  'Dubai Construction Corp.', 'Abu Dhabi National Hotels', 'Sharjah Facility Management',
  'Emirates Hospitality Group', 'Nakheel Properties', 'Al Ghurair Group',
  'Dubai Star Cleaning Services', 'Ajman Free Zone Services'
];

const qatarEmployers = [
  'Doha Logistics Ltd.', 'Qatar Foundation Services', 'HBK Contracting',
  'Al Jaber Group', 'Barwa Real Estate', 'Qatar Airways Catering',
  'Lusail City Development', 'Al Khalij Commercial Group', 'Qatar Cool',
  'Hamad Medical Corporation Services'
];

const kuwaitEmployers = [
  'Kuwait Oil Services', 'Al-Ahli Cleaning Co.', 'Kuwait National Petroleum Corp.',
  'Al-Kharafi Group', 'Alghanim Industries', 'Gulf Cables & Electrical',
  'Kuwait Household Agency', 'Zain Telecom Services'
];

const omanEmployers = [
  'Muscat Hospitality Group', 'Oman Oil Company Services', 'Al Jazeera Services',
  'Sohar Port Services', 'Oman Construction Co.', 'Al Nawras Cleaning Services'
];

const otherEmployers = [
  'Bahrain Construction Co.', 'Jordan Hospitality Ltd.', 'Malaysia Palm Oil Corp.',
  'Libya Project Management', 'Singapore Marine Services', 'Brunei Shell Petroleum Services',
  'Maldives Resort Management', 'Lebanon Services Co.', 'Iraq Reconstruction Ltd.'
];

const jobTypes = {
  construction: ['Construction Worker', 'Mason', 'Steel Fixer', 'Electrician', 'Plumber', 'Carpenter', 'Welder', 'Heavy Equipment Operator', 'Scaffolder', 'Tile Setter'],
  domestic: ['Domestic Worker', 'Housekeeper', 'Cook', 'Nanny', 'Cleaner', 'Laundry Worker'],
  hospitality: ['Hotel Cleaner', 'Waiter', 'Kitchen Helper', 'Room Attendant', 'Bellboy', 'Restaurant Worker'],
  healthcare: ['Nurse Aide', 'Hospital Cleaner', 'Patient Care Assistant', 'Lab Helper'],
  manufacturing: ['Factory Worker', 'Machine Operator', 'Quality Inspector', 'Packaging Worker', 'Warehouse Supervisor'],
  other: ['Driver', 'Security Guard', 'Gardener', 'Office Cleaner', 'Delivery Worker', 'Technician']
};

const cities = {
  'Saudi Arabia': [
    { city: 'Riyadh', lat: 24.7136, lng: 46.6753 },
    { city: 'Jeddah', lat: 21.5433, lng: 39.1728 },
    { city: 'Dammam', lat: 26.4207, lng: 50.0888 },
    { city: 'Makkah', lat: 21.3891, lng: 39.8579 },
    { city: 'Madinah', lat: 24.4539, lng: 39.6142 },
    { city: 'Al Khobar', lat: 26.2172, lng: 50.1971 },
  ],
  'UAE': [
    { city: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { city: 'Abu Dhabi', lat: 24.4539, lng: 54.3773 },
    { city: 'Sharjah', lat: 25.3573, lng: 55.4033 },
    { city: 'Ajman', lat: 25.4052, lng: 55.5136 },
  ],
  'Qatar': [
    { city: 'Doha', lat: 25.2854, lng: 51.5310 },
    { city: 'Al Wakrah', lat: 25.1659, lng: 51.6067 },
    { city: 'Lusail', lat: 25.4200, lng: 51.4900 },
  ],
  'Kuwait': [
    { city: 'Kuwait City', lat: 29.3759, lng: 47.9774 },
    { city: 'Hawalli', lat: 29.3327, lng: 48.0287 },
    { city: 'Farwaniya', lat: 29.2776, lng: 47.9590 },
  ],
  'Oman': [
    { city: 'Muscat', lat: 23.5859, lng: 58.4059 },
    { city: 'Sohar', lat: 24.3615, lng: 56.7346 },
    { city: 'Salalah', lat: 17.0151, lng: 54.0924 },
  ],
  'Bahrain': [{ city: 'Manama', lat: 26.2285, lng: 50.5860 }],
  'Jordan': [{ city: 'Amman', lat: 31.9454, lng: 35.9284 }],
  'Malaysia': [{ city: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869 }],
  'Singapore': [{ city: 'Singapore', lat: 1.3521, lng: 103.8198 }],
};

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

// Seeded random for reproducibility
let seed = 42;
function seededRandom() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
function sRandomFrom(arr) { return arr[Math.floor(seededRandom() * arr.length)]; }
function sRandomInt(min, max) { return Math.floor(seededRandom() * (max - min + 1)) + min; }

// Country distribution: Saudi 20, UAE 15, Qatar 12, Kuwait 8, Oman 6, Others 9 = 70 total
const countryDistribution = [
  ...Array(20).fill('Saudi Arabia'),
  ...Array(15).fill('UAE'),
  ...Array(12).fill('Qatar'),
  ...Array(8).fill('Kuwait'),
  ...Array(6).fill('Oman'),
  ...Array(3).fill('Bahrain'),
  ...Array(2).fill('Jordan'),
  ...Array(2).fill('Malaysia'),
  ...Array(2).fill('Singapore'),
];

function getEmployers(country) {
  switch(country) {
    case 'Saudi Arabia': return saudiEmployers;
    case 'UAE': return uaeEmployers;
    case 'Qatar': return qatarEmployers;
    case 'Kuwait': return kuwaitEmployers;
    case 'Oman': return omanEmployers;
    default: return otherEmployers;
  }
}

function getEmbassyName(country) {
  switch(country) {
    case 'Saudi Arabia': return 'Bangladesh Embassy, Riyadh';
    case 'UAE': return 'Bangladesh Consulate General, Dubai';
    case 'Qatar': return 'Bangladesh Embassy, Doha';
    case 'Kuwait': return 'Bangladesh Embassy, Kuwait';
    case 'Oman': return 'Bangladesh Embassy, Muscat';
    case 'Bahrain': return 'Bangladesh Embassy, Manama';
    case 'Jordan': return 'Bangladesh Embassy, Amman';
    case 'Malaysia': return 'Bangladesh High Commission, Kuala Lumpur';
    case 'Singapore': return 'Bangladesh High Commission, Singapore';
    default: return 'Bangladesh Embassy';
  }
}

function generateWorkers() {
  const result = [];

  for (let i = 0; i < 70; i++) {
    const country = countryDistribution[i];
    const isFemale = seededRandom() < 0.25; // 25% female
    const name = isFemale ? sRandomFrom(femaleNames) : `${sRandomFrom(maleFirstNames)} ${sRandomFrom(maleLastNames)}`;
    const age = sRandomInt(20, 45);
    const district = sRandomFrom(bangladeshDistricts);
    const cityInfo = sRandomFrom(cities[country] || [{ city: country, lat: 25, lng: 50 }]);
    const employer = sRandomFrom(getEmployers(country));

    // Job type weighted toward construction for males, domestic for females
    let jobCategory;
    const r = seededRandom();
    if (isFemale) {
      if (r < 0.45) jobCategory = 'domestic';
      else if (r < 0.70) jobCategory = 'hospitality';
      else if (r < 0.85) jobCategory = 'healthcare';
      else jobCategory = 'other';
    } else {
      if (r < 0.45) jobCategory = 'construction';
      else if (r < 0.60) jobCategory = 'manufacturing';
      else if (r < 0.75) jobCategory = 'other';
      else if (r < 0.85) jobCategory = 'hospitality';
      else jobCategory = 'construction';
    }
    const jobTitle = sRandomFrom(jobTypes[jobCategory]);

    // Status: 90% safe, 8% check_overdue, 2% emergency
    let status;
    const sr = seededRandom();
    if (sr < 0.90) status = 'safe';
    else if (sr < 0.98) status = 'check_overdue';
    else status = 'emergency';

    const departureDate = randomDate(new Date('2022-01-01'), new Date('2025-12-01'));
    const contractYears = sRandomInt(2, 3);
    const depDate = new Date(departureDate);
    const expDate = new Date(depDate);
    expDate.setFullYear(expDate.getFullYear() + contractYears);

    const salaryStatus = seededRandom() < 0.85 ? 'paid' : 'pending';
    const healthStatus = status === 'emergency' ? 'medical_attention_needed' : (seededRandom() < 0.95 ? 'good' : 'minor_issue');

    // Last check-in: safe = recent, overdue = 2-7 days ago, emergency = 1-3 days ago
    const now = new Date('2026-03-28T12:00:00Z');
    let lastCheckIn;
    if (status === 'safe') {
      const hoursAgo = sRandomInt(0, 23);
      lastCheckIn = new Date(now - hoursAgo * 3600000);
    } else if (status === 'check_overdue') {
      const daysAgo = sRandomInt(2, 7);
      lastCheckIn = new Date(now - daysAgo * 86400000);
    } else {
      const daysAgo = sRandomInt(1, 3);
      lastCheckIn = new Date(now - daysAgo * 86400000);
    }

    const passportNum = `BD${String(sRandomInt(1000000, 9999999))}`;
    const phoneEnd = String(sRandomInt(1000000, 9999999)).padStart(7, '0');

    const hasSpouse = seededRandom() < 0.65;
    const spouseName = isFemale
      ? `Md. ${sRandomFrom(maleFirstNames).replace('Md. ', '')} ${sRandomFrom(maleLastNames)}`
      : sRandomFrom(femaleNames);
    const children = hasSpouse ? sRandomInt(0, 4) : 0;

    const emergencyRelation = hasSpouse ? (isFemale ? 'Husband' : 'Wife') : sRandomFrom(['Mother', 'Father', 'Brother', 'Sister']);
    const emergencyName = hasSpouse ? spouseName : `${sRandomFrom(maleFirstNames)} ${sRandomFrom(maleLastNames)}`;

    const worker = {
      id: `BDW-2024-${String(i + 1).padStart(3, '0')}`,
      name,
      age,
      gender: isFemale ? 'Female' : 'Male',
      passport: passportNum,
      phone: `+88017${phoneEnd}`,
      emergencyContact: `${emergencyName} (${emergencyRelation}) - +88018${String(sRandomInt(1000000, 9999999)).padStart(7, '0')}`,
      homeDistrict: district,
      destination: country,
      employer,
      jobTitle,
      jobCategory,
      departureDate,
      contractExpiry: expDate.toISOString().split('T')[0],
      location: {
        lat: cityInfo.lat + (seededRandom() - 0.5) * 0.1,
        lng: cityInfo.lng + (seededRandom() - 0.5) * 0.1,
        city: cityInfo.city,
        lastUpdate: lastCheckIn.toISOString(),
      },
      status,
      lastCheckIn: lastCheckIn.toISOString(),
      embassy: getEmbassyName(country),
      salaryStatus,
      healthStatus,
      documents: ['passport', 'visa', 'work_permit', 'medical_certificate'],
      family: {
        spouse: hasSpouse ? spouseName : null,
        children,
        address: `${district}, Bangladesh`,
      },
    };

    // Add alerts for emergency/overdue workers
    if (status === 'emergency') {
      const alertTypes = [
        { type: 'medical', message: 'Worker reported workplace injury — needs medical attention' },
        { type: 'safety', message: 'Worker reports unsafe working conditions and requests immediate assistance' },
        { type: 'abuse', message: 'Worker reports employer abuse — passport confiscated' },
        { type: 'medical', message: 'Worker hospitalized after heat stroke incident' },
      ];
      const alert = sRandomFrom(alertTypes);
      worker.alerts = [{
        id: `ALERT-${String(i + 1).padStart(3, '0')}`,
        type: alert.type,
        message: alert.message,
        timestamp: lastCheckIn.toISOString(),
        priority: 'high',
        status: 'active',
      }];
    } else if (status === 'check_overdue') {
      worker.alerts = [{
        id: `ALERT-${String(i + 1).padStart(3, '0')}`,
        type: 'overdue',
        message: `No check-in received for ${Math.ceil((now - lastCheckIn) / 86400000)} days`,
        timestamp: lastCheckIn.toISOString(),
        priority: 'medium',
        status: 'active',
      }];
    }

    result.push(worker);
  }

  return result;
}

export const workers = generateWorkers();

export const embassies = [
  {
    id: 'riyadh',
    name: 'Bangladesh Embassy, Riyadh',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    address: 'Diplomatic Quarter, Riyadh 11693, Saudi Arabia',
    phone: '+966-11-488-1717',
    email: 'bdembassy@mofa.gov.bd',
    emergencyHotline: '+966-11-488-1717',
    workersCount: 450000,
    get registeredWorkers() { return workers.filter(w => w.destination === 'Saudi Arabia').length; },
    get recentAlerts() { return workers.filter(w => w.destination === 'Saudi Arabia' && w.status !== 'safe').length; },
  },
  {
    id: 'dubai',
    name: 'Bangladesh Consulate General, Dubai',
    country: 'UAE',
    flag: '🇦🇪',
    address: 'Villa No. 22, Street No. 18A, Al Wasl Road, Dubai',
    phone: '+971-4-397-5391',
    email: 'cgdubai@mofa.gov.bd',
    emergencyHotline: '+971-4-397-5391',
    workersCount: 280000,
    get registeredWorkers() { return workers.filter(w => w.destination === 'UAE').length; },
    get recentAlerts() { return workers.filter(w => w.destination === 'UAE' && w.status !== 'safe').length; },
  },
  {
    id: 'doha',
    name: 'Bangladesh Embassy, Doha',
    country: 'Qatar',
    flag: '🇶🇦',
    address: 'Area No. 47, Street No. 220, Villa No. 13, New Doha',
    phone: '+974-4460-0200',
    email: 'bdembassy.doha@mofa.gov.bd',
    emergencyHotline: '+974-4460-0200',
    workersCount: 380000,
    get registeredWorkers() { return workers.filter(w => w.destination === 'Qatar').length; },
    get recentAlerts() { return workers.filter(w => w.destination === 'Qatar' && w.status !== 'safe').length; },
  },
  {
    id: 'kuwait',
    name: 'Bangladesh Embassy, Kuwait',
    country: 'Kuwait',
    flag: '🇰🇼',
    address: 'Diplomatic Area, Block 4, Street 1, Villa 24',
    phone: '+965-2252-5061',
    email: 'bdembassy.kuwait@mofa.gov.bd',
    emergencyHotline: '+965-2252-5061',
    workersCount: 220000,
    get registeredWorkers() { return workers.filter(w => w.destination === 'Kuwait').length; },
    get recentAlerts() { return workers.filter(w => w.destination === 'Kuwait' && w.status !== 'safe').length; },
  },
  {
    id: 'muscat',
    name: 'Bangladesh Embassy, Muscat',
    country: 'Oman',
    flag: '🇴🇲',
    address: 'Way No. 3021, Villa No. 1948, Al Khuwair',
    phone: '+968-2448-9900',
    email: 'bdembassy.muscat@mofa.gov.bd',
    emergencyHotline: '+968-2448-9900',
    workersCount: 180000,
    get registeredWorkers() { return workers.filter(w => w.destination === 'Oman').length; },
    get recentAlerts() { return workers.filter(w => w.destination === 'Oman' && w.status !== 'safe').length; },
  },
  {
    id: 'manama',
    name: 'Bangladesh Embassy, Manama',
    country: 'Bahrain',
    flag: '🇧🇭',
    address: 'Building 59, Road 1901, Block 319, Manama',
    phone: '+973-1722-1761',
    email: 'bdembassy.manama@mofa.gov.bd',
    emergencyHotline: '+973-1722-1761',
    workersCount: 120000,
    get registeredWorkers() { return workers.filter(w => w.destination === 'Bahrain').length; },
    get recentAlerts() { return workers.filter(w => w.destination === 'Bahrain' && w.status !== 'safe').length; },
  },
  {
    id: 'amman',
    name: 'Bangladesh Embassy, Amman',
    country: 'Jordan',
    flag: '🇯🇴',
    address: 'Abdoun, Amman, Jordan',
    phone: '+962-6-592-4871',
    email: 'bdembassy.amman@mofa.gov.bd',
    emergencyHotline: '+962-6-592-4871',
    workersCount: 45000,
    get registeredWorkers() { return workers.filter(w => w.destination === 'Jordan').length; },
    get recentAlerts() { return workers.filter(w => w.destination === 'Jordan' && w.status !== 'safe').length; },
  },
  {
    id: 'kl',
    name: 'Bangladesh High Commission, KL',
    country: 'Malaysia',
    flag: '🇲🇾',
    address: 'Jalan Ampang, Kuala Lumpur, Malaysia',
    phone: '+60-3-2148-7940',
    email: 'bdhc.kl@mofa.gov.bd',
    emergencyHotline: '+60-3-2148-7940',
    workersCount: 95000,
    get registeredWorkers() { return workers.filter(w => w.destination === 'Malaysia').length; },
    get recentAlerts() { return workers.filter(w => w.destination === 'Malaysia' && w.status !== 'safe').length; },
  },
];

// Dynamic stats computed from workers array
export const stats = {
  get totalWorkers() { return 1510000; },
  get safeWorkers() { return 1510000 - 12500 - 340; },
  get alertsActive() { return workers.filter(w => w.status !== 'safe').length; },
  get checkInsToday() { return 1205000; },
  get emergencyCases() { return workers.filter(w => w.status === 'emergency').length; },
  get overdueCheckIns() { return workers.filter(w => w.status === 'check_overdue').length; },
  countries: 8,
  embassies: 12,
  lastUpdate: new Date().toISOString(),
};

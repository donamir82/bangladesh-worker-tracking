# Bangladesh Overseas Worker Tracking System

A comprehensive web application prototype for monitoring and protecting Bangladeshi workers abroad. This system provides real-time tracking, emergency alerts, and role-based access for government officials, embassy staff, and families.

## 🎯 Project Overview

**Goal:** Protect 1.5+ million Bangladeshi overseas workers through technology-enabled monitoring and support.

**Key Features:**
- Real-time GPS tracking and safety monitoring
- Role-based access control (Government, Embassy, Family)
- Emergency alert system with SOS capabilities
- Worker status monitoring and health tracking
- Family communication portal
- Embassy coordination tools

## 🏗️ System Architecture

### User Roles
1. **Government Dashboard** - Ministry officials with national oversight
2. **Embassy Portal** - Regional monitoring for embassy staff
3. **Family Access** - Personal worker information for families

### Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Maps:** Leaflet (ready for implementation)
- **Icons:** Lucide React
- **Styling:** Tailwind CSS with Bangladesh flag colors
- **Deployment:** Vercel (prototype), BDCCL Cloud (production)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bangladesh-worker-tracking
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📱 Application Screens

### Landing Page (`/`)
- System overview with national statistics
- Role-based portal selection
- Bangladesh government branding

### Government Dashboard (`/government`)
- National worker statistics
- Embassy overview and alerts
- Worker status monitoring
- Recent activity feed

### Embassy Portal (`/embassy`)
- Regional worker management
- Embassy-specific statistics
- Worker detail views
- Emergency response tools

### Family Access (`/family`)
- Worker safety status
- Communication tools
- Recent activity updates
- Emergency contact information

## 🗃️ Mock Data

The application includes realistic mock data representing:
- 5 sample workers across different Middle Eastern countries
- Embassy information for major destinations
- Worker status types (Safe, Check Overdue, Emergency)
- Activity logs and communication records

### Sample Worker Data
```javascript
{
  id: 'BDW-2024-001',
  name: 'Md. Abdul Rahman',
  destination: 'Saudi Arabia',
  status: 'safe',
  location: { lat: 24.7136, lng: 46.6753, city: 'Riyadh' },
  employer: 'Al-Rashid Construction Co.',
  // ... additional fields
}
```

## 🎨 Design System

### Colors
- **Bangladesh Green:** `#006a4e` - Primary government color
- **Bangladesh Red:** `#f42a41` - Accent and alert color
- **Status Colors:**
  - Safe: Green (`#22c55e`)
  - Check Overdue: Yellow (`#eab308`)
  - Emergency: Red (`#ef4444`)

### Typography
- **Font:** Inter (Google Fonts)
- **Hierarchy:** Bold headings, medium subheadings, regular body text

## 🔒 Security Considerations

### Current (Prototype)
- Mock data only - no sensitive information
- Client-side only - no backend database
- Public deployment safe for demonstrations

### Production Requirements
- Bangladesh Government Cloud (BDCCL) hosting
- Encrypted data storage and transmission
- Multi-factor authentication
- Role-based access controls
- Audit logging
- VPN access for embassy connections

## 🌍 Deployment

### Vercel Deployment (Current)

1. **Connect to Vercel**
```bash
npx vercel
```

2. **Configure project**
- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`

3. **Environment variables** (if needed)
- None required for prototype

### Production Deployment (Future)

**Target Platform:** Bangladesh Data Center Company Limited (BDCCL)
- Oracle Cloud Infrastructure (OCI) Dedicated Region
- Government-grade security compliance
- Data sovereignty within Bangladesh
- Integration with Smart Bangladesh 2041 initiative

## 📊 System Metrics

### Demo Statistics
- **Total Workers:** 1,510,000
- **Safe Workers:** 1,508,500 (99.9%)
- **Active Alerts:** 7
- **Countries Covered:** 8
- **Embassy Locations:** 12

## 🛠️ Development Roadmap

### Phase 1: Prototype ✅
- [x] Core UI/UX design
- [x] Role-based interfaces
- [x] Mock data integration
- [x] Vercel deployment

### Phase 2: Backend Integration
- [ ] Government cloud connection
- [ ] Real database integration
- [ ] Authentication system
- [ ] API development

### Phase 3: Hardware Integration
- [ ] GPS tracker connectivity
- [ ] Real-time location updates
- [ ] SOS alert system
- [ ] Mobile app development

### Phase 4: Production Deployment
- [ ] BDCCL cloud migration
- [ ] Security hardening
- [ ] Government approval process
- [ ] Embassy training program

## 🤝 Stakeholders

### Government Partners
- Ministry of Expatriates' Welfare and Overseas Employment
- Bangladesh Data Center Company Limited (BDCCL)
- Foreign Ministry (Embassy coordination)

### Technical Partners
- Oracle Cloud Infrastructure
- Bangladesh ICT Division
- Embassy IT departments

## 📞 Support & Contact

### For Government Officials
- Technical Support: BDCCL Help Desk
- Policy Questions: Ministry of Expatriates' Welfare

### For Embassy Staff
- System Access: Embassy IT Coordinator
- Emergency Protocols: Regional Embassy Director

### For Families
- Worker Information: Family Helpline +880-2-9898989
- Technical Help: Local support centers

## 📄 License

Government of the People's Republic of Bangladesh
Ministry of Expatriates' Welfare and Overseas Employment

---

**Built for Smart Bangladesh 2041**
*Protecting our workers, connecting our families, strengthening our nation.*
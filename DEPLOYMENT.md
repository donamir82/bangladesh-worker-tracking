# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy from project directory**
```bash
cd bangladesh-worker-tracking
vercel
```

4. **Follow the prompts:**
- Set up and deploy? **Y**
- Which scope? **Select your account**
- Link to existing project? **N** (for new project)
- What's your project's name? **bangladesh-worker-tracking**
- In which directory is your code located? **.** 
- Want to override settings? **N**

### Option 2: Vercel Dashboard

1. **Go to vercel.com/dashboard**
2. **Click "New Project"**
3. **Import from Git** (if you've pushed to GitHub)
4. **Configure:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Deploy**

## Environment Setup

### For Local Development
```bash
npm install
npm run dev
```

### For Production Build (Test)
```bash
npm run build
npm start
```

## Post-Deployment

### 1. Test All Routes
- `/` - Landing page
- `/government` - Government dashboard  
- `/embassy` - Embassy portal
- `/family` - Family access

### 2. Verify Responsiveness
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

### 3. Check Performance
- Page load speeds
- Image optimization
- Mobile performance

## Custom Domain (Optional)

### Add Custom Domain in Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., worker-tracking.gov.bd)
3. Configure DNS as instructed
4. SSL will be automatic

## Monitoring

### Vercel Analytics
- Automatic visitor analytics
- Performance monitoring
- Error tracking

### For Government Use
- Consider Google Analytics
- Monitor system usage
- Track user engagement

## Security Notes

### Current (Prototype)
- ✅ HTTPS enabled by default
- ✅ No sensitive data stored
- ✅ Client-side only
- ✅ Safe for public demo

### Production (BDCCL)
- 🔒 End-to-end encryption
- 🔒 Government authentication
- 🔒 VPN access required
- 🔒 Audit logging

## Estimated Costs

### Vercel Free Tier
- ✅ Perfect for prototype
- ✅ Custom domain included
- ✅ Automatic HTTPS
- ✅ Global CDN

### If Upgrade Needed
- Vercel Pro: $20/month
- Only needed for:
  - High traffic (>100GB bandwidth)
  - Team collaboration
  - Advanced analytics

## Support

### Deployment Issues
1. Check build logs in Vercel dashboard
2. Verify all dependencies in package.json
3. Ensure no TypeScript errors
4. Check for missing environment variables

### Common Fixes
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Need Help?
- Vercel Documentation: vercel.com/docs
- Next.js Docs: nextjs.org/docs
- Contact: [Your technical contact]

---

**Ready to show the Minister!** 🚀
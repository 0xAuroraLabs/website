# Auroral Labs - Pet Health Monitoring Website

## 🚀 Production Ready for GitHub + Vercel

This application is now production-ready and can be deployed to Vercel directly from GitHub.

## 📋 Quick Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Production ready Auroral Labs website"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Import the project
4. Add environment variables in Vercel dashboard
5. Deploy!


## 🔥 Firebase Setup

### Deploy Firestore Security Rules
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (select your project)
firebase init firestore

# Deploy the security rules
firebase deploy --only firestore:rules
```

## 🎯 Features

- ✅ **Production Ready**: Works with Vercel, Netlify, or any static hosting
- ✅ **MVP Countdown Timer**: Beautiful animated countdown to launch date
- ✅ **Firebase Integration**: Secure form data collection
- ✅ **Contact Forms**: Send messages to Firestore database
- ✅ **Notify Forms**: Collect email addresses for launch notifications
- ✅ **Responsive Design**: Works on all devices
- ✅ **No Server Required**: Pure static site with client-side Firebase

## 📁 Project Structure

```
aurorallabs/
├── vercel.json              # Vercel configuration
├── .gitignore               # Git ignore rules
├── firestore.rules          # Firebase security rules
├── js/script.js             # Main JavaScript
├── css/styles.css           # Styles including timer
├── index.html               # Home page
├── contact.html             # Contact page
├── app.html                 # App page
├── product.html             # Product page
└── README.md                # This file
```

## 🛡️ Security

- Firebase credentials are configured via environment variables
- Client-side only receives public Firebase config
- Firestore rules restrict access to specific collections
- No sensitive data in code repository

## Configuration & Firebase

Firebase web config is now directly inlined in each HTML page (see bottom of `index.html`, `app.html`, etc.) because these values are public identifiers and cannot be truly hidden in a client-only architecture. Sensitive access is still protected by Firestore security rules. No `/api/config` endpoint is used anymore.

If you later move data operations server-side, replace inline config with backend endpoints using the Firebase Admin SDK and remove Firestore writes from client JS.

## 🎨 Timer Styling

The MVP countdown timer features:
- Glassmorphism design with backdrop blur
- Pulsing animation
- Responsive design for all screen sizes
- Rocket emoji icon
- Professional typography

## 🔥 Firebase Collections

- `notifyEmails`: Stores email addresses from notify forms
- `contactMessages`: Stores contact form submissions

## 🚀 Local Development

### Option 1: Static Hosting (Recommended)
```bash
# Use any static server (Live Server, Python, etc.)
# The app will work with fallback configuration
```

### Option 2: With Node.js Server
```bash
npm install
npm start
```

## 📝 Troubleshooting

### Firebase Permission Errors
1. Deploy the `firestore.rules` file using Firebase CLI
2. Ensure your Firebase project is properly configured
3. Check that all environment variables are set in Vercel

### Timer Not Showing
1. Check browser console for errors
2. Verify environment variables are set in Vercel
3. Ensure `MVP_LAUNCH_DATE` is in correct format

### Forms Not Working
1. Check Firebase initialization in browser console
2. Verify Firestore rules are deployed
3. Ensure all Firebase environment variables are set in Vercel

## 🌐 Deployment URLs

After deployment, your site will be available at:
- Vercel: `https://your-project.vercel.app`
- Custom domain: `https://aurorallabs.com/` (if configured)

## 📞 Support

For issues with:
- **Vercel Deployment**: Check Vercel logs and environment variables
- **Firebase**: Verify Firestore rules and project configuration
- **Website**: Check browser console for JavaScript errors 

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXqaWej0qfb_qx6oj64xaLwO7M0W1BkU4",
  authDomain: "global-group-777.firebaseapp.com",
  projectId: "global-group-777",
  storageBucket: "global-group-777.firebasestorage.app",
  messagingSenderId: "273594875580",
  appId: "1:273594875580:web:5285cc48d657db348f5ab9",
  measurementId: "G-68KH7EJ9WQ"
};

// Initialize Firebase (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (client-side only)
let analytics: ReturnType<typeof getAnalytics> | null = null;

const initializeAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(app);
    }
  }
  return analytics;
};

// Initialize Auth
const auth = getAuth(app);

export { app, db, auth, analytics, initializeAnalytics };

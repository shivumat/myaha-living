import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase Config (Get from Firebase Console > Project Settings)
const firebaseConfig = {
  apiKey: 'AIzaSyA99Btrrkno7o9CVscX491TU92AZiYBX0A',
  authDomain: 'myaha-waitlist.firebaseapp.com',
  projectId: 'myaha-waitlist',
  storageBucket: 'myaha-waitlist.firebasestorage.app',
  messagingSenderId: '149639123400',
  appId: '1:149639123400:web:1d36fbed48778a8467f0fd',
  measurementId: 'G-5FGY6J3Y5X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

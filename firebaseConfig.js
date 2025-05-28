// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDsnaoX6C1xi6EN3PyGSw72aQb3G0cb5Yc",
  authDomain: "genz-dictionary-1ed68.firebaseapp.com",
  projectId: "genz-dictionary-1ed68",
  storageBucket: "genz-dictionary-1ed68.firebasestorage.app",
  messagingSenderId: "660887220940",
  appId: "1:660887220940:web:7c1aa73efd8ecb8faf4869",
  measurementId: "G-1J0P6L4CCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const db = getFirestore(app);
const analytics = getAnalytics(app);
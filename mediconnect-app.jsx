// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg5-Df7zvJAAgRaemb7kKl1flo1CcfY48",
  authDomain: "mediconnect-79877.firebaseapp.com",
  projectId: "mediconnect-79877",
  storageBucket: "mediconnect-79877.firebasestorage.app",
  messagingSenderId: "630994353571",
  appId: "1:630994353571:web:d3db6f78566bd81e2bae16",
  measurementId: "G-F0QZD7YYL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
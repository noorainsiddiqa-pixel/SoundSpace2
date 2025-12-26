// js/firebase.js
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgHw7vxDy42zgEcyMxUxSMxcH9ohDdYHY",
  authDomain: "soundspace-fd9b7.firebaseapp.com",
  projectId: "soundspace-fd9b7",
  storageBucket: "soundspace-fd9b7.firebasestorage.app",
  messagingSenderId: "382068542780",
  appId: "1:382068542780:web:2098db9c091d28c932a239"
};

// Initialize Firebase (compat SDK already loaded from CDN)
firebase.initializeApp(firebaseConfig);

// Make auth and db available globally
window.auth = firebase.auth();
window.db = firebase.firestore();

console.log("🔥 Firebase initialized");

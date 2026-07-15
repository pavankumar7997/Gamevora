// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNamVbjKmP8LpMMYuB1A5Y00sHdW0iphw",
  authDomain: "gamevora-pavankumar.firebaseapp.com",
  projectId: "gamevora-pavankumar",
  storageBucket: "gamevora-pavankumar.firebasestorage.app",
  messagingSenderId: "944490549317",
  appId: "1:944490549317:web:7b614e33bba0f351b0132c",
  measurementId: "G-DC7R31M1M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
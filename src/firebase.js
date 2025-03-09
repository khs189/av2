// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAUuTB9LEAukF8A6_kU84y8EYPihbYmYs",
  authDomain: "authv1-15981.firebaseapp.com",
  projectId: "authv1-15981",
  storageBucket: "authv1-15981.firebasestorage.app",
  messagingSenderId: "1063959149169",
  appId: "1:1063959149169:web:377786d5fc392f6a5d39d0",
  measurementId: "G-RCZMXK3Y34"
};

// Initialize Firebase
const fireapp = initializeApp(firebaseConfig);  
const analytics = getAnalytics(fireapp);

export default fireapp;
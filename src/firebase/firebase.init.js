// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnc0bD37gB6hNcpv-UarRScb-8AVvSEuI",
    authDomain: "project-recommendation-lichtad.firebaseapp.com",
    projectId: "project-recommendation-lichtad",
    storageBucket: "project-recommendation-lichtad.firebasestorage.app",
    messagingSenderId: "1016941405434",
    appId: "1:1016941405434:web:1920c78a8795c036ff1543"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
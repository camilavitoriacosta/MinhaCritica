// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4wYA5lp5gFs7GixjD9Y4mUxyVT3hF6dg",
    authDomain: "minhacritica-a6948.firebaseapp.com",
    projectId: "minhacritica-a6948",
    storageBucket: "minhacritica-a6948.appspot.com",
    messagingSenderId: "671385898059",
    appId: "1:671385898059:web:7171274f389acc7abed1ce"
};

export function inicializarFirebase() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return getFirestore(app);
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCduJd-E_JDzDlix871ZeOnhvaEnJIK7JM",
  authDomain: "foreverecommerce-c134a.firebaseapp.com",
  projectId: "foreverecommerce-c134a",
  storageBucket: "foreverecommerce-c134a.firebasestorage.app",
  messagingSenderId: "207968523989",
  appId: "1:207968523989:web:e7af651ac9c84900dbf45c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
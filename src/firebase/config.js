import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAYc-dkC6bjkXxs-329pO0bsSGvI2cJdE",
  authDomain: "delicious-foods-f88d2.firebaseapp.com",
  projectId: "delicious-foods-f88d2",
  storageBucket: "delicious-foods-f88d2.firebasestorage.app",
  messagingSenderId: "950355528207",
  appId: "1:950355528207:web:0524046d8bbed127e3b17a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

// db
export const db = getFirestore(app);

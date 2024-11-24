// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqkEms2YUPq8e9a3odkimPV7FuGSos2rA",
  authDomain: "fir-storage-3d9b4.firebaseapp.com",
  databaseURL: "https://fir-storage-3d9b4-default-rtdb.firebaseio.com",
  projectId: "fir-storage-3d9b4",
  storageBucket: "fir-storage-3d9b4.firebasestorage.app",
  messagingSenderId: "222999896536",
  appId: "1:222999896536:web:d2eb4874cd93f514fd92ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
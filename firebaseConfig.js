// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChqhro8byeZ4ERiRYYL3zHlgEzNHheVmw",
  authDomain: "zakupyapp-9d46a.firebaseapp.com",
  projectId: "zakupyapp-9d46a",
  storageBucket: "zakupyapp-9d46a.firebasestorage.app",
  messagingSenderId: "407353056215",
  appId: "1:407353056215:web:4a68643e698b36fc704992",
  measurementId: "G-DF4BJPM50W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
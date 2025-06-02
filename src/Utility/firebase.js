import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "e-clone-2025-8cefd.firebaseapp.com",
  projectId: "e-clone-2025-8cefd",
  storageBucket: "e-clone-2025-8cefd.firebasestorage.app",
  messagingSenderId: "715170192962",
  appId: "1:715170192962:web:7c8898d3bd046f9ba897db",
};

console.log(import.meta.env.VITE_FIREBASE_KEY);
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();

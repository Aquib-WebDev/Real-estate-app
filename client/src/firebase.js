// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-c1ac8.firebaseapp.com",
  projectId: "real-estate-c1ac8",
  storageBucket: "real-estate-c1ac8.appspot.com",
  messagingSenderId: "753580867337",
  appId: "1:753580867337:web:525fe52c234b3428149dd8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
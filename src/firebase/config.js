// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwRrPp1zAlTptcutznvZl44UKwCaAGVC4",
  authDomain: "monarch-groom-29063.firebaseapp.com",
  projectId: "monarch-groom-29063",
  storageBucket: "monarch-groom-29063.firebasestorage.app",
  messagingSenderId: "225090396196",
  appId: "1:225090396196:web:ad89d9e5fe3241f47c78b1",
  measurementId: "G-KTZNJ32GL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app)
export { db };
export default app;

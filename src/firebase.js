// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkGoQzaF9eChsyE-9Y-9YgZCl2Eb4jvH4",
  authDomain: "webappfor-e02ef.firebaseapp.com",
  projectId: "webappfor-e02ef",
  storageBucket: "webappfor-e02ef.firebasestorage.app",
  messagingSenderId: "128623606827",
  appId: "1:128623606827:web:e9a40a3880cb3ce0d47e6e",
  measurementId: "G-04JL1E64Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

const db = getFirestore(app);

export { db, analytics };
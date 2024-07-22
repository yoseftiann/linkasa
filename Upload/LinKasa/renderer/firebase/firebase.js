// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL7ufRvmBGa4E-O8D8oRSgeP3wf0kakaI",
  authDomain: "linkasa-fce7b.firebaseapp.com",
  projectId: "linkasa-fce7b",
  storageBucket: "linkasa-fce7b.appspot.com",
  messagingSenderId: "444684370092",
  appId: "1:444684370092:web:7bc7fbd22b2f6cb2be9f09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
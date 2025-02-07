import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrL3tj6M8Ms-Ey75_cTZeJ9eXoeUMo9p0",
    authDomain: "chatapp-f799a.firebaseapp.com",
    projectId: "chatapp-f799a",
    storageBucket: "chatapp-f799a.firebasestorage.app",
    messagingSenderId: "595876654825",
    appId: "1:595876654825:web:006d3de90d0b88af6a4a78",
    measurementId: "G-JVHRFP2LVP"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

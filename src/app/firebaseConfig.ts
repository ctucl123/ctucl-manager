// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAELZZ4OTjayq5mEJnDntBZjbmg60OWxgs",
  authDomain: "ctuclweb.firebaseapp.com",
  projectId: "ctuclweb",
  storageBucket: "ctuclweb.appspot.com",
  messagingSenderId: "394832524129",
  appId: "1:394832524129:web:b84ddb11ee17aaea870b20",
  measurementId: "G-Y5F5TR88Q0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export {db};
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCsSpAFbxIzRLZnCMR3nG9R9wvK-NOZI4M",
    authDomain: "summative-30fd8.firebaseapp.com",
    projectId: "summative-30fd8",
    storageBucket: "summative-30fd8.firebasestorage.app",
    messagingSenderId: "174083605033",
    appId: "1:174083605033:web:38c01e442fc24316f35238"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };
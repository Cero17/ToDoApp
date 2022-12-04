// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcgtiOsVC0PBR585CrYP6okrXgBpikN3A",
  authDomain: "todoapp-1f9e0.firebaseapp.com",
  projectId: "todoapp-1f9e0",
  storageBucket: "todoapp-1f9e0.appspot.com",
  messagingSenderId: "824433933656",
  appId: "1:824433933656:web:2521320cbd4719eb81f92d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize Firestore
export const db = getFirestore(app)
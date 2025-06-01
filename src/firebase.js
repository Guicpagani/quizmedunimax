import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADmDcx2IiPSXyvOZDJN0CfCMeny5L7rH0",
  authDomain: "quizmedunimax.firebaseapp.com",
  projectId: "quizmedunimax",
  storageBucket: "quizmedunimax.appspot.com",
  messagingSenderId: "172661367616",
  appId: "1:172661367616:web:XXXXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
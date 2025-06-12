import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // <-- ADICIONADO

const firebaseConfig = {
  apiKey: "AIzaSyADmDcx2IiPSXyvOZDJN0CfCMeny5L7rH0",
  authDomain: "quizmedunimax.firebaseapp.com",
  projectId: "quizmedunimax",
  storageBucket: "quizmedunimax.appspot.com",
  messagingSenderId: "172661367616",
  appId: "1:172661367616:web:AIzaSyADmDcx2IiPSXyvOZDJN0CfCMeny5L7rH0",
  databaseURL: "https://quizmedunimax-default-rtdb.firebaseio.com/", // <-- ADICIONE A URL DO SEU REALTIME DATABASE AQUI
};

const app = initializeApp(firebaseConfig);

// Suas configurações existentes (intactas)
const auth = getAuth(app);
const db = getFirestore(app);

// Nova configuração para o Realtime Database
const database = getDatabase(app); // <-- ADICIONADO

export { auth, db, database }; // <-- ATUALIZADO
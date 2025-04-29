import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Adicionar a importação do Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCS5vtGYQ6OgRIBjWQ8mIWbCXGSL44qgn0",
  authDomain: "treinamento-canaa-5dbb0.firebaseapp.com",
  projectId: "treinamento-canaa-5dbb0",
  storageBucket: "treinamento-canaa-5dbb0.firebasestorage.app",
  messagingSenderId: "1026717226233",
  appId: "1:1026717226233:web:4f848988b890d07e6c7e28"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // Exportando a instância do Firestore
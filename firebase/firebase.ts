// config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBoT6HixYKqelql1L07yvYjSXKl_E7jGjg",
  authDomain: "teste-9e339.firebaseapp.com",
  databaseURL: "https://teste-9e339-default-rtdb.firebaseio.com",
  projectId: "teste-9e339",
  storageBucket: "teste-9e339.firebasestorage.app",
  messagingSenderId: "845572586647",
  appId: "1:845572586647:web:0b1a7904a9b2dc4d60bdd2",
  measurementId: "G-W6N04K68C1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços do Firebase
const auth = getAuth(app);
const database = getDatabase(app); // Realtime Database
const storage = getStorage(app);

export { auth, database, storage };
export default app;
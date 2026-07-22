import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCd9G9PaZtCYUdUaArgn-DwOFuW2Q_I67g",
  authDomain: "pathly-5f120.firebaseapp.com",
  projectId: "pathly-5f120",
  storageBucket: "pathly-5f120.firebasestorage.app",
  messagingSenderId: "638387319141",
  appId: "1:638387319141:web:248b04c48fcbcaf457318c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();
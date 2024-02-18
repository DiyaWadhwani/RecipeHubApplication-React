import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPhEcbkiySYg38JEVK-nUmzNJ08hdzfz0",
  authDomain: "recipehub-2822d.firebaseapp.com",
  projectId: "recipehub-2822d",
  storageBucket: "recipehub-2822d.appspot.com",
  messagingSenderId: "397137383460",
  appId: "1:397137383460:web:ec732284465758e4e308b1",
  measurementId: "G-RB0QG4M7EZ",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {
  firestore,
  collection,
  getDocs,
  storage,
  doc,
  getDoc,
  ref,
  getDownloadURL,
};

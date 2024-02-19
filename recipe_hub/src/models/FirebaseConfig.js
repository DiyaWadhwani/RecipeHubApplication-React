import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

class FirebaseConfig {
  constructor() {
    this.app = initializeApp({
      apiKey: "AIzaSyCPhEcbkiySYg38JEVK-nUmzNJ08hdzfz0",
      authDomain: "recipehub-2822d.firebaseapp.com",
      projectId: "recipehub-2822d",
      storageBucket: "recipehub-2822d.appspot.com",
      messagingSenderId: "397137383460",
      appId: "1:397137383460:web:ec732284465758e4e308b1",
      measurementId: "G-RB0QG4M7EZ",
    });
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }
}

const firebaseConfigInstance = new FirebaseConfig();
export default firebaseConfigInstance;

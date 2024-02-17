import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

export const fetchRecipes = async () => {
  try {
    const recipesCollection = await getDocs(collection(firestore, "recipes"));
    return recipesCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getRecipeById = async (id) => {
  try {
    const recipeDoc = await firestore.collection("recipes").doc(id).get();
    return recipeDoc.data();
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return null;
  }
};

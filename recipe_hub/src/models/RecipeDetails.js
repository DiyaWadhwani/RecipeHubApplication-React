import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  collection,
} from "firebase/firestore";

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

export const fetchRecipeDetails = async (recipeName) => {
  try {
    console.log("Recipe name fetched from url -- ", recipeName);
    const recipesCollectionRef = collection(firestore, "recipes");
    const recipesCollectionSnap = await getDocs(recipesCollectionRef);
    console.log("Recipes Collection Snapshot:", recipesCollectionSnap.docs);

    const recipeDocRef = doc(firestore, "recipes", recipeName);
    const recipeDocSnap = await getDoc(recipeDocRef);
    console.log("RecipeName document snapshot", recipeDocSnap);

    if (recipeDocSnap.exists()) {
      const recipeDetails = recipeDocSnap.data();
      console.log("Recipe Details fetched:", recipeDetails);
      return recipeDetails;
    } else {
      console.log("Recipe not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};

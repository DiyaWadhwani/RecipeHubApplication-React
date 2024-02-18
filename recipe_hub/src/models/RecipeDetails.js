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

export const fetchRecipeDetails = async (recipeName, setStateCallback) => {
  try {
    const recipeDocRef = doc(firestore, "recipes", recipeName);
    const recipeDocSnap = await getDoc(recipeDocRef);

    if (recipeDocSnap.exists()) {
      const recipeDetails = recipeDocSnap.data();

      // Fetch ingredients
      const ingredientsRef = collection(
        firestore,
        "recipes",
        recipeName,
        "ingredients"
      );
      const ingredientsSnap = await getDocs(ingredientsRef);

      // Map ingredients data
      const ingredientDict = {};
      ingredientsSnap.docs.forEach((doc) => {
        const data = doc.data();
        const ingredientName = doc.id;
        const quantity = data.qty;
        ingredientDict[ingredientName] = quantity;
      });

      setStateCallback({
        recipeDetails: {
          recipeIngredients: ingredientDict,
          recipeInstructions: recipeDetails.instructions,
          recipeAuthor: recipeDetails.author,
          recipeName: recipeName,
        },
      });

      console.log("Recipe Details fetched:", this.state.recipeDetails);
      return this.state.recipeDetails;
    } else {
      console.log("Recipe not found -- js file");
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};

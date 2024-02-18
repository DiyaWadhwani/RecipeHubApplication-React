import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Ingredient from "./Ingredient";

export default class RecipeDetails {
  constructor({
    recipeName = "",
    recipeAuthor = "",
    recipeInstructions = {},
    recipeIngredients = [new Ingredient()],
    recipeImageURL = "",
  } = {}) {
    this.recipeName = recipeName;
    this.recipeAuthor = recipeAuthor;
    this.recipeIngredients = recipeIngredients;
    this.recipeInstructions = recipeInstructions;
    this.recipeImageURL = recipeImageURL;
  }

  static async fetchRecipeDetails(recipeName, setStateCallback) {
    try {
      const recipeDocRef = doc(this.db, "recipes", recipeName);
      const recipeDocSnap = await getDoc(recipeDocRef);

      if (recipeDocSnap.exists()) {
        const recipeDetails = recipeDocSnap.data();

        // Fetch ingredients
        const ingredientsRef = collection(
          this.db,
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
  }

  
}

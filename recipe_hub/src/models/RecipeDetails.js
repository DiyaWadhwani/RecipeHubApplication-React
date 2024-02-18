import Ingredient from "./Ingredient";
// import MyFirebaseDB from "./MyFirebaseDB";
import PropTypes from "prop-types";
import MyFirebaseDB from "./MyFirebaseDB";
// import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export default class RecipeDetails {
  constructor({
    recipeName = "",
    recipeAuthor = "",
    recipeInstructions = {},
    recipeIngredients = [new Ingredient("Default Ingredient", "2")],
    recipeImageURL = "",
  } = {}) {
    this.recipeName = recipeName;
    this.recipeAuthor = recipeAuthor;
    this.recipeIngredients = recipeIngredients;
    this.recipeInstructions = recipeInstructions;
    this.recipeImageURL = recipeImageURL;
  }

  async fetchRecipeDetails(recipeName, setStateCallback) {
    try {
      const myDatabase = new MyFirebaseDB();
      const recipeDetails = await myDatabase.fetchRecipeDetails(
        recipeName,
        setStateCallback
      );
      return recipeDetails;
    } catch (error) {
      console.error("Error fetching recipes in RecipeManager:", error);
      return [];
    }
  }
  async fetchRecipeNames() {
    try {
      const myDatabase = new MyFirebaseDB();
      const recipes = await myDatabase.fetchRecipeNames();
      this.recipeList = recipes;
      return this.recipeList;
    } catch (error) {
      console.error("Error fetching recipes in RecipeManager:", error);
      return [];
    }
  }
}

RecipeDetails.propTypes = {
  recipeDetails: PropTypes.shape({
    recipeName: PropTypes.string,
    recipeAuthor: PropTypes.string,
    recipeInstructions: PropTypes.arrayOf(PropTypes.string),
    recipeIngredients: PropTypes.objectOf(PropTypes.number),
  }),
};

import Ingredient from "./Ingredient";
import PropTypes from "prop-types";
import MyFirebaseDB from "./MyFirebaseDB";

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
    this.myDatabase = new MyFirebaseDB();
  }

  async fetchRecipeDetails(recipeName, setStateCallback) {
    try {
      // const myDatabase = new MyFirebaseDB();
      const fetchedRecipeDetails = await this.myDatabase.fetchRecipeDetails(
        recipeName,
        setStateCallback
      );
      return fetchedRecipeDetails;
    } catch (error) {
      console.error("Error fetching recipes in RecipeDetails:", error);
      return [];
    }
  }
  async fetchRecipeNames() {
    try {
      const myDatabase = new MyFirebaseDB();
      const allRecipes = await myDatabase.fetchRecipeNames();
      return allRecipes;
    } catch (error) {
      console.error("Error fetching recipes in RecipeDetails:", error);
      return [];
    }
  }

  async fetchMyRecipeNames() {
    try {
      const myRecipes =
        this.myDatabase.fetchUserSpecificRecipeNames("createdRecipes");
      return myRecipes;
    } catch (error) {
      console.error("Error fetching recipes in RecipeDetails:", error);
      return [];
    }
  }

  async fetchForkedRecipeNames() {
    try {
      const forkedRecipes =
        this.myDatabase.fetchUserSpecificRecipeNames("forkedRecipes");
      return forkedRecipes;
    } catch (error) {
      console.error("Error fetching recipes in RecipeDetails:", error);
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

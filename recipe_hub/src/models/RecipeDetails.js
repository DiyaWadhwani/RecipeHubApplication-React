import Ingredient from "./Ingredient";
import PropTypes from "prop-types";
import MyFirebaseDB from "./MyFirebaseDB";

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
    this.myDatabase = new MyFirebaseDB(); // Assuming MyFirebaseDB is defined and imported correctly
  }

  async fetchRecipeDetails(recipeName, isForked) {
    try {
      console.log("checking isForked to fetch recipe", isForked);

      if (isForked === "true") {
        console.log("fetching forkedRecipe from firebase");
        const fetchedRecipeDetails =
          await this.myDatabase.fetchForkedRecipe(recipeName);
        return fetchedRecipeDetails;
      } else {
        console.log("fetching og recipe from firebase");
        const fetchedRecipeDetails =
          await this.myDatabase.fetchRecipeDetails(recipeName);
        return fetchedRecipeDetails;
      }
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

  async fetchUserForkedRecipeNames() {
    try {
      const myRecipes = this.myDatabase.fetchUserForkedRecipeNames();
      return myRecipes;
    } catch (error) {
      console.log("Error fetching recipes in RecipeDetails: ", error);
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

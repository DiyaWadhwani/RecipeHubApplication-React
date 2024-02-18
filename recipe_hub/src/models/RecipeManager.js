import MyFirebaseDB from "./MyFirebaseDB";

export default class RecipeManager {
  constructor() {
    this.recipeList = [];
    this.myDatabase = new MyFirebaseDB();
  }

  async fetchAllRecipes() {
    try {
      const recipes = await this.myDatabase.fetchRecipeNames();
      // Assign unique IDs to each recipe
      this.recipeList = recipes;
      return this.recipeList;
    } catch (error) {
      console.error("Error fetching recipes in RecipeManager:", error);
      return [];
    }
  }
}

import RecipeDetails from "./RecipeDetails";

export default class User {
  constructor({
    createdRecipes = {},
    forkedRecipes = [new RecipeDetails()],
  } = {}) {
    this.createdRecipes = createdRecipes;
    this.forkedRecipes = forkedRecipes;
  }
}

import React, { Component } from "react";
import "../styling/RecipeList.css";
import EmptyHeader from "../fragments/EmptyHeader";
import Footer from "../fragments/Footer";
import { Link } from "react-router-dom";
import RecipeManager from "../models/RecipeManager";

export default class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
    this.recipeManager = new RecipeManager();
  }

  async componentDidMount() {
    console.log("Component mounted");
    await this.fetchRecipes();
    console.log("Recipes fetched:", this.state.recipes);
  }

  fetchRecipes = async () => {
    try {
      const recipes = await this.recipeManager.fetchAllRecipes();
      console.log("Recipes from fetchRecipes:", recipes);
      this.setState({ recipes });
    } catch (error) {
      console.error("Error fetching recipes in RecipeList:", error);
    }
  };

  render() {
    const { recipes } = this.state;
    console.log("Recipes in render:", recipes);

    return (
      <>
        <EmptyHeader headerTag="RecipeHub" />
        <div className="body">
          {/* separation between Navbar and page content */}
          <div className="sep-line"></div>

          <form className="find-recipe search-form d-flex">
            <input
              className="search-bar-input search-input form-control me-2"
              type="search"
              placeholder="Find a recipe"
              aria-label="Search"
            />
            <div className="random-padding"></div>
            <Link to="/newUpdate">
              <button
                className="new-button search-button btn btn-success"
                type="submit"
              >
                New
              </button>
            </Link>
          </form>

          <div className="recipe-list">
            {recipes.length > 0 ? (
              <ul className="list-unstyled">
                {recipes.map((recipe) => (
                  <li key={recipe.id}>
                    <Link to={`/recipe?recipe_name=${recipe.id}`}>
                      {recipe.id}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

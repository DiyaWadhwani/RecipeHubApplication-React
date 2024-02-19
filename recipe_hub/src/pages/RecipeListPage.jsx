import React, { Component } from "react";
import "../styling/RecipeList.css";
import EmptyHeader from "../fragments/EmptyHeader";
import Footer from "../fragments/Footer";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import RecipeDetails from "../models/RecipeDetails";

export default class RecipeListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      isForked: false,
    };
    this.recipeDetails = new RecipeDetails();
  }

  handleInputClick = () => {
    alert("This feature has been disabled!");
  };

  async componentDidMount() {
    console.log("Component mounted");
    await this.fetchRecipes();
    // console.log("Recipes fetched:", this.state.recipes);
  }

  async fetchRecipes() {
    try {
      const { pathname } = new URL(window.location.href);

      if (pathname === "/myList") {
        // Fetching my created recipes
        console.log("Maintaining my recipes");
        const myRecipes = await this.recipeDetails.fetchMyRecipeNames();
        console.log("Recipes from fetchMyRecipeNames:", myRecipes);
        this.setState({ recipes: myRecipes, isForked: false });
      } else if (pathname === "/myForkedList") {
        // Fetching my forked recipes
        console.log("Maintaining forked recipes");
        const forkedRecipes =
          await this.recipeDetails.fetchUserForkedRecipeNames();
        console.log("Recipes from fetchForkedRecipeNames:", forkedRecipes);
        this.setState({ recipes: forkedRecipes, isForked: true });
      } else {
        // Fetching the entire list of recipes
        const allRecipes = await this.recipeDetails.fetchRecipeNames();
        console.log("Recipes from fetchRecipes:", allRecipes);
        this.setState({ recipes: allRecipes, isForked: false });
      }
    } catch (error) {
      console.error("Error fetching recipes in RecipeList:", error);
    }
  }

  async containMyRecipes(recipes) {
    this.recipeDetails.fetchMyCreatedRecipes(recipes);
  }

  render() {
    const { recipes, isForked } = this.state;
    console.log("Recipes in render:", recipes);

    return (
      <>
        <EmptyHeader headerTag="RecipeHub" />
        <div className="body">
          {/* separation between Navbar and page content */}
          <div className="sep-line"></div>

          <Link to="/">
            <IoArrowBackOutline className="back-arrow" />
          </Link>

          <form className="find-recipe search-form d-flex">
            <input
              className="search-bar-input search-input form-control me-2"
              type="search"
              placeholder="Find a recipe"
              aria-label="Search"
              onClick={this.handleInputClick}
              disabled
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
            {recipes && recipes.length > 0 ? (
              <ul className="list-unstyled">
                {recipes.map((recipe, index) => (
                  <li key={index}>
                    <Link
                      to={`/recipe?recipe_name=${recipe}&isForked=${isForked}`}
                    >
                      {recipe}
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

import React, { Component } from "react";
import { fetchRecipeDetails } from "../models/RecipeDetails";
import recipehubLogo from "../assets/recipehub-logo.png";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeDetails: {
        recipeName: null,
        recipeAuthor: null,
        recipeInstructions: [],
        recipeIngredients: {},
      },
    };
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const recipeName = urlSearchParams.get("recipe_name");
    if (recipeName) {
      this.fetchRecipeDetailsFromBackend(recipeName);
    }
  }

  fetchRecipeDetailsFromBackend = async (recipeName) => {
    await fetchRecipeDetails(recipeName, (updatedState) => {
      this.setState(updatedState);
    });
  };

  render() {
    const { recipeDetails } = this.state;
    console.log("Recipe Details", recipeDetails);
    console.log("recipename -- ", recipeDetails.recipeName);

    return (
      <>
        <div className="body">
          <header>
            <div className="header container-fluid d-flex justify-content-between align-items-center">
              <div className="logo-and-text">
                <a className="navbar-brand" href="#">
                  <img src={recipehubLogo} alt="Logo" width="70" height="70" />
                </a>
                <h1 className="app-name">{recipeDetails.recipeName}</h1>
              </div>

              <div className="d-flex justify-content-between">
                <div className="ms-auto">
                  <Link to="/">
                    <FaHome className="home-icon" />
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* separation between Navbar and page content */}
          <div className="sep-line"></div>

          {recipeDetails && recipeDetails.recipeName ? (
            <>
              <div className="author-tag">
                <p className="author-text">{recipeDetails.author}</p>
              </div>
              <div className="content-container">
                <div className="ingredients-section">
                  <h3>Ingredients:</h3>
                  <ul>
                    {Object.entries(recipeDetails.recipeIngredients).map(
                      ([ingredient, qty]) => (
                        <li key={ingredient}>
                          {ingredient}: {qty}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="instructions-section">
                <h3>Prep:</h3>
                <ol>
                  {recipeDetails.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <p>Loading recipe details...</p>
          )}
        </div>
      </>
    );
  }
}

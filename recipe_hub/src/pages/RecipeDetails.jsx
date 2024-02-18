import React, { Component } from "react";
import { fetchRecipeDetails } from "../models/RecipeDetails";
import EmptyHeader from "../fragments/EmptyHeader";
import PropTypes from "prop-types";
import RecipeDetailsDisplay from "../displayContent/RecipeDetailsDisplay";

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

    return (
      <>
        <div className="body">
          <EmptyHeader headerTag={recipeDetails.recipeName} />
          {/* separation between Navbar and page content */}
          <div className="sep-line"></div>
          <RecipeDetailsDisplay recipeDetails={recipeDetails} />
        </div>
      </>
    );
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

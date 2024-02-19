import React, { Component } from "react";
import RecipeImageDisplay from "../displayContent/RecipeImageDisplay";
import PropTypes from "prop-types";
import Ingredient from "../models/Ingredient";

export default class RecipeDetailsDisplay extends Component {
  render() {
    const { recipeDetails } = this.props;
    return (
      <>
        {recipeDetails && recipeDetails.recipeName ? (
          <>
            <div className="recipe-image-ing-display">
              <RecipeImageDisplay recipeName={recipeDetails.recipeName} />
              <div className="content-container">
                <div className="ingredients-section">
                  <h3>Ingredients:</h3>
                  <ul>
                    {recipeDetails.recipeIngredients.map((ingredient) => (
                      <li key={ingredient.ingredientName}>
                        {ingredient.ingredientName}: {ingredient.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="instructions-section">
              <h3>Prep:</h3>
              <ol>
                {recipeDetails.recipeInstructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </>
        ) : (
          <p>Loading recipe details...</p>
        )}
      </>
    );
  }
}

RecipeDetailsDisplay.propTypes = {
  recipeDetails: PropTypes.shape({
    recipeName: PropTypes.string,
    recipeAuthor: PropTypes.string,
    recipeInstructions: PropTypes.arrayOf(PropTypes.string),
    recipeIngredients: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)),
  }),
};

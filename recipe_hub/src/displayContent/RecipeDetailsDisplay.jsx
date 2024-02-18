import React, { Component } from "react";
import RecipeImageDisplay from "../displayContent/RecipeImageDisplay";
import PropTypes from "prop-types";

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
    recipeIngredients: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
  }),
};

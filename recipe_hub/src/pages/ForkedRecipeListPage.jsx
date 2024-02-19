import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ForkedRecipeListPage extends Component {
  render() {
    const { recipeDetails } = this.props;
    console.log("forked!!", recipeDetails);
    return (
      <>
        <div></div>
      </>
    );
  }
}

ForkedRecipeListPage.propTypes = {
  recipeDetails: PropTypes.shape({
    recipeName: PropTypes.string,
    recipeAuthor: PropTypes.string,
    recipeInstructions: PropTypes.arrayOf(PropTypes.string),
    recipeIngredients: PropTypes.objectOf(PropTypes.number),
  }),
};

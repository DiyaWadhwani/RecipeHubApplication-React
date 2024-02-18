import React, { Component } from "react";
import { fetchRecipeDetails } from "../models/RecipeDetails";
import EmptyHeader from "../fragments/EmptyHeader";
import PropTypes from "prop-types";
import RecipeDetailsDisplay from "../displayContent/RecipeDetailsDisplay";
import RecipeImageDisplay from "../displayContent/RecipeImageDisplay";

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
      recipeImageURL: null,
    };
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const recipeName = urlSearchParams.get("recipe_name");
    if (recipeName) {
      this.fetchRecipeDetailsFromBackend(recipeName);
      // this.fetchRecipeImage(recipeName);
    }
  }

  fetchRecipeDetailsFromBackend = async (recipeName) => {
    await fetchRecipeDetails(recipeName, (updatedState) => {
      this.setState(updatedState);
    });
  };

  // fetchRecipeImage = async (recipeName) => {
  //   // Fetch image URL from the same file
  //   const imageUrl = await fetchRecipeImage(recipeName);
  //   console.log("checking if url is fetched before setting state --", imageUrl);
  //   this.setState({ recipeImageUrl: imageUrl });
  // };

  render() {
    const { recipeDetails, recipeImageUrl } = this.state;
    console.log("imageURL -- ", recipeImageUrl);
    return (
      <>
        <div className="body">
          <EmptyHeader headerTag={recipeDetails.recipeName} />
          {/* separation between Navbar and page content */}
          <div className="sep-line"></div>
          <RecipeImageDisplay recipeName={recipeDetails.recipeName} />
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

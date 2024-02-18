import React, { Component } from "react";
import { fetchRecipeDetails } from "../models/RecipeDetails";
import EmptyHeader from "../fragments/EmptyHeader";
// import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeDetails: {
        recipeName: null,
        recipeAuthor: null,
        recipeInstructions: null,
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
        <div>
          <EmptyHeader />

          {recipeDetails && recipeDetails.recipeName ? (
            <>
              <h2>{recipeDetails.recipeName}</h2>
              <p>Author: {recipeDetails.author}</p>
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
            </>
          ) : (
            <p>Loading recipe details...</p>
          )}
          <h3>Prep:</h3>
          <p>{recipeDetails.instructions}</p>
        </div>
      </>
    );
  }
}

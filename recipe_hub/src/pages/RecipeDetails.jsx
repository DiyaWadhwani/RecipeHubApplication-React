import React, { Component } from "react";
import { fetchRecipeDetails } from "../models/RecipeDetails";
// import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeDetails: null,
      recipeName: null, // Set a default or fetch it from props
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
    console.log("Trying to fetch Recipe details");
    const recipeDetails = await fetchRecipeDetails(recipeName);
    console.log("RecipeDetails recieved from fetch -- ", recipeDetails);
    this.setState({ recipeDetails });
  };

  render() {
    const { recipeDetails } = this.state;
    console.log("Recipe Details", recipeDetails);

    return (
      <>
        <div>
          {recipeDetails ? (
            <>
              {/* <h2>{recipeDetails.name}</h2>
              <p>{recipeDetails.description}</p> */}
              recipes fetched from firestore
            </>
          ) : (
            <p>Loading recipe details...</p>
          )}
        </div>
      </>
    );
  }
}

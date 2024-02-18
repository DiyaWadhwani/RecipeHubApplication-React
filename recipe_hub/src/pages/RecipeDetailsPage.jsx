import React, { Component } from "react";
import { BiFork } from "react-icons/bi";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import EmptyHeader from "../fragments/EmptyHeader";
import Footer from "../fragments/Footer";
import PropTypes from "prop-types";
import RecipeDetailsDisplay from "../displayContent/RecipeDetailsDisplay";
import RecipeDetails from "../models/RecipeDetails";
import Ingredient from "../models/Ingredient";
import MyFirebaseDB from "../models/MyFirebaseDB";

export default class RecipeDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeDetails: {
        recipeName: null,
        recipeAuthor: null,
        recipeInstructions: [],
        recipeIngredients: [new Ingredient("Default Ingredient", "2")],
      },
    };

    this.recipeDetails = new RecipeDetails();
    this.myDatabase = new MyFirebaseDB();
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const recipeName = urlSearchParams.get("recipe_name");
    if (recipeName) {
      this.fetchRecipeDetailsFromBackend(recipeName, this.myDatabase);
    }
  }

  fetchRecipeDetailsFromBackend = async (recipeName) => {
    await this.recipeDetails.fetchRecipeDetails(
      recipeName,
      this.setState.bind(this)
    );
  };

  render() {
    const { recipeDetails, recipeImageUrl } = this.state;
    console.log("imageURL -- ", recipeImageUrl);
    return (
      <>
        <div className="body">
          <EmptyHeader headerTag={recipeDetails.recipeName} />
          {/* separation between Navbar and page content */}
          <div className="sep-line"></div>
          <div className="author-back-feature">
            <Link to="/recipeList">
              <IoArrowBackOutline className="back-arrow" />
            </Link>
            <div className="author-tag">
              <p className="author-text">{recipeDetails.recipeAuthor}</p>
            </div>
          </div>
          <div className="fork-tag">
            <BiFork className="fork-icon" />
            <p className="fork-text">Fork</p>
          </div>
          <RecipeDetailsDisplay recipeDetails={recipeDetails} />
          <Footer />
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
    recipeIngredients: PropTypes.objectOf(
      PropTypes.shape({
        ingredientName: PropTypes.string,
        quantity: PropTypes.string,
      })
    ),
  }),
};

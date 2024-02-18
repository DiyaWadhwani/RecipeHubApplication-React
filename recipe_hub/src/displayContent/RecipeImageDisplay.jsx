import React, { Component } from "react";
import PropTypes from "prop-types";
import RecipeManager from "../models/RecipeManager";
import MyFirebaseDB from "../models/FirebaseConfig";

export default class RecipeImageDisplay extends Component {
  constructor(props) {
    super(props);

    this.recipeManager = new RecipeManager();
    this.state = {};
  }

  componentDidMount() {
    this.downloadImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipeName !== this.props.recipeName) {
      this.downloadImage();
    }
  }

  downloadImage = async (recipeName) => {
    try {
      return await MyFirebaseDB.downloadImage(recipeName);
    } catch (error) {
      console.error("Error downloading image:", error);
      throw error;
    }
  };
  render() {
    const { imageUrl } = this.state;

    return (
      <div>
        {imageUrl ? (
          <img
            className="recipe-image-display"
            src={imageUrl}
            alt="Downloaded"
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    );
  }
}

RecipeImageDisplay.propTypes = {
  recipeName: PropTypes.string,
};

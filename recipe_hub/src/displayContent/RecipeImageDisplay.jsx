import React, { Component } from "react";
import PropTypes from "prop-types";
import MyFirebaseDB from "../models/MyFirebaseDB";

export default class RecipeImageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: null };
  }

  componentDidMount() {
    this.downloadImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipeName !== this.props.recipeName) {
      this.downloadImage();
    }
  }

  async downloadImage() {
    const { recipeName } = this.props;
    const myDatabase = new MyFirebaseDB();
    try {
      const imageUrl = await myDatabase.downloadImage(recipeName);
      this.setState({ imageUrl });
    } catch (error) {
      console.error("Error downloading image:", error);
      throw error;
    }
  }

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

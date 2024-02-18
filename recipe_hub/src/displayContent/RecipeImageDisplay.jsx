import React, { Component } from "react";
import { storage, ref, getDownloadURL } from "../models/FirebaseConfig";
import PropTypes from "prop-types";

export default class RecipeImageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
    };
  }

  componentDidMount() {
    this.downloadImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.recipeName !== this.props.recipeName) {
      this.downloadImage();
    }
  }

  downloadImage = async () => {
    try {
      const { recipeName } = this.props;
      console.log("trying to download image", recipeName);
      const imageRef = ref(storage, `/images/${recipeName}.png`);
      const url = await getDownloadURL(imageRef);
      this.setState({ imageUrl: url });
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  render() {
    const { imageUrl } = this.state;

    return (
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt="Downloaded" />
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

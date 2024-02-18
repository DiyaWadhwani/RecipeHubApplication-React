import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import firebaseConfig from "../models/FirebaseConfig";
import placeholderImage from "../assets/placeholder-image.png";

export default class LandingRecipesDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        { name: "Cheeseburger", imageUrl: null },
        { name: "Margherita Pizza", imageUrl: null },
        { name: "Chicken Momos", imageUrl: null },
        { name: "Cannoli", imageUrl: null },
      ],
    };
  }

  componentDidMount() {
    this.fetchRandomImages();
  }

  fetchRandomImages = async () => {
    const updatedRecipes = [];

    for (const recipe of this.state.recipes) {
      try {
        const imageRef = ref(
          firebaseConfig.storage,
          `/images/${recipe.name}.png`
        );
        const imageUrl = await getDownloadURL(imageRef);
        updatedRecipes.push({ ...recipe, imageUrl });
      } catch (error) {
        console.error(`Error fetching image for ${recipe.name}:`, error);
        updatedRecipes.push({ ...recipe, imageUrl: placeholderImage });
      }
    }

    this.setState({ recipes: updatedRecipes });
  };

  render() {
    return (
      <>
        <div className="flex-box-recipes">
          <div>
            <h2>Popular Recipes</h2>
          </div>
          <div className="popular-recipes-grid-container">
            {this.state.recipes.map((recipe, index) => (
              <div className="popular-recipes-grid-item" key={index}>
                <Link to={`/recipe?recipe_name=${recipe.name}`}>
                  <img
                    className="food-imgs"
                    src={recipe.imageUrl || placeholderImage}
                    alt={`Image ${index + 1}`}
                    width="400"
                    height="250"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

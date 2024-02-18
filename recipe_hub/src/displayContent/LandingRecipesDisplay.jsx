import React, { Component } from "react";
import burgerImage from "../assets/burger.png";
import pizzaImage from "../assets/pizza.png";
import momoImage from "../assets/momo.png";
import dessertImage from "../assets/dessert.png";

export default class LandingRecipesDisplay extends Component {
  render() {
    return (
      <>
        <div className="flex-box-recipes">
          <div>
            <h2>Popular Recipes</h2>
          </div>
          <div className="popular-recipes-grid-container">
            <div className="popular-recipes-grid-item">
              <img
                className="food-imgs"
                src={burgerImage}
                alt="Image 1"
                width="400"
                height="250"
              />
            </div>
            <div className="popular-recipes-grid-item">
              <img
                className="food-imgs"
                src={pizzaImage}
                alt="Image 1"
                width="400"
                height="250"
              />
            </div>

            <div className="popular-recipes-grid-item">
              <img
                className="food-imgs"
                src={momoImage}
                alt="Image 1"
                width="400"
                height="250"
              />
            </div>

            <div className="popular-recipes-grid-item">
              <img
                className="food-imgs"
                src={dessertImage}
                alt="Image 1"
                width="400"
                height="250"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

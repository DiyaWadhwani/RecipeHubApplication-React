import React, { Component } from "react";
import { Link } from "react-router-dom";
// import burgerImage from "../assets/burger.png";
// import pizzaImage from "../assets/pizza.png";
// import momoImage from "../assets/momo.png";
// import dessertImage from "../assets/dessert.png";

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
              <Link to="/recipe?recipe_name=Cheeseburger">
                <img
                  className="food-imgs"
                  // src={burgerImage}
                  alt="Image 1"
                  width="400"
                  height="250"
                />
              </Link>
            </div>
            <div className="popular-recipes-grid-item">
              <Link to="/recipe?recipe_name=Margherita Pizza">
                <img
                  className="food-imgs"
                  // src={pizzaImage}
                  alt="Image 1"
                  width="400"
                  height="250"
                />
              </Link>
            </div>

            <div className="popular-recipes-grid-item">
              <Link to="/recipe?recipe_name=Chicken Momos">
                <img
                  className="food-imgs"
                  // src={momoImage}
                  alt="Image 1"
                  width="400"
                  height="250"
                />
              </Link>
            </div>

            <div className="popular-recipes-grid-item">
              <Link to="/recipe?recipe_name=Cannoli">
                <img
                  className="food-imgs"
                  // src={dessertImage}
                  alt="Image 1"
                  width="400"
                  height="250"
                />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

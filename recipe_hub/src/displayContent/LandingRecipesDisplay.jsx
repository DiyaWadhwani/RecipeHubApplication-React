import React, { Component } from "react";

export default class LandingRecipesDisplay extends Component {
  render() {
    return (
      <>
        <div className="flex-box-recipes">
          <div>
            <h2>Pinned Recipes</h2>
          </div>
          <div className="grid-container">
            <div className="grid-item">Item 1</div>
            <div className="grid-item">Item 2</div>
            <div className="grid-item">Item 3</div>
            <div className="grid-item">Item 4</div>
          </div>
        </div>
      </>
    );
  }
}

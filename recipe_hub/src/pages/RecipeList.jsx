import React, { Component } from "react";
import "../styling/RecipeList.css";
import EmptyHeader from "../fragments/EmptyHeader";

export default class RecipeList extends Component {
  render() {
    return (
      <>
        <EmptyHeader />
        <div className="body">
          {/* separation between Navbar and page content */}
          <div className="sep-line"></div>

          <div className="recipe-page-grid-container">
            <div className="recipe-page-grid-item">Item 1</div>
            <div className="recipe-page-grid-item">Item 2</div>
            <div className="recipe-page-grid-item">Item 3</div>
            <div className="recipe-page-grid-item">Item 4</div>
            <div className="recipe-page-grid-item">Item 5</div>
            <div className="recipe-page-grid-item">Item 6</div>
          </div>
          <form className="find-recipe search-form d-flex">
            <input
              className="search-bar-input search-input form-control me-2"
              type="search"
              placeholder="Find a recipe"
              aria-label="Search"
            />
            <div className="random-padding"></div>
            <button
              className="new-button search-button btn btn-success"
              type="submit"
            >
              New
            </button>
          </form>
        </div>
      </>
    );
  }
}

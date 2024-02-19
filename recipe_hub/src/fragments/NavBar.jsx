import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styling/NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <>
        <nav className="navbar">
          <div className="d-flex justify-content-between">
            <ul className="list-unstyled d-flex">
              <li className="me-3">
                <Link to="/underConstruction">Overview</Link>
              </li>
              <li className="me-3">
                <Link to="/recipeList">Recipes</Link>
              </li>
              <li className="me-3">
                <Link to="/underConstruction">Contributions</Link>
              </li>
              <li className="me-3">
                <Link to="/underConstruction">Favorites</Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

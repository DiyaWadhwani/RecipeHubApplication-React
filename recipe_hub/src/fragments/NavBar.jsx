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
                <Link to="/recipeList">All Recipes</Link>
              </li>
              <li className="me-3">
                <Link to="/myList">My Recipes</Link>
              </li>
              <li className="me-3">
                <Link to="/myForkedList">Forked Recipes</Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

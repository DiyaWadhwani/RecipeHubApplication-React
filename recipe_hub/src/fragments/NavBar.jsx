import React, { Component } from "react";
import "../styling/NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <>
        <nav className="navbar">
          <div className="d-flex justify-content-between">
            <ul className="list-unstyled d-flex">
              <li className="me-3">Overview</li>
              <li className="me-3">Recipes</li>
              <li className="me-3">Collaborations</li>
              <li className="me-3">Favorites</li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

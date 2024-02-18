import React, { Component } from "react";
import "../styling/Header.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="bg-body-tertiary text-center p-3">
        <div className="container">
          <span className="text-muted">
            &copy; 2024 RecipeHub. All rights reserved 🪔{" "}
          </span>
        </div>
      </footer>
    );
  }
}

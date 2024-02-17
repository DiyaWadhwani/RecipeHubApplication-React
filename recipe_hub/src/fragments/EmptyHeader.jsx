import React, { Component } from "react";
import recipehubLogo from "../assets/recipehub-logo.png";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../styling/Header.css";

export default class EmptyHeader extends Component {
  render() {
    return (
      <>
        <header>
          <div className="header container-fluid d-flex justify-content-between align-items-center">
            <div className="logo-and-text">
              <a className="navbar-brand" href="#">
                <img src={recipehubLogo} alt="Logo" width="70" height="70" />
              </a>
              <h1 className="app-name">RecipeHub</h1>
            </div>

            <div className="d-flex justify-content-between">
              <div className="ms-auto">
                <Link to="/">
                  <FaHome className="home-icon" />
                </Link>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

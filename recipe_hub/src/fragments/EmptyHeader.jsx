import React, { Component } from "react";
import recipehubLogo from "../assets/recipehub-logo.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../styling/Header.css";

export default class EmptyHeader extends Component {
  static propTypes = {
    headerTag: PropTypes.string.isRequired,
  };

  render() {
    const { headerTag } = this.props;

    return (
      <>
        <header>
          <div className="header container-fluid d-flex justify-content-between align-items-center">
            <div className="logo-and-text">
              <a className="navbar-brand" href="#">
                <img src={recipehubLogo} alt="Logo" width="70" height="70" />
              </a>
              <h1 className="app-name">{headerTag}</h1>
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

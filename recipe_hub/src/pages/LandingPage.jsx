import React, { Component } from "react";
import "../styling/LandingPage.css";
import Header from "../fragments/Header";
import NavBar from "../fragments/NavBar";
import UserModuleDisplay from "../displayContent/UserModuleDisplay";

export default class LandingPage extends Component {
  render() {
    console.log("Landing page rendering!!");
    return (
      <>
        <Header />
        <NavBar />

        <div className="body">
          {/* separation between Navbar and page content */}
          <div className="sep-line"></div>

          <div className="d-flex flex-col mb-2">
            <UserModuleDisplay />

            <div className="flex-box-recipes">
              <div className="box1">
                <h2>Pinned Recipes</h2>
              </div>

              {/* <div className="recipe-grid"> */}
              {/* <div className="grid-container"> */}
              {/* <div className="box top-left">1</div>
                  <div className="box top-right">2</div>
                  <div className="box bottom-left">3</div>
                  <div className="box bottom-right">4</div> */}

              <div className="grid-container">
                <div className="grid-item">Item 1</div>
                <div className="grid-item">Item 2</div>
                <div className="grid-item">Item 3</div>
                <div className="grid-item">Item 4</div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </>
    );
  }
}

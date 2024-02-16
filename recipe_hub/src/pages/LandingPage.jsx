import React, { Component } from "react";
import "../styling/LandingPage.css";
import Header from "../fragments/Header";
import NavBar from "../fragments/NavBar";

export default class LandingPage extends Component {
  render() {
    console.log("Landing page rendering!!");
    return (
      <>
        <Header />
        <NavBar />
        <div className="landingContent">
          <div className="d-flex flex-col mb-3">
            <div className="p-2">Flex item 1</div>
            <div className="p-2">Flex item 2</div>
            <div className="p-2">Flex item 3</div>
          </div>
        </div>
      </>
    );
  }
}

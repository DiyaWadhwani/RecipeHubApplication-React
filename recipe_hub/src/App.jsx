import React, { Component } from "react";
import LandingPage from "./pages/LandingPage";

export default class App extends Component {
  render() {
    console.log("Rendering App page", this.props);
    return (
      <>
        <div>
          <LandingPage />
        </div>
      </>
    );
  }
}

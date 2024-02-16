import React, { Component } from "react";
import NavBar from "./fragments/NavBar";
import Header from "./fragments/Header";

export default class App extends Component {

  render() {
    console.log("Rendering App page", this.props);
  return (
    <>
      <div>
        <Header />
        <NavBar />
      </div>
    </>
  );
}
}

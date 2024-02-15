import React, { Component } from "react";
import './App.css'

export default class App extends Component {

  render() {
    console.log("Rendering App page", this.props);
  return (
    <>
      <div>
        <h1>Hello world</h1>
      </div>
    </>
  );
}
}

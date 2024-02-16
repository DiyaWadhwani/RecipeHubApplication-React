import React, { Component } from 'react';
import NavBar from "../fragments/NavBar";
import Header from "../fragments/Header";

export default class LandingPage extends Component {
  render() {
    console.log("Landing page rendering!!")
    return (
        <>
        <Header />
        <NavBar />
        </>
    )
  }
}

import React, { Component } from "react";
import EmptyHeader from "../fragments/EmptyHeader";

export default class UnderConstructionPage extends Component {
  render() {
    return (
      <>
        <EmptyHeader />
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>This page is under construction</h1>
          <p>Please check back in a few days.</p>
        </div>
      </>
    );
  }
}

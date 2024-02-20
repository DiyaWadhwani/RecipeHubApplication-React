import React, { Component } from "react";
// import LandingPage from "./pages/LandingPage";

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initialize state with an empty username
    this.state = {
      username: "",
    };
  }

  handleUsernameEntry = () => {
    const enteredUsername = prompt("Please enter your username:");
    if (enteredUsername) {
      this.setState({ username: enteredUsername });
      // Save to local storage
      localStorage.setItem("username", enteredUsername);
    }
  };
  componentDidMount() {
    // Check if username exists in local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      this.setState({ username: storedUsername });
    } else {
      // If not, prompt for username entry
      this.handleUsernameEntry();
    }
  }

  render() {
    const { username } = this.state;

    console.log("Rendering with username:", username);
    return (
      <>
        <div>
          <h1>Welcome, {username}!</h1>
          {/* <LandingPage /> */}
        </div>
      </>
    );
  }
}

import React, { Component } from "react";
import userDisplayPicture from "../assets/display-picture.png";
import "../styling/LandingPage.css";

export default class UserModuleDisplay extends Component {
  render() {
    return (
      <>
        {/* user profile picture div */}
        <div className="flex-box-user">
          <div className="flex-box-user user-display">
            <img
              src={userDisplayPicture}
              alt="User Profile"
              className="user-image"
            />
          </div>

          {/* username div */}
          <div className="d-flex flex-box-user username-tag">DiyaWadhwani</div>

          {/* edit profile button */}
          <div className="flex-box-user">
            <div className="d-grid gap-2">
              <button className="btn btn-primary edit-profile" type="button">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

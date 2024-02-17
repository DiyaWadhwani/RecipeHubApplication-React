import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export default class Recipe extends Component {
  state = {
    recipes: [],
  };

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = async () => {
    // Initialize Firebase
    const firebaseConfig = {
      // Your Firebase config here
    };
    firebase.initializeApp(firebaseConfig);

    // Get a Firestore reference
    const db = firebase.firestore();

    // Fetch recipes from Firestore
    const recipesSnapshot = await db.collection("recipes").get();
    const recipes = recipesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    this.setState({ recipes });
  };

  render() {
    const { recipes } = this.state;

    return (
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.id}</h2>
            {/* Add Ingredients component here */}
          </div>
        ))}
      </div>
    );
  }
}

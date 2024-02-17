import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export default class Ingredients extends Component {
  state = {
    ingredients: [],
  };

  componentDidMount() {
    this.fetchIngredients();
  }

  fetchIngredients = async () => {
    // Initialize Firebase
    const firebaseConfig = {
      // Your Firebase config here
    };
    firebase.initializeApp(firebaseConfig);

    // Get a Firestore reference
    const db = firebase.firestore();

    // Fetch ingredients from Firestore
    const ingredientsSnapshot = await db
      .collection("recipes")
      .doc(/* RecipeId */)
      .collection("ingredients")
      .get();
    const ingredients = ingredientsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    this.setState({ ingredients });
  };

  render() {
    const { ingredients } = this.state;

    return (
      <div>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.id}: {ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

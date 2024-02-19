import React, { Component } from "react";
import EmptyHeader from "../fragments/EmptyHeader";
import RecipeDetails from "../models/RecipeDetails";
import Ingredient from "../models/Ingredient";
import "../styling/CreateRecipePage.css";
import MyFirebaseDB from "../models/MyFirebaseDB";

export default class CreateRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: "",
      ingredients: [{ ingredientName: "", quantity: "" }],
      instructions: [""],
      authorName: "",
      imageFile: null,
    };
    this.myDatabase = new MyFirebaseDB();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const updatedIngredients = [...this.state.ingredients];
    updatedIngredients[index][name] = value;
    this.setState({ ingredients: updatedIngredients });
  };

  handleInstructionChange = (e, index) => {
    const { value } = e.target;
    const updatedInstructions = [...this.state.instructions];
    updatedInstructions[index] = value;
    this.setState({ instructions: updatedInstructions });
  };

  handleAddIngredient = () => {
    this.setState((prevState) => ({
      ingredients: [
        ...prevState.ingredients,
        { ingredientName: "", quantity: "" },
      ],
    }));
  };

  handleAddInstruction = () => {
    this.setState((prevState) => ({
      instructions: [...prevState.instructions, ""],
    }));
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    this.setState({ imageFile: file });
  };

  onCreate = (event) => {
    event.preventDefault();

    // Create instances of RecipeDetails and Ingredient based on user input
    const recipeDetails = new RecipeDetails({
      recipeName: this.state.recipeName,
      recipeAuthor: this.state.authorName,
      recipeInstructions: this.state.instructions,
      recipeImageURL: this.state.imageFile,
      recipeIngredients: this.state.ingredients.map(
        (ingredient) =>
          new Ingredient(ingredient.ingredientName, ingredient.quantity)
      ),
    });

    // Log the instances to the console
    console.log("RecipeDetails instance:", recipeDetails);

    //Send data to firebase
    const response = this.myDatabase.addRecipeToFirestore(recipeDetails);
    console.log("Response from adding to the db -- ", response);

    // Clear form inputs
    this.setState({
      recipeName: "",
      ingredients: [{ ingredientName: "", quantity: "" }],
      instructions: [""],
      authorName: "",
      imageFile: null,
    });
  };

  render() {
    const { recipeName, ingredients, instructions, authorName } = this.state;

    return (
      <>
        <EmptyHeader headerTag="RecipeHub" />
        <div className="form-styling">
          <form onSubmit={this.onCreate} className="container mt-4">
            <div className="mb-3">
              <label className="form-label">Recipe Name:</label>
              <input
                type="text"
                className="form-control"
                name="recipeName"
                value={recipeName}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ingredients:</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="ingredientName"
                    placeholder="Ingredient Name"
                    value={ingredient.name}
                    onChange={(e) => this.handleIngredientChange(e, index)}
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="quantity"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) => this.handleIngredientChange(e, index)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleAddIngredient}
              >
                Add Ingredient
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label">Instructions:</label>
              {instructions.map((instruction, index) => (
                <div key={index} className="mb-2">
                  <textarea
                    className="form-control"
                    name="instruction"
                    placeholder={`Step ${index + 1}`}
                    value={instruction}
                    onChange={(e) => this.handleInstructionChange(e, index)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleAddInstruction}
              >
                Add Instruction
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label">Author Name:</label>
              <input
                type="text"
                className="form-control"
                name="authorName"
                value={authorName}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={this.handleImageChange}
              />
            </div>

            <button type="submit" className="btn btn-primary custom-btn">
              Save
            </button>
          </form>
        </div>
      </>
    );
  }
}

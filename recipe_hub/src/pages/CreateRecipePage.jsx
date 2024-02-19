import React, { Component } from "react";
import EmptyHeader from "../fragments/EmptyHeader";
import RecipeDetails from "../models/RecipeDetails";
import Ingredient from "../models/Ingredient";
import "../styling/CreateRecipePage.css";
import MyFirebaseDB from "../models/MyFirebaseDB";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default class CreateRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: "",
      ingredients: [{ ingredientName: "", quantity: "" }],
      instructions: [""],
      authorName: "",
      imageFile: null,
      isForked: false,
    };
    this.myDatabase = new MyFirebaseDB();
  }

  componentDidMount() {
    // Check if query parameters exist
    const urlParams = new URLSearchParams(window.location.search);
    const recipeDetailsParam = urlParams.get("recipe_details");

    if (recipeDetailsParam) {
      try {
        // Check if recipeDetailsParam is already an object
        const recipeDetails =
          typeof recipeDetailsParam === "string"
            ? JSON.parse(decodeURIComponent(recipeDetailsParam))
            : recipeDetailsParam;

        console.log(
          "recipeDetails -- ",
          recipeDetails.recipeAuthor,
          recipeDetails.recipeIngredients
        );
        this.setState({
          recipeName: recipeDetails.recipeName,
          ingredients: recipeDetails.recipeIngredients,
          instructions: recipeDetails.recipeInstructions,
          authorName: recipeDetails.recipeAuthor,
          imageFile: recipeDetails.recipeName + ".png",
          isForked: true,
        });
      } catch (error) {
        console.error("Error parsing recipeDetailsParam:", error);
      }
    }
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

    const { isForked } = this.state;

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
    if (isForked) {
      this.myDatabase.addForkedRecipeNameToUser(recipeDetails.recipeName);
    } else {
      const response = this.myDatabase.addRecipeToFirestore(recipeDetails);
      console.log("Response from adding to the db -- ", response);
    }

    // Clear form inputs
    this.setState({
      recipeName: "",
      ingredients: [{ ingredientName: "", quantity: "" }],
      instructions: [""],
      authorName: "",
      imageFile: null,
    });

    alert("Thank you for sharing your recipe to RecipeHub!");
  };

  render() {
    const { recipeName, ingredients, instructions, authorName } = this.state;

    return (
      <>
        <EmptyHeader headerTag="RecipeHub" />
        <Link to="/recipeList">
          <IoArrowBackOutline className="back-arrow" />
        </Link>
        <div className="form-styling">
          <form onSubmit={this.onCreate} className="container mt-4">
            <div className="mb-3">
              <label className="form-label">Recipe Name(required) :</label>
              <input
                type="text"
                className="form-control"
                name="recipeName"
                value={recipeName}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ingredients(required) :</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    name="ingredientName"
                    placeholder="Ingredient Name"
                    value={ingredient.ingredientName}
                    onChange={(e) => this.handleIngredientChange(e, index)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="quantity"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(e) => this.handleIngredientChange(e, index)}
                    required
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
              <label className="form-label">Instructions(required) :</label>
              {instructions.map((instruction, index) => (
                <div key={index} className="mb-2">
                  <textarea
                    className="form-control"
                    name="instruction"
                    placeholder={`Step ${index + 1}`}
                    value={instruction}
                    onChange={(e) => this.handleInstructionChange(e, index)}
                    required
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
              <label className="form-label">Author Name(required) :</label>
              <input
                type="text"
                className="form-control"
                name="authorName"
                value={authorName}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Image(optional) :</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                // value={imageFile}
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

import React, { Component } from "react";

export default class CreateRecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: "",
      ingredients: [{ name: "", quantity: "" }],
      instructions: [""],
      authorName: "",
    };
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
      ingredients: [...prevState.ingredients, { name: "", quantity: "" }],
    }));
  };

  handleAddInstruction = () => {
    this.setState((prevState) => ({
      instructions: [...prevState.instructions, ""],
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form data, such as sending it to a server
    console.log("Form data submitted:", this.state);
  };

  render() {
    const { recipeName, ingredients, instructions, authorName } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="container mt-4">
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
                name="name"
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

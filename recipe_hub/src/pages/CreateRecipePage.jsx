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
      <form onSubmit={this.handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            name="recipeName"
            value={recipeName}
            onChange={this.handleChange}
          />
        </label>

        <div>
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => this.handleIngredientChange(e, index)}
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => this.handleIngredientChange(e, index)}
              />
            </div>
          ))}
          <button type="button" onClick={this.handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        <div>
          <label>Instructions:</label>
          {instructions.map((instruction, index) => (
            <div key={index}>
              <textarea
                name="instruction"
                placeholder={`Step ${index + 1}`}
                value={instruction}
                onChange={(e) => this.handleInstructionChange(e, index)}
              />
            </div>
          ))}
          <button type="button" onClick={this.handleAddInstruction}>
            Add Instruction
          </button>
        </div>

        <label>
          Author Name:
          <input
            type="text"
            name="authorName"
            value={authorName}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={this.handleImageChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  typeOfRecipe: {
    type: String,
    required: [true, "Type of recipe is required."],
    enum: ['Appetizer', 'Entree', 'Side', 'Dessert']
  },
  title: {
    type: String,
    required: [true, "Title is required."]
  },
  ingredients: [{
    type: String,
    required: [true, "Ingredients are required."]
  }],
  procedure: [{
    type: String,
    required: [true, "Preparation are required."]
  }]
});

export default model('Recipe', recipeSchema, 'Recipes');

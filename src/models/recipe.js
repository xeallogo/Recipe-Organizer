const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
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
    required: [true, "Procedure are required."]
  }]
});

module.exports = mongoose.model('Recipe', recipeSchema);

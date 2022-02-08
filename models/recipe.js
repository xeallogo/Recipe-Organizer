const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  typeOfRecipe: {
    type: String,
    required: [true, "Type of recipe is required."]
  },
  title: {
    type: String,
    required: [true, "Title is required."]
  },
  ingredients: {
    type: String,
    required: [true, "Ingredients can't be blank."]
  },
  procedure: {
    type: String,
    required: [true, "Procedure can't be blank."]
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);

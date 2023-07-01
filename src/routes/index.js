const express = require ('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/recipes', (req, res) => {
  Recipe.find((err, foundRecipes) => {
    res.json(foundRecipes);
  });
});

router.get('/recipes/:_id', (req, res) => {
  Recipe.findById(req.params._id, (err, foundRecipe) => {
    if (!foundRecipe) {
      res.status(404).send('No result found.');
    } else {
      res.json(foundRecipe);
    }
  });
});

router.post('/recipes', (req, res) => {
  let recipe = new Recipe(req.body);
  recipe.save()
    .then(recipe => {
      res.send(recipe);
    })
    .catch((err) => {
      res.status(422).send('Recipe add failed.');
    });
});

router.patch('/recipes/:_id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params._id, req.body)
    .then(() => {
      res.json('Recipe updated.');
    })
    .catch((err) => {
      res.status(422).send("Recipe update failed.");
    });
});

router.delete('/recipes/:_id', (req, res) => {
  Recipe.findById(req.params._id, (err, foundRecipe) => {
    if (!foundRecipe) {
      res.status(404).send('Recipe not found.');
    } else {
      Recipe.findByIdAndRemove(req.params._id)
        .then(() => { res.status(200).json("Recipe deleted.") })
        .catch((err) => {
          res.status(400).send("Recipe delete failed.");
        })
    }
  });
})

module.exports = router;

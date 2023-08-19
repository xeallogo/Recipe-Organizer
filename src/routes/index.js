/* eslint-disable import/extensions */
import { Router } from 'express';
import passport from 'passport';
import Recipe from '../models/recipe.js';
import User from '../models/user.js';

const router = Router();

router.post('/signup', (req, res) => {
  User.register(new User({
    username: req.body.username,
  }), req.body.password, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send({ message: 'Successful' });
    }
  });
});

router.post('/login', passport.authenticate('local', {
  successMessage: true,
  failureMessage: true,
  failureRedirect: '/login',
}), async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  res.status(200).json({ id: user._id });
});

router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send('User is logged in.');
  } else {
    res.status(401).send('User is not authenticated.');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).send('You are successfully logged out!');
});

router.get('/recipes', (req, res) => {
  if (req.isAuthenticated()) {
    Recipe.find({}, (err, foundRecipes) => {
      res.json(foundRecipes);
    });
  } else {
    res.status(401).send('User is not authenticated.');
  }
});

router.get('/recipes/:_id', (req, res) => {
  if (req.isAuthenticated()) {
    Recipe.findById(req.params._id, (err, foundRecipe) => {
      if (!foundRecipe) {
        res.status(404).send('No result found.');
      } else {
        res.json(foundRecipe);
      }
    });
  } else {
    res.status(401).send('User is not authenticated.');
  }
});

router.post('/recipes', async (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.body)
    const recipe = new Recipe(req.body);
    await recipe.save()
      .then(() => {
        res.send(recipe);
      })
      .catch(() => {
        res.status(422).send('Recipe add failed.');
      });
  } else {
    res.status(401).send('User is not authenticated.');
  }
});

router.patch('/recipes/:_id', (req, res) => {
  if (req.isAuthenticated()) {
    Recipe.findByIdAndUpdate(req.params._id, req.body)
      .then(() => {
        res.json('Recipe updated.');
      })
      .catch(() => {
        res.status(422).send('Recipe update failed.');
      });
  } else {
    res.status(401).send('User is not authenticated.');
  }
});

router.delete('/recipes/:_id', (req, res) => {
  if (req.isAuthenticated()) {
    Recipe.findById(req.params._id, (err, foundRecipe) => {
      if (!foundRecipe) {
        res.status(404).send('Recipe not found.');
      } else {
        Recipe.findByIdAndRemove(req.params._id)
          .then(() => { res.status(200).json('Recipe deleted.'); })
          .catch(() => {
            res.status(400).send('Recipe delete failed.');
          });
      }
    });
  } else {
    res.status(401).send('User is not authenticated.');
  }
});

export default router;

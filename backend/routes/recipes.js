const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/recipesController');

// POST /api/recipes
router.post('/', ctrl.createRecipe);

// GET /api/recipes
router.get('/', ctrl.getAllRecipes);

// GET /api/recipes/:id
router.get('/:id', ctrl.getRecipeById);

// PUT /api/recipes/:id
router.put('/:id', ctrl.updateRecipe);

// DELETE /api/recipes/:id
router.delete('/:id', ctrl.deleteRecipe);

module.exports = router;

const Recipe = require('../models/Recipe');

// create
exports.createRecipe = async (req, res, next) => {
  try {
    const { title, description, ingredients, instructions, tags, author } = req.body;

    if (!title || !instructions) {
      return res.status(400).json({ error: 'Title and instructions are required' });
    }

    const recipe = new Recipe({
      title,
      description: description || '',
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      instructions,
      tags: Array.isArray(tags) ? tags : [],
      author: author || 'Anonymous'
    });

    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// list all
exports.getAllRecipes = async (req, res, next) => {
  try {
    // allow optional ?q=search or ?tag=...
    const { q, tag } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { instructions: { $regex: q, $options: 'i' } }
      ];
    }
    if (tag) filter.tags = tag;

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

// get one
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

// update
exports.updateRecipe = async (req, res, next) => {
  try {
    const updates = req.body;
    updates.updatedAt = Date.now();
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

// delete
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    next(err);
  }
};

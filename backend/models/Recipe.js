const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: String, trim: true } // e.g., "2 cups"
}, { _id: false });

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  ingredients: { type: [IngredientSchema], default: [] },
  instructions: { type: String, required: true },
  tags: { type: [String], default: [] },
  author: { type: String, trim: true }, // optional
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

RecipeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Recipe', RecipeSchema);

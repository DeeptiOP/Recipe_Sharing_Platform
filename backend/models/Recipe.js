import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  cookingTime: { type: Number, required: true }, // in minutes
  servings: { type: Number, required: true },
  cuisine: String,
  dietaryPreferences: [String], // e.g., vegetarian, vegan, gluten-free
  image: String,
  videoUrl: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }],
  averageRating: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model("Recipe", RecipeSchema);
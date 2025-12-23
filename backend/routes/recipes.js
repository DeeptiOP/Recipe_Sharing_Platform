import express from "express";
import jwt from "jsonwebtoken";
import Recipe from "../models/Recipe.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author", "username").sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("author", "username profilePicture")
      .populate("comments", null, null, { populate: { path: "author", select: "username" } });
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create recipe
router.post("/", verifyToken, async (req, res) => {
  try {
    const recipe = new Recipe({ ...req.body, author: req.user.id });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update recipe
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    if (recipe.author.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });
    Object.assign(recipe, req.body);
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete recipe
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    if (recipe.author.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });
    await recipe.deleteOne();
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rate recipe
router.post("/:id/rate", verifyToken, async (req, res) => {
  try {
    const { rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    const existingRating = recipe.ratings.find(r => r.user.toString() === req.user.id);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      recipe.ratings.push({ user: req.user.id, rating });
    }
    recipe.averageRating = recipe.ratings.reduce((sum, r) => sum + r.rating, 0) / recipe.ratings.length;
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add comment
router.post("/:id/comment", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({ text, author: req.user.id, recipe: req.params.id });
    await comment.save();
    const recipe = await Recipe.findById(req.params.id);
    recipe.comments.push(comment._id);
    await recipe.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Like recipe
router.post("/:id/like", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    const index = recipe.likes.indexOf(req.user.id);
    if (index > -1) {
      recipe.likes.splice(index, 1);
    } else {
      recipe.likes.push(req.user.id);
    }
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search recipes
router.get("/search", async (req, res) => {
  try {
    const { q, cuisine, dietary } = req.query;
    let query = {};
    if (q) query.title = { $regex: q, $options: "i" };
    if (cuisine) query.cuisine = cuisine;
    if (dietary) query.dietaryPreferences = { $in: dietary.split(",") };
    const recipes = await Recipe.find(query).populate("author", "username");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
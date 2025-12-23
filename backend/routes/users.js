import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

const router = express.Router();

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

// Get user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) return res.status(403).json({ error: "Unauthorized" });
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's recipes
router.get("/:id/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.params.id }).populate("author", "username");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Follow user
router.post("/:id/follow", verifyToken, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!userToFollow || !currentUser) return res.status(404).json({ error: "User not found" });
    if (currentUser.following.includes(req.params.id)) {
      currentUser.following.pull(req.params.id);
      userToFollow.followers.pull(req.user.id);
    } else {
      currentUser.following.push(req.params.id);
      userToFollow.followers.push(req.user.id);
    }
    await currentUser.save();
    await userToFollow.save();
    res.json({ message: "Follow status updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Save recipe
router.post("/save-recipe/:recipeId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const index = user.savedRecipes.indexOf(req.params.recipeId);
    if (index > -1) {
      user.savedRecipes.splice(index, 1);
    } else {
      user.savedRecipes.push(req.params.recipeId);
    }
    await user.save();
    res.json({ message: "Recipe saved status updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
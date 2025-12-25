import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const foodImages = [
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop", // Pizza
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", // Burger
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", // Pasta
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", // Sushi
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop", // Salad
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop", // Steak
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop", // Tacos
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop", // Soup
  "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop", // Chicken
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", // Ice Cream
  "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop", // Cake
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", // General food
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", // Asian
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop", // Mexican
  "https://images.unsplash.com/photo-1551782450-17144efb5723?w=400&h=300&fit=crop", // Italian
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"  // Breakfast
];

const getRecipeImage = (title, existingImage) => {
  if (existingImage) return existingImage;

  const titleLower = title.toLowerCase();

  if (titleLower.includes('pizza')) return foodImages[0];
  if (titleLower.includes('burger') || titleLower.includes('hamburger')) return foodImages[1];
  if (titleLower.includes('pasta') || titleLower.includes('spaghetti') || titleLower.includes('noodle')) return foodImages[2];
  if (titleLower.includes('sushi') || titleLower.includes('sashimi') || titleLower.includes('japanese')) return foodImages[3];
  if (titleLower.includes('salad') || titleLower.includes('greens')) return foodImages[4];
  if (titleLower.includes('steak') || titleLower.includes('beef') || titleLower.includes('meat')) return foodImages[5];
  if (titleLower.includes('taco') || titleLower.includes('burrito') || titleLower.includes('mexican')) return foodImages[6];
  if (titleLower.includes('soup') || titleLower.includes('stew')) return foodImages[7];
  if (titleLower.includes('chicken') || titleLower.includes('turkey')) return foodImages[8];
  if (titleLower.includes('ice cream') || titleLower.includes('dessert') || titleLower.includes('sweet')) return foodImages[9];
  if (titleLower.includes('cake') || titleLower.includes('pie') || titleLower.includes('pastry')) return foodImages[10];
  if (titleLower.includes('asian') || titleLower.includes('chinese') || titleLower.includes('thai')) return foodImages[12];
  if (titleLower.includes('italian')) return foodImages[14];
  if (titleLower.includes('breakfast') || titleLower.includes('eggs') || titleLower.includes('pancake')) return foodImages[15];

  // Default to a random image
  return foodImages[Math.floor(Math.random() * foodImages.length)];
};

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes/${id}`).then(res => setRecipe(res.data));
  }, [id]);

  const handleComment = async () => {
    if (!comment) return;
    await axios.post(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes/${id}/comment`, { text: comment });
    setComment("");
    // Refresh recipe
    const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes/${id}`);
    setRecipe(res.data);
  };

  const handleRating = async (newRating) => {
    await axios.post(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes/${id}/rate`, { rating: newRating });
    const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes/${id}`);
    setRecipe(res.data);
  };

  const handleLike = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes/${id}/like`);
    const res = await axios.get(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes/${id}`);
    setRecipe(res.data);
  };

  if (!recipe) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl border border-purple-500">
        <motion.h1
          className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {recipe.title}
        </motion.h1>
        <motion.img
          src={getRecipeImage(recipe.title, recipe.image)}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-2xl mb-6 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        {recipe.videoUrl && (
          <motion.iframe
            src={recipe.videoUrl}
            className="w-full h-64 mb-6 rounded-2xl border border-purple-500"
            title="Recipe Video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.iframe>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-700 p-4 rounded-xl border border-purple-500">
            <p className="text-purple-300 font-semibold">⏱️ Cooking Time</p>
            <p className="text-white text-xl">{recipe.cookingTime} minutes</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-xl border border-purple-500">
            <p className="text-purple-300 font-semibold">🍽️ Servings</p>
            <p className="text-white text-xl">{recipe.servings}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-xl border border-purple-500">
            <p className="text-purple-300 font-semibold">🌍 Cuisine</p>
            <p className="text-white text-xl">{recipe.cuisine || 'General'}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-xl border border-purple-500">
            <p className="text-purple-300 font-semibold">⭐ Rating</p>
            <p className="text-yellow-400 text-xl">{recipe.averageRating.toFixed(1)}</p>
          </div>
        </div>
        {user && (
          <div className="mb-6 flex gap-4">
            <select
              onChange={(e) => handleRating(Number(e.target.value))}
              className="bg-purple-600 text-white px-4 py-2 rounded-xl border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="">⭐ Rate this recipe</option>
              <option value="1">1 ⭐</option>
              <option value="2">2 ⭐⭐</option>
              <option value="3">3 ⭐⭐⭐</option>
              <option value="4">4 ⭐⭐⭐⭐</option>
              <option value="5">5 ⭐⭐⭐⭐⭐</option>
            </select>
            <button
              onClick={handleLike}
              className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                recipe.likes.includes(user?.id)
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-white'
              }`}
            >
              {recipe.likes.includes(user?.id) ? '💔 Unlike' : '❤️ Like'} ({recipe.likes.length})
            </button>
          </div>
        )}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-purple-300 mb-4">🥕 Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center text-gray-300 bg-gray-700 p-3 rounded-lg border border-gray-600">
                <span className="text-purple-400 mr-3">•</span> {ing}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-purple-300 mb-4">👨‍🍳 Cooking Steps</h2>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex items-start text-gray-300 bg-gray-700 p-4 rounded-lg border border-gray-600">
                <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 font-bold">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-purple-300 mb-4">💬 Comments</h2>
          {recipe.comments.length > 0 ? (
            <div className="space-y-4">
              {recipe.comments.map(c => (
                <div key={c._id} className="bg-gray-700 p-4 rounded-xl border border-gray-600">
                  <p className="text-purple-300 font-semibold">{c.author.username}</p>
                  <p className="text-gray-300 mt-1">{c.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
          )}
          {user && (
            <div className="mt-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this recipe..."
                className="w-full p-4 border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 resize-vertical"
                rows="4"
              />
              <button
                onClick={handleComment}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold mt-3 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                💬 Post Comment
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetail;
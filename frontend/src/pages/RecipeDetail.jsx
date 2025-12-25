import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

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

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {recipe.title}
        </motion.h1>
        <img src={recipe.image || "/placeholder.jpg"} alt={recipe.title} className="w-full h-64 object-cover rounded mb-4" />
        {recipe.videoUrl && (
          <iframe src={recipe.videoUrl} className="w-full h-64 mb-4" title="Recipe Video"></iframe>
        )}
        <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
        <p><strong>Dietary:</strong> {recipe.dietaryPreferences.join(", ")}</p>
        <div className="mb-4">
          <span>Rating: ⭐ {recipe.averageRating.toFixed(1)}</span>
          {user && (
            <select onChange={(e) => handleRating(Number(e.target.value))} className="ml-4 border rounded">
              <option value="">Rate</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          )}
        </div>
        <button onClick={handleLike} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
          {recipe.likes.includes(user?.id) ? "Unlike" : "Like"} ({recipe.likes.length})
        </button>
        <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
        <ul className="list-disc ml-6">
          {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
        <h2 className="text-2xl font-semibold mt-6">Steps</h2>
        <ol className="list-decimal ml-6">
          {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
        <h2 className="text-2xl font-semibold mt-6">Comments</h2>
        {recipe.comments.map(c => (
          <div key={c._id} className="border-b py-2">
            <p><strong>{c.author.username}:</strong> {c.text}</p>
          </div>
        ))}
        {user && (
          <div className="mt-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border rounded"
            />
            <button onClick={handleComment} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Comment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
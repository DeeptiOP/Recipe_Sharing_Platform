import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateRecipe = () => {
  const [form, setForm] = useState({
    title: "",
    ingredients: [""],
    steps: [""],
    cookingTime: "",
    servings: "",
    cuisine: "",
    dietaryPreferences: [],
    image: "",
    videoUrl: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...form[field]];
    newArray[index] = value;
    setForm({ ...form, [field]: newArray });
  };

  const addField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;

      // If a file is selected, upload it (this would need backend support)
      if (imageFile) {
        // For now, we'll use the preview URL. In production, you'd upload to a service like Cloudinary
        imageUrl = imagePreview;
      }

      const recipeData = { ...form, image: imageUrl };
      await axios.post(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes`, recipeData);
      navigate("/");
    } catch (error) {
      alert("Failed to create recipe");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl border border-purple-500">
        <motion.h1
          className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌙 Create Your Culinary Masterpiece
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label className="block text-lg font-semibold text-gray-300 mb-2">Recipe Title</label>
            <input
              name="title"
              placeholder="Enter a captivating title..."
              value={form.title}
              onChange={handleChange}
              className="w-full p-4 border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label className="block text-lg font-semibold text-gray-300 mb-2">Ingredients</label>
            {form.ingredients.map((ing, i) => (
              <input
                key={i}
                value={ing}
                onChange={(e) => handleArrayChange("ingredients", i, e.target.value)}
                className="w-full p-3 mb-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
                placeholder={`Ingredient ${i + 1} (e.g., 2 cups flour)`}
              />
            ))}
            <button
              type="button"
              onClick={() => addField("ingredients")}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300 shadow-md"
            >
              + Add Ingredient
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <label className="block text-lg font-semibold text-gray-300 mb-2">Cooking Steps</label>
            {form.steps.map((step, i) => (
              <textarea
                key={i}
                value={step}
                onChange={(e) => handleArrayChange("steps", i, e.target.value)}
                className="w-full p-3 mb-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 resize-vertical bg-gray-700 text-white placeholder-gray-400"
                placeholder={`Step ${i + 1}: Describe the cooking process...`}
                rows="3"
              />
            ))}
            <button
              type="button"
              onClick={() => addField("steps")}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300 shadow-md"
            >
              + Add Step
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-lg font-semibold text-gray-300 mb-2">Cooking Time (minutes)</label>
              <input
                name="cookingTime"
                type="number"
                placeholder="30"
                value={form.cookingTime}
                onChange={handleChange}
                className="w-full p-4 border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="block text-lg font-semibold text-gray-300 mb-2">Servings</label>
              <input
                name="servings"
                type="number"
                placeholder="4"
                value={form.servings}
                onChange={handleChange}
                className="w-full p-4 border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
                required
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <label className="block text-lg font-semibold text-gray-300 mb-2">Cuisine Type</label>
            <input
              name="cuisine"
              placeholder="e.g., Italian, Mexican, Asian..."
              value={form.cuisine}
              onChange={handleChange}
              className="w-full p-4 border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <label className="block text-lg font-semibold text-gray-300 mb-2">Recipe Image</label>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-4 border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
              />
              <div className="text-sm text-gray-400">
                Or paste an image URL below:
              </div>
              <input
                name="image"
                placeholder="Paste image URL here..."
                value={form.image}
                onChange={handleChange}
                className="w-full p-4 border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
              />
              {(imagePreview || form.image) && (
                <div className="mt-4">
                  <img
                    src={imagePreview || form.image}
                    alt="Recipe preview"
                    className="w-full h-48 object-cover rounded-xl shadow-md border border-purple-500"
                  />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <label className="block text-lg font-semibold text-gray-300 mb-2">Video URL (Optional)</label>
            <input
              name="videoUrl"
              placeholder="YouTube or video URL..."
              value={form.videoUrl}
              onChange={handleChange}
              className="w-full p-4 border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🚀 Create Recipe
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
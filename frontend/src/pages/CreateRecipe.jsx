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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/recipes`, form);
      navigate("/");
    } catch (error) {
      alert("Failed to create recipe");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Create Recipe
        </motion.h1>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <div className="mb-4">
            <label>Ingredients</label>
            {form.ingredients.map((ing, i) => (
              <input
                key={i}
                value={ing}
                onChange={(e) => handleArrayChange("ingredients", i, e.target.value)}
                className="w-full p-3 mb-2 border rounded"
                placeholder={`Ingredient ${i + 1}`}
              />
            ))}
            <button type="button" onClick={() => addField("ingredients")} className="text-blue-500">Add Ingredient</button>
          </div>
          <div className="mb-4">
            <label>Steps</label>
            {form.steps.map((step, i) => (
              <textarea
                key={i}
                value={step}
                onChange={(e) => handleArrayChange("steps", i, e.target.value)}
                className="w-full p-3 mb-2 border rounded"
                placeholder={`Step ${i + 1}`}
              />
            ))}
            <button type="button" onClick={() => addField("steps")} className="text-blue-500">Add Step</button>
          </div>
          <input
            name="cookingTime"
            type="number"
            placeholder="Cooking Time (minutes)"
            value={form.cookingTime}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <input
            name="servings"
            type="number"
            placeholder="Servings"
            value={form.servings}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <input
            name="cuisine"
            placeholder="Cuisine"
            value={form.cuisine}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <input
            name="videoUrl"
            placeholder="Video URL"
            value={form.videoUrl}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded"
          />
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded">Create Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
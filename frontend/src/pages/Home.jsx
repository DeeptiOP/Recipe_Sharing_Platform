import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setRecipes(res.data);
        } else {
          console.error('API did not return an array for recipes');
        }
      })
      .catch(err => console.error('Failed to fetch recipes:', err));
  }, []);

  const filteredRecipes = recipes.filter(r => r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Recipe Sharing Platform</h1>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-8 border rounded-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <motion.div
              key={recipe._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <img src={recipe.image || "/placeholder.jpg"} alt={recipe.title} className="w-full h-48 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
              <p className="text-gray-600">By {recipe.author.username}</p>
              <p className="text-yellow-500">⭐ {recipe.averageRating.toFixed(1)}</p>
              <Link to={`/recipe/${recipe._id}`} className="text-blue-500 mt-2 inline-block">View Recipe</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
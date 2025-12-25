import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

  // Specific dish mappings
  if (titleLower.includes('pizza') || titleLower.includes('margherita') || titleLower.includes('pepperoni')) return foodImages[0];
  if (titleLower.includes('burger') || titleLower.includes('hamburger') || titleLower.includes('cheeseburger')) return foodImages[1];
  if (titleLower.includes('pasta') || titleLower.includes('spaghetti') || titleLower.includes('noodle') || titleLower.includes('macaroni') || titleLower.includes('lasagna') || titleLower.includes('ravioli')) return foodImages[2];
  if (titleLower.includes('sushi') || titleLower.includes('sashimi') || titleLower.includes('japanese') || titleLower.includes('sake') || titleLower.includes('tempura')) return foodImages[3];
  if (titleLower.includes('salad') || titleLower.includes('greens') || titleLower.includes('lettuce') || titleLower.includes('caesar')) return foodImages[4];
  if (titleLower.includes('steak') || titleLower.includes('beef') || titleLower.includes('meat') || titleLower.includes('ribeye') || titleLower.includes('filet')) return foodImages[5];
  if (titleLower.includes('taco') || titleLower.includes('burrito') || titleLower.includes('mexican') || titleLower.includes('quesadilla') || titleLower.includes('enchilada') || titleLower.includes('fajita')) return foodImages[6];
  if (titleLower.includes('soup') || titleLower.includes('stew') || titleLower.includes('broth') || titleLower.includes('chowder')) return foodImages[7];
  if (titleLower.includes('chicken') || titleLower.includes('turkey') || titleLower.includes('roast chicken') || titleLower.includes('fried chicken')) return foodImages[8];
  if (titleLower.includes('ice cream') || titleLower.includes('dessert') || titleLower.includes('sweet') || titleLower.includes('gelato') || titleLower.includes('sorbet')) return foodImages[9];
  if (titleLower.includes('cake') || titleLower.includes('pie') || titleLower.includes('pastry') || titleLower.includes('tart') || titleLower.includes('cheesecake') || titleLower.includes('brownie')) return foodImages[10];
  if (titleLower.includes('asian') || titleLower.includes('chinese') || titleLower.includes('thai') || titleLower.includes('korean') || titleLower.includes('vietnamese') || titleLower.includes('curry') || titleLower.includes('stir fry') || titleLower.includes('dim sum')) return foodImages[12];
  if (titleLower.includes('italian') || titleLower.includes('risotto') || titleLower.includes('polenta') || titleLower.includes('gnocchi')) return foodImages[14];
  if (titleLower.includes('breakfast') || titleLower.includes('eggs') || titleLower.includes('pancake') || titleLower.includes('waffle') || titleLower.includes('oatmeal') || titleLower.includes('cereal') || titleLower.includes('toast')) return foodImages[15];

  // Additional comprehensive mappings
  if (titleLower.includes('sandwich') || titleLower.includes('wrap') || titleLower.includes('panini')) return foodImages[11]; // General food
  if (titleLower.includes('fish') || titleLower.includes('seafood') || titleLower.includes('salmon') || titleLower.includes('tuna') || titleLower.includes('shrimp')) return foodImages[3]; // Use sushi image for seafood
  if (titleLower.includes('vegetarian') || titleLower.includes('vegan') || titleLower.includes('veggie')) return foodImages[4]; // Use salad image
  if (titleLower.includes('grilled') || titleLower.includes('bbq') || titleLower.includes('barbecue')) return foodImages[5]; // Use steak image
  if (titleLower.includes('baked') || titleLower.includes('roasted') || titleLower.includes('oven')) return foodImages[8]; // Use chicken image
  if (titleLower.includes('fried') || titleLower.includes('crispy')) return foodImages[1]; // Use burger image for fried foods
  if (titleLower.includes('smoothie') || titleLower.includes('juice') || titleLower.includes('drink')) return foodImages[9]; // Use ice cream image for beverages
  if (titleLower.includes('cookie') || titleLower.includes('biscuit') || titleLower.includes('muffin')) return foodImages[10]; // Use cake image
  if (titleLower.includes('indian') || titleLower.includes('masala') || titleLower.includes('tandoori') || titleLower.includes('biryani')) return foodImages[12]; // Use Asian image
  if (titleLower.includes('french') || titleLower.includes('crepe') || titleLower.includes('quiche')) return foodImages[14]; // Use Italian image
  if (titleLower.includes('american') || titleLower.includes('comfort food')) return foodImages[1]; // Use burger image
  if (titleLower.includes('mediterranean') || titleLower.includes('greek') || titleLower.includes('tzatziki')) return foodImages[4]; // Use salad image

  // Default to general food image if no specific match
  return foodImages[11];
};

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Filter recipes based on search
    if (!search || !search.trim()) {
      setFilteredRecipes(recipes);
      return;
    }
    
    const searchTerm = search.toLowerCase().trim();
    const filtered = recipes.filter(recipe => {
      if (!recipe) return false;
      
      // Search in title
      if (recipe.title && recipe.title.toLowerCase().includes(searchTerm)) return true;
      
      // Search in cuisine
      if (recipe.cuisine && recipe.cuisine.toLowerCase().includes(searchTerm)) return true;
      
      // Search in author username
      if (recipe.author && recipe.author.username && recipe.author.username.toLowerCase().includes(searchTerm)) return true;
      
      // Search in ingredients
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        if (recipe.ingredients.some(ingredient => 
          ingredient && typeof ingredient === 'string' && ingredient.toLowerCase().includes(searchTerm)
        )) return true;
      }
      
      // Search in description if available
      if (recipe.description && recipe.description.toLowerCase().includes(searchTerm)) return true;
      
      return false;
    });
    
    setFilteredRecipes(filtered);
  }, [search, recipes]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://recipe-sharing-platform-tw89.onrender.com'}/api/recipes`);
      if (response.data && Array.isArray(response.data)) {
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      setError('Failed to load recipes. Please try again later.');
      // Set some sample recipes as fallback for demo purposes
      const sampleRecipes = [
        {
          _id: 'sample-1',
          title: 'Classic Margherita Pizza',
          cookingTime: 30,
          servings: 4,
          cuisine: 'Italian',
          averageRating: 4.5,
          author: { username: 'Chef Mario' },
          image: foodImages[0]
        },
        {
          _id: 'sample-2',
          title: 'Juicy Beef Burger',
          cookingTime: 20,
          servings: 2,
          cuisine: 'American',
          averageRating: 4.2,
          author: { username: 'Burger Master' },
          image: foodImages[1]
        },
        {
          _id: 'sample-3',
          title: 'Creamy Alfredo Pasta',
          cookingTime: 25,
          servings: 4,
          cuisine: 'Italian',
          averageRating: 4.7,
          author: { username: 'Pasta Lover' },
          image: foodImages[2]
        },
        {
          _id: 'sample-4',
          title: 'Fresh Garden Salad',
          cookingTime: 15,
          servings: 2,
          cuisine: 'Healthy',
          averageRating: 4.0,
          author: { username: 'Healthy Chef' },
          image: foodImages[4]
        },
        {
          _id: 'sample-5',
          title: 'Spicy Chicken Tacos',
          cookingTime: 25,
          servings: 3,
          cuisine: 'Mexican',
          averageRating: 4.3,
          author: { username: 'Taco King' },
          image: foodImages[6]
        },
        {
          _id: 'sample-6',
          title: 'Grilled Salmon Steak',
          cookingTime: 20,
          servings: 2,
          cuisine: 'Seafood',
          averageRating: 4.6,
          author: { username: 'Seafood Expert' },
          image: foodImages[3]
        },
        {
          _id: 'sample-7',
          title: 'Chocolate Cake',
          cookingTime: 45,
          servings: 8,
          cuisine: 'Dessert',
          averageRating: 4.8,
          author: { username: 'Sweet Chef' },
          image: foodImages[10]
        },
        {
          _id: 'sample-8',
          title: 'Chicken Noodle Soup',
          cookingTime: 35,
          servings: 4,
          cuisine: 'Comfort Food',
          averageRating: 4.1,
          author: { username: 'Soup Master' },
          image: foodImages[7]
        }
      ];
      setRecipes(sampleRecipes);
      setFilteredRecipes(sampleRecipes);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = foodImages[Math.floor(Math.random() * foodImages.length)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <h2 className="text-2xl font-semibold text-white mb-2">Loading delicious recipes...</h2>
            <p className="text-gray-400">Please wait while we prepare your culinary experience</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-semibold text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchRecipes}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🍳 Culinary Delights Hub
        </motion.h1>
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="🔍 Search for delicious recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-4 text-lg border-2 border-purple-500 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gray-800 text-white placeholder-gray-400"
            />
            <button
              onClick={fetchRecipes}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Refresh recipes"
            >
              🔄
            </button>
          </div>
          {filteredRecipes.length > 0 && (
            <p className="text-gray-400 text-center">
              Found {filteredRecipes.length} delicious recipe{filteredRecipes.length !== 1 ? 's' : ''}
              {search && ` for "${search}"`}
            </p>
          )}
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {filteredRecipes.map((recipe, index) => {
            if (!recipe) return null;
            
            return (
              <motion.div
                key={recipe._id || `recipe-${index}`}
                className="bg-gray-800 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden group border border-gray-700"
                whileHover={{ y: -10, scale: 1.02 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getRecipeImage(recipe.title || 'Unknown Recipe', recipe.image)}
                    alt={recipe.title || 'Recipe'}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={handleImageError}
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 rounded-full p-2 shadow-md">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="font-semibold text-white ml-1">
                      {recipe.averageRating ? Number(recipe.averageRating).toFixed(1) : '0.0'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.cookingTime ? `${recipe.cookingTime} min` : 'N/A'}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {recipe.title || 'Untitled Recipe'}
                  </h2>
                  <p className="text-gray-400 mb-3 flex items-center">
                    <span className="mr-2">👨‍🍳</span>
                    {recipe.author && recipe.author.username ? recipe.author.username : 'Anonymous'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 bg-gray-700 px-2 py-1 rounded-full">
                      {recipe.cuisine || 'General'}
                    </span>
                    <Link
                      to={recipe._id ? `/recipe/${recipe._id}` : '#'}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={(e) => {
                        if (!recipe._id) {
                          e.preventDefault();
                          alert('Recipe details not available for this sample recipe');
                        }
                      }}
                    >
                      View Recipe →
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        {filteredRecipes.length === 0 && recipes.length > 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse all recipes</p>
            <button
              onClick={() => setSearch('')}
              className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🧹 Clear Search
            </button>
          </motion.div>
        )}

        {filteredRecipes.length === 0 && recipes.length === 0 && !loading && !error && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No recipes available</h3>
            <p className="text-gray-500 mb-6">Be the first to share a delicious recipe!</p>
            <Link
              to="/create-recipe"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
            >
              ➕ Create First Recipe
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
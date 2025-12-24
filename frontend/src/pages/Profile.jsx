import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (!import.meta.env.VITE_API_URL) {
      console.error('VITE_API_URL is not set');
      return;
    }
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error('Failed to fetch user:', err));
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}/recipes`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setRecipes(res.data);
        } else {
          console.error('API did not return an array for user recipes');
        }
      })
      .catch(err => console.error('Failed to fetch user recipes:', err));
  }, [id, currentUser, navigate]);

  const handleFollow = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/users/${id}/follow`);
    // Refresh user
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
    setUser(res.data);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src={user.profilePicture || "/placeholder.jpg"} alt={user.username} className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.bio}</p>
          <p>Followers: {user.followers.length} | Following: {user.following.length}</p>
          {currentUser && currentUser.id !== id && (
            <button onClick={handleFollow} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              {user.followers.includes(currentUser.id) ? "Unfollow" : "Follow"}
            </button>
          )}
        </motion.div>
        <h2 className="text-2xl font-semibold mb-4">Recipes by {user.username}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map(recipe => (
            <motion.div
              key={recipe._id}
              className="bg-gray-50 p-4 rounded"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="font-semibold">{recipe.title}</h3>
              <p>⭐ {recipe.averageRating.toFixed(1)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
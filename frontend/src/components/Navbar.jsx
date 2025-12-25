import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black text-white p-4 shadow-lg border-b border-purple-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
          <span className="text-3xl">🍳</span>
          <span>Culinary Delights</span>
        </Link>
        <div className="flex space-x-6 items-center">
          <Link
            to="/"
            className="hover:bg-purple-500 hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 font-medium"
          >
            🏠 Home
          </Link>
          {user ? (
            <>
              <Link
                to="/create-recipe"
                className="hover:bg-purple-500 hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 font-medium"
              >
                ➕ Create Recipe
              </Link>
              <Link
                to={`/profile/${user.id}`}
                className="hover:bg-purple-500 hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 font-medium"
              >
                👤 Profile
              </Link>
              <button
                onClick={logout}
                className="bg-purple-500 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-all duration-300 font-medium"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:bg-purple-500 hover:bg-opacity-20 px-4 py-2 rounded-full transition-all duration-300 font-medium"
              >
                🔐 Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md"
              >
                📝 Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
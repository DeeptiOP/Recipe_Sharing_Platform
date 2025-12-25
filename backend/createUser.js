import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createUserIfNeeded = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app');
    console.log('Connected to MongoDB');

    const user = await User.findOne();
    if (user) {
      console.log('Found existing user:', user.username);
    } else {
      console.log('No users found, creating a test user...');
      const newUser = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      await newUser.save();
      console.log('Created test user with ID:', newUser._id);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createUserIfNeeded();
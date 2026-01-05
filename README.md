# Recipe Sharing Platform

A full-stack web application for sharing and discovering recipes.

frontend url:- https://recipe-sharing-platforms.netlify.app/

backend url:- https://recipe-sharing-platform-tw89.onrender.com

## Features

- User authentication (register/login)
- Create and share recipes
- View recipe details
- User profiles
- Comment on recipes 

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB, JWT
- **Deployment:** Netlify or Vercel (frontend), Render or Vercel (backend)

## Local Development

### Prerequisites

- Node.js
- MongoDB (local or Atlas)

### Setup

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables:

Copy `backend/.env.example` to `backend/.env` and fill in your values:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the servers:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

## Deployment

### Option 1: Full-stack on Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the monorepo setup from `vercel.json`
3. Set environment variables in Vercel dashboard:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure JWT secret
   - `VITE_API_URL`: Will be set to the Vercel domain (e.g., `https://your-app.vercel.app`)

### Option 2: Separate Deployments

#### Backend (Render or Vercel)

**Render:**
1. Create a new Web Service on Render
2. Connect your GitHub repository, set root directory to `backend`
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure JWT secret

**Vercel:**
1. Create a new project on Vercel
2. Set root directory to `backend`
3. Set build command: `npm run build` (if needed, but for Node.js it's auto)
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`

#### Frontend (Netlify or Vercel)

**Netlify:**
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `frontend/dist` folder to Netlify
3. Set environment variable: `VITE_API_URL` to your backend URL

**Vercel:**
1. Create a new project on Vercel
2. Set root directory to `frontend`
3. Vercel will auto-detect Vite
4. Set environment variable: `VITE_API_URL` to your backend URL

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create recipe (authenticated)
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes/:id/comments` - Add comment (authenticated)
- `GET /api/users/profile` - Get user profile (authenticated)




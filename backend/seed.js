import mongoose from "mongoose";
import Recipe from "./models/Recipe.js";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const sampleRecipes = [
  {
    title: "Classic Margherita Pizza",
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup warm water",
      "2 tsp active dry yeast",
      "2 tbsp olive oil",
      "1 tsp salt",
      "1 cup tomato sauce",
      "8 oz fresh mozzarella cheese",
      "Fresh basil leaves",
      "2 tbsp olive oil for drizzling"
    ],
    steps: [
      "Mix flour, yeast, salt, and water to make dough",
      "Knead for 10 minutes and let rise for 1 hour",
      "Roll out dough and spread tomato sauce",
      "Add mozzarella and bake at 475°F for 12-15 minutes",
      "Top with fresh basil and drizzle with olive oil"
    ],
    cookingTime: 30,
    servings: 4,
    cuisine: "Italian",
    dietaryPreferences: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop"
  },
  {
    title: "Juicy Beef Burger",
    ingredients: [
      "1 lb ground beef (80/20)",
      "1 tsp salt",
      "1/2 tsp black pepper",
      "4 burger buns",
      "4 slices cheddar cheese",
      "Lettuce leaves",
      "Tomato slices",
      "Red onion slices",
      "Pickles",
      "Ketchup and mustard"
    ],
    steps: [
      "Mix ground beef with salt and pepper",
      "Form into 4 patties",
      "Grill or pan-fry for 4-5 minutes per side",
      "Add cheese in the last minute to melt",
      "Assemble on buns with toppings"
    ],
    cookingTime: 20,
    servings: 4,
    cuisine: "American",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
  },
  {
    title: "Creamy Alfredo Pasta",
    ingredients: [
      "12 oz fettuccine pasta",
      "1 cup heavy cream",
      "1/2 cup butter",
      "1 cup grated Parmesan cheese",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    steps: [
      "Cook pasta according to package directions",
      "Melt butter and sauté garlic",
      "Add cream and bring to simmer",
      "Stir in Parmesan cheese until melted",
      "Toss with cooked pasta and season"
    ],
    cookingTime: 25,
    servings: 4,
    cuisine: "Italian",
    dietaryPreferences: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
  },
  {
    title: "Fresh Garden Salad",
    ingredients: [
      "6 cups mixed greens",
      "2 cups cherry tomatoes, halved",
      "1 cucumber, sliced",
      "1/2 red onion, thinly sliced",
      "1 avocado, diced",
      "1/2 cup feta cheese",
      "1/4 cup olive oil",
      "2 tbsp balsamic vinegar",
      "Salt and pepper to taste"
    ],
    steps: [
      "Wash and prepare all vegetables",
      "Combine greens, tomatoes, cucumber, and onion",
      "Add avocado and feta cheese",
      "Whisk together olive oil and balsamic vinegar",
      "Drizzle dressing over salad and toss gently"
    ],
    cookingTime: 15,
    servings: 4,
    cuisine: "Mediterranean",
    dietaryPreferences: ["vegetarian", "gluten-free"],
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop"
  },
  {
    title: "Grilled Salmon Steak",
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "2 tbsp olive oil",
      "1 tsp salt",
      "1/2 tsp black pepper",
      "2 cloves garlic, minced",
      "1 lemon, sliced",
      "Fresh dill for garnish"
    ],
    steps: [
      "Season salmon with salt, pepper, and garlic",
      "Brush with olive oil",
      "Preheat grill to medium-high heat",
      "Grill salmon for 4-5 minutes per side",
      "Serve with lemon slices and fresh dill"
    ],
    cookingTime: 15,
    servings: 4,
    cuisine: "American",
    dietaryPreferences: ["gluten-free"],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop"
  },
  {
    title: "Chicken Tikka Masala",
    ingredients: [
      "1.5 lbs chicken breast, cubed",
      "1 cup yogurt",
      "2 tbsp garam masala",
      "1 tbsp turmeric",
      "2 tbsp vegetable oil",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "1 can (14 oz) crushed tomatoes",
      "1 cup heavy cream",
      "Fresh cilantro for garnish"
    ],
    steps: [
      "Marinate chicken in yogurt and spices for 1 hour",
      "Cook chicken in oil until browned",
      "Sauté onion, garlic, and ginger",
      "Add tomatoes and simmer for 10 minutes",
      "Stir in cream and return chicken to pan",
      "Simmer for another 10 minutes and garnish"
    ],
    cookingTime: 45,
    servings: 6,
    cuisine: "Indian",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop"
  },
  {
    title: "Chocolate Lava Cake",
    ingredients: [
      "1/2 cup butter",
      "4 oz dark chocolate",
      "1/2 cup sugar",
      "2 eggs",
      "2 egg yolks",
      "1/4 cup flour",
      "Pinch of salt",
      "Powdered sugar for dusting",
      "Vanilla ice cream for serving"
    ],
    steps: [
      "Melt butter and chocolate together",
      "Whisk in sugar, eggs, and egg yolks",
      "Fold in flour and salt",
      "Pour into greased ramekins",
      "Bake at 425°F for 12-14 minutes",
      "Serve immediately with ice cream"
    ],
    cookingTime: 25,
    servings: 4,
    cuisine: "French",
    dietaryPreferences: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop"
  },
  {
    title: "Spicy Beef Tacos",
    ingredients: [
      "1 lb ground beef",
      "2 tbsp taco seasoning",
      "8 small corn tortillas",
      "1 cup shredded lettuce",
      "1 cup diced tomatoes",
      "1/2 cup shredded cheddar cheese",
      "1/4 cup sour cream",
      "1 avocado, sliced",
      "Fresh cilantro",
      "Lime wedges"
    ],
    steps: [
      "Brown ground beef in a skillet",
      "Add taco seasoning and cook for 5 minutes",
      "Warm tortillas in a dry skillet",
      "Fill tortillas with beef and toppings",
      "Serve with lime wedges and cilantro"
    ],
    cookingTime: 20,
    servings: 4,
    cuisine: "Mexican",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop"
  },
  {
    title: "Classic Chicken Noodle Soup",
    ingredients: [
      "1 whole chicken (3-4 lbs)",
      "8 cups water",
      "2 carrots, sliced",
      "2 celery stalks, sliced",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "8 oz egg noodles",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    steps: [
      "Place chicken in large pot with water",
      "Add vegetables and bring to boil",
      "Simmer for 1 hour until chicken is cooked",
      "Remove chicken, shred meat, discard bones",
      "Add noodles and cook for 8-10 minutes",
      "Return chicken to pot and season"
    ],
    cookingTime: 90,
    servings: 6,
    cuisine: "American",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop"
  },
  {
    title: "Grilled Ribeye Steak",
    ingredients: [
      "2 ribeye steaks (1.5 inches thick)",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "2 sprigs fresh rosemary",
      "Salt and coarse black pepper",
      "2 tbsp butter",
      "Fresh herbs for garnish"
    ],
    steps: [
      "Let steaks come to room temperature",
      "Season generously with salt and pepper",
      "Heat grill to high heat",
      "Grill steaks for 4-5 minutes per side",
      "Add butter and herbs in last minute",
      "Let rest for 5 minutes before serving"
    ],
    cookingTime: 15,
    servings: 2,
    cuisine: "American",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
  },
  {
    title: "Homemade Vanilla Ice Cream",
    ingredients: [
      "2 cups heavy cream",
      "1 cup whole milk",
      "3/4 cup granulated sugar",
      "1 tbsp vanilla extract",
      "Pinch of salt",
      "4 egg yolks"
    ],
    steps: [
      "Heat cream, milk, and half the sugar until hot",
      "Whisk egg yolks with remaining sugar",
      "Temper eggs with hot cream mixture",
      "Cook until thickened (170°F)",
      "Strain and chill for 4 hours",
      "Churn in ice cream maker or freeze"
    ],
    cookingTime: 30,
    servings: 6,
    cuisine: "American",
    dietaryPreferences: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
  },
  {
    title: "Fluffy Pancakes",
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "3 1/2 tsp baking powder",
      "1 tsp salt",
      "1 tbsp sugar",
      "1 1/4 cups milk",
      "1 egg",
      "3 tbsp melted butter",
      "Maple syrup for serving",
      "Fresh berries for topping"
    ],
    steps: [
      "Mix dry ingredients in a bowl",
      "Whisk together wet ingredients",
      "Combine wet and dry ingredients",
      "Heat griddle or skillet over medium heat",
      "Pour batter and cook until bubbles form",
      "Flip and cook until golden brown"
    ],
    cookingTime: 20,
    servings: 4,
    cuisine: "American",
    dietaryPreferences: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
  },
  {
    title: "Thai Green Curry",
    ingredients: [
      "1 lb chicken breast, sliced",
      "2 tbsp green curry paste",
      "1 can (14 oz) coconut milk",
      "1 cup chicken broth",
      "2 tbsp fish sauce",
      "1 tbsp brown sugar",
      "1 cup bamboo shoots",
      "1 red bell pepper, sliced",
      "1 cup Thai basil leaves",
      "Jasmine rice for serving"
    ],
    steps: [
      "Heat oil and fry curry paste for 1 minute",
      "Add coconut milk and bring to simmer",
      "Add chicken and cook for 5 minutes",
      "Add vegetables and seasonings",
      "Simmer for 10 minutes until thickened",
      "Stir in basil and serve with rice"
    ],
    cookingTime: 25,
    servings: 4,
    cuisine: "Thai",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop"
  },
  {
    title: "Classic BLT Sandwich",
    ingredients: [
      "8 slices bacon",
      "8 slices bread, toasted",
      "4 leaves lettuce",
      "2 tomatoes, sliced",
      "4 tbsp mayonnaise",
      "Salt and pepper to taste"
    ],
    steps: [
      "Cook bacon until crispy",
      "Toast bread slices",
      "Spread mayonnaise on bread",
      "Layer bacon, lettuce, and tomato",
      "Season with salt and pepper",
      "Top with second bread slice and cut"
    ],
    cookingTime: 15,
    servings: 4,
    cuisine: "American",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
  },
  {
    title: "Shrimp Scampi",
    ingredients: [
      "1 lb large shrimp, peeled and deveined",
      "4 cloves garlic, minced",
      "1/4 cup olive oil",
      "1/4 cup white wine",
      "1/4 cup lemon juice",
      "1/2 cup butter",
      "1/4 cup fresh parsley, chopped",
      "12 oz linguine pasta",
      "Red pepper flakes",
      "Salt and pepper"
    ],
    steps: [
      "Cook pasta according to package directions",
      "Sauté garlic in olive oil for 1 minute",
      "Add shrimp and cook until pink",
      "Add wine, lemon juice, and butter",
      "Toss with cooked pasta and parsley",
      "Season with red pepper flakes"
    ],
    cookingTime: 20,
    servings: 4,
    cuisine: "Italian",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop"
  },
  {
    title: "Korean Bibimbap",
    ingredients: [
      "2 cups cooked rice",
      "1 cup spinach, sautéed",
      "1 carrot, julienned and sautéed",
      "1 zucchini, sliced and sautéed",
      "4 oz beef, marinated and cooked",
      "2 eggs, fried",
      "2 tbsp gochujang (Korean chili paste)",
      "1 tbsp sesame oil",
      "Sesame seeds for garnish"
    ],
    steps: [
      "Prepare and cook all vegetables separately",
      "Cook marinated beef",
      "Fry eggs sunny-side up",
      "Arrange rice and toppings in bowl",
      "Add gochujang and sesame oil",
      "Mix everything together before eating"
    ],
    cookingTime: 30,
    servings: 2,
    cuisine: "Korean",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop"
  },
  {
    title: "Vegetable Stir Fry",
    ingredients: [
      "2 tbsp vegetable oil",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "2 carrots, julienned",
      "1 cup broccoli florets",
      "1 cup snap peas",
      "3 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp sesame oil",
      "Steamed rice for serving"
    ],
    steps: [
      "Heat oil in wok or large skillet",
      "Add garlic and ginger, stir for 30 seconds",
      "Add vegetables in order of cooking time",
      "Stir fry for 5-7 minutes until tender-crisp",
      "Add sauces and toss to coat",
      "Serve over steamed rice"
    ],
    cookingTime: 15,
    servings: 4,
    cuisine: "Chinese",
    dietaryPreferences: ["vegetarian", "vegan"],
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop"
  },
  {
    title: "French Crepes",
    ingredients: [
      "1 cup all-purpose flour",
      "2 eggs",
      "1 1/4 cups milk",
      "2 tbsp melted butter",
      "1 tbsp sugar",
      "Pinch of salt",
      "Butter for cooking",
      "Various fillings (jam, chocolate, fruit)"
    ],
    steps: [
      "Whisk together all ingredients until smooth",
      "Let batter rest for 30 minutes",
      "Heat non-stick pan with butter",
      "Pour thin layer of batter, swirl to coat",
      "Cook for 1-2 minutes until edges lift",
      "Flip and cook for 30 seconds more"
    ],
    cookingTime: 20,
    servings: 4,
    cuisine: "French",
    dietaryPreferences: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1551782450-17144efb5723?w=400&h=300&fit=crop"
  },
  {
    title: "Mediterranean Grilled Chicken",
    ingredients: [
      "4 chicken breasts",
      "1/4 cup olive oil",
      "3 cloves garlic, minced",
      "1 tbsp dried oregano",
      "1 tbsp dried thyme",
      "Juice of 1 lemon",
      "Salt and pepper to taste",
      "Fresh herbs for garnish"
    ],
    steps: [
      "Mix olive oil, garlic, herbs, and lemon juice",
      "Marinate chicken for at least 30 minutes",
      "Preheat grill to medium-high heat",
      "Grill chicken for 6-7 minutes per side",
      "Let rest for 5 minutes before serving",
      "Garnish with fresh herbs"
    ],
    cookingTime: 25,
    servings: 4,
    cuisine: "Mediterranean",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop"
  },
  {
    title: "Chocolate Chip Cookies",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips"
    ],
    steps: [
      "Preheat oven to 375°F",
      "Mix flour, baking soda, and salt",
      "Cream butter and sugars until fluffy",
      "Beat in eggs and vanilla",
      "Gradually add flour mixture",
      "Stir in chocolate chips",
      "Drop rounded spoonfuls onto baking sheet",
      "Bake for 9-11 minutes until golden"
    ],
    cookingTime: 25,
    servings: 24,
    cuisine: "American",
    dietaryPreferences: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop"
  },
  {
    title: "Fresh Fruit Smoothie",
    ingredients: [
      "1 banana",
      "1 cup strawberries",
      "1/2 cup blueberries",
      "1 cup orange juice",
      "1/2 cup Greek yogurt",
      "1 tbsp honey",
      "1 cup ice cubes"
    ],
    steps: [
      "Wash and prepare all fruits",
      "Add all ingredients to blender",
      "Blend on high speed for 1-2 minutes",
      "Pour into glasses",
      "Serve immediately"
    ],
    cookingTime: 5,
    servings: 2,
    cuisine: "American",
    dietaryPreferences: ["vegetarian"],
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
  },
  {
    title: "Roasted Turkey Breast",
    ingredients: [
      "2 lbs turkey breast",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "1 tbsp fresh rosemary, chopped",
      "1 tbsp fresh thyme, chopped",
      "Salt and pepper to taste",
      "1 lemon, sliced"
    ],
    steps: [
      "Preheat oven to 375°F",
      "Rub turkey with oil and seasonings",
      "Place in roasting pan with lemon slices",
      "Roast for 25-30 minutes per pound",
      "Let rest for 10 minutes before slicing",
      "Serve with pan juices"
    ],
    cookingTime: 60,
    servings: 6,
    cuisine: "American",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop"
  },
  {
    title: "Vietnamese Pho",
    ingredients: [
      "8 cups beef broth",
      "1 lb beef sirloin, thinly sliced",
      "8 oz rice noodles",
      "1 onion, charred",
      "2 inches ginger, charred",
      "2 star anise",
      "1 cinnamon stick",
      "2 tbsp fish sauce",
      "Bean sprouts, basil, lime for serving"
    ],
    steps: [
      "Char onion and ginger, then simmer with spices in broth",
      "Strain broth and season with fish sauce",
      "Cook rice noodles according to package",
      "Assemble bowls with noodles and raw beef",
      "Pour hot broth over beef to cook it",
      "Top with bean sprouts, basil, and lime"
    ],
    cookingTime: 45,
    servings: 4,
    cuisine: "Vietnamese",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop"
  },
  {
    title: "Greek Salad",
    ingredients: [
      "4 tomatoes, chopped",
      "1 cucumber, sliced",
      "1 red onion, thinly sliced",
      "1 cup Kalamata olives",
      "8 oz feta cheese, cubed",
      "1/4 cup olive oil",
      "2 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    steps: [
      "Combine tomatoes, cucumber, onion, and olives",
      "Add feta cheese cubes",
      "Whisk together olive oil, vinegar, and oregano",
      "Drizzle dressing over salad",
      "Toss gently and season with salt and pepper"
    ],
    cookingTime: 15,
    servings: 4,
    cuisine: "Greek",
    dietaryPreferences: ["vegetarian", "gluten-free"],
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop"
  },
  {
    title: "Fried Chicken",
    ingredients: [
      "2 lbs chicken pieces",
      "2 cups buttermilk",
      "2 cups all-purpose flour",
      "1 tbsp paprika",
      "1 tbsp garlic powder",
      "1 tsp cayenne pepper",
      "Salt and pepper to taste",
      "Vegetable oil for frying"
    ],
    steps: [
      "Soak chicken in buttermilk for 4 hours",
      "Mix flour with seasonings",
      "Heat oil to 350°F",
      "Dredge chicken in flour mixture",
      "Fry for 12-15 minutes until golden",
      "Drain on paper towels"
    ],
    cookingTime: 30,
    servings: 4,
    cuisine: "American",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1562967914-608f826c74f8?w=400&h=300&fit=crop"
  },
  {
    title: "Dim Sum Dumplings",
    ingredients: [
      "1 lb ground pork",
      "2 cups napa cabbage, finely chopped",
      "2 green onions, chopped",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tbsp ginger, grated",
      "30 wonton wrappers",
      "Dipping sauce (soy sauce, vinegar, chili oil)"
    ],
    steps: [
      "Mix pork, cabbage, onions, and seasonings",
      "Place small amount in each wrapper",
      "Moisten edges and pleat to seal",
      "Steam for 8-10 minutes",
      "Serve with dipping sauce"
    ],
    cookingTime: 25,
    servings: 6,
    cuisine: "Chinese",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop"
  },
  {
    title: "Quiche Lorraine",
    ingredients: [
      "1 pie crust",
      "8 oz bacon, cooked and crumbled",
      "1 cup Swiss cheese, shredded",
      "4 eggs",
      "1 cup heavy cream",
      "1/2 tsp salt",
      "1/4 tsp nutmeg",
      "1/4 tsp black pepper"
    ],
    steps: [
      "Preheat oven to 375°F",
      "Place bacon and cheese in pie crust",
      "Whisk together eggs, cream, and seasonings",
      "Pour over bacon and cheese",
      "Bake for 35-40 minutes until set",
      "Let cool for 10 minutes before serving"
    ],
    cookingTime: 50,
    servings: 6,
    cuisine: "French",
    dietaryPreferences: [],
    image: "https://images.unsplash.com/photo-1551782450-17144efb5723?w=400&h=300&fit=crop"
  }
];

const seedDatabase = async () => {
  try {
    // Connect directly to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app');
    console.log("Connected to MongoDB for seeding");

    // Get a sample user (you might want to create one first)
    const user = await User.findOne();
    if (!user) {
      console.log("No users found. Please create a user first.");
      return;
    }

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log("Cleared existing recipes");

    for (const recipeData of sampleRecipes) {
      const recipe = new Recipe({
        ...recipeData,
        author: user._id
      });
      await recipe.save();
      console.log(`Created recipe: ${recipe.title}`);
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

export default seedDatabase;
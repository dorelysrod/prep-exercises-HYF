import fs from 'fs';
import { connectToDatabase } from './dbConnection.js'; 

const insertData = async () => {
  let client;  
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

    const { db, client: dbClient } = await connectToDatabase();
    client = dbClient; 
    const categoriesCollection = db.collection('categories');
    const recipesCollection = db.collection('recipes');

    // Insert categories
    const categoryMap = {};
    for (const categoryName of data.categories) {
      const existingCategory = await categoriesCollection.findOne({ name: categoryName });
      if (!existingCategory) {
        const result = await categoriesCollection.insertOne({ name: categoryName });
        console.log(`Category "${categoryName}" inserted with ID: ${result.insertedId}`);
        categoryMap[categoryName] = result.insertedId;
      } else {
        console.log(`Category "${categoryName}" already exists.`);
        categoryMap[categoryName] = existingCategory._id;
      }
    }

    // Insert recipes and link to categories
    for (const recipeData of data.recipes) {
      const existingRecipe = await recipesCollection.findOne({ name: recipeData.name });
      if (!existingRecipe) {
        const recipe = {
          name: recipeData.name,
          description: recipeData.description,
          categories: recipeData.categories.map(category => categoryMap[category]),
          ingredients: recipeData.ingredients,
          steps: recipeData.steps
        };
        const result = await recipesCollection.insertOne(recipe);
        console.log(`Recipe "${recipeData.name}" inserted with ID: ${result.insertedId}`);
      } else {
        console.log(`Recipe "${recipeData.name}" already exists.`);
      }
    }

    console.log('Data insertion completed.');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error.message);
  } finally {
    if (client) {
      client.close();
      console.log('MongoDB connection closed.');
    }
  }
};

insertData();


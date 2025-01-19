import { connectToDatabase } from './dbConnection.js';  

const createCollections = async () => {
  let client;
  try {
    const { client: connectedClient, db } = await connectToDatabase();
    client = connectedClient;  

    // Create collections
    const recipesCollection = await db.createCollection('recipes');
    const categoriesCollection = await db.createCollection('categories');

    console.log('Collections created: recipes, categories.');

    await recipesCollection.createIndex({ name: 1 }, { unique: true });
    await categoriesCollection.createIndex({ name: 1 }, { unique: true });

    console.log('Indexes created for recipes and categories collections.');

  } catch (error) {
    console.error('Error creating collections or indexes:', error.message);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed.');
    }
  }
};

createCollections().catch((err) => {
  console.error('Unhandled error:', err.message);
});

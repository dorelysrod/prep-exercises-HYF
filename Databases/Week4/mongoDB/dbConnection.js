import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

export const connectToDatabase = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
};


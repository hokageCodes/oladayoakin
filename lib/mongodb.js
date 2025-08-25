import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb };
  
    try {
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        w: "majority",
      });
  
      await client.connect();
      const db = client.db("daylee");
  
      cachedClient = client;
      cachedDb = db;
  
      return { client, db };
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      throw err;
    }
  }
  

export { connectToDatabase };

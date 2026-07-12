const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected Successfully!");
    await client.close();
  } catch (error) {
    console.error("❌ Connection Error:");
    console.error(error);
  }
}

connectDB();
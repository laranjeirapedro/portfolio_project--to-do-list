import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      dbName: "todoApp",
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB", error);
    throw error;
  }
};

export default mongoose;
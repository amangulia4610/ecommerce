import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
if(!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
}
export default connectDB;
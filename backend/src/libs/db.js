import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("database url:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

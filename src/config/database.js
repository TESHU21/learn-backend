import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "test"
        ? process.env.MONGODB_URI_TEST
        : process.env.MONGODB_URI;
    if (!uri) {
      console.log("⚠️  MONGODB_URI is not defined in .env file");
      return false;
    }

    const connectionInstance = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 30000,
    });

    console.log(
      `✅ MongoDB Connected! Host: ${connectionInstance.connection.host}`
    );
    return true;
  } catch (error) {
    console.log("❌ MongoDB Connection failed:", error.message);
    console.log(
      "💡 Tip: Check your internet connection and MongoDB Atlas settings"
    );
    console.log("💡 The server will continue without database connection");
    return false;
  }
};

export default connectDB;

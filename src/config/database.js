import mongoose from "mongoose"

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.log("⚠️  MONGODB_URI is not defined in .env file");
            return false;
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        
        console.log(`✅ MongoDB Connected! Host: ${connectionInstance.connection.host}`);
        return true;
    } catch (error) {
        console.log("❌ MongoDB Connection failed:", error.message);
        console.log("💡 Tip: Check your internet connection and MongoDB Atlas settings");
        console.log("💡 The server will continue without database connection");
        return false;
    }
}

export default connectDB
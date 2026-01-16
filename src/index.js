import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";
import connectDB from "./config/database.js";

const startServer = async () => {
  try {
    // Try to connect to database (server will start even if this fails)
    const dbConnected = await connectDB();
    if (!dbConnected) {
      console.log("⚠️  Starting server without database connection...");
    }

    app.on("error", (error) => {
      console.log("ERROR", error);
    });

    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

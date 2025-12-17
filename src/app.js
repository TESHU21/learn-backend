import express from "express";
import userRouter from "./routes/user.route.js";  // Make sure the path is correct

const app = express();

app.use(express.json());  // Middleware to parse JSON bodies

// Mount the user routes to /api/v1/users
app.use("/api/v1/users", userRouter);  // Ensure the base path is correct

export default app;

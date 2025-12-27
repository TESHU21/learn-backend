import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/user.route.js"; // Make sure the path is correct
import postRouter from "./routes/post.route.js";
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const allowedorigins = ["http://localhost:3000", "http://localhost:4000"];
app.use(helmet()); // protect jwt  headers
app.use(
  cors({
    origin: allowedorigins,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Mount the user routes to /api/v1/users
app.use("/api/v1/users", userRouter); // Ensure the base path is correct
app.use("/api/v1/posts", postRouter); // Ensure the base path is correct

export default app;

import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/user.route.js"; // Make sure the path is correct
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import likesRouter from "./routes/likes.route.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import httpLogger from "./middlewares/httpLogger.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const allowedorigins = ["http://localhost:3000", "http://localhost:4000"];
if (process.env.NODE_ENV !== "test") {
  app.use(httpLogger); // log all requests
}
app.use(helmet()); // protect jwt  headers
app.use(
  cors({
    origin: allowedorigins,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount the user routes to /api/v1/users
app.use("/api/v1/users", userRouter); // Ensure the base path is correct

app.use("/api/v1/posts", postRouter); // Ensure the base path is correct
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/likes", likesRouter);
app.use(globalErrorHandler); // this must be last

export default app;

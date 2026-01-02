import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  deleteAllPosts,
  approvePost,
  rejectedPost,
  getSinglePost,
} from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validateRequest } from "../middlewares/validate.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";

const router = Router();
router.route("/create").post(
  authenticate,
  validateRequest(createPostSchema),
  authorizeRoles("user", "admin"),
  createPost
);
router.route("/").get(authenticate, getPosts);
router.route("/:id").get(getSinglePost);
router
  .route("/update/:id")
  .patch(validateRequest(updatePostSchema), updatePost);
router.route("/delete/:id").delete(authenticate, authorizeRoles("user", "admin"), deletePost);
router
  .route("/deletea")
  .delete(authenticate, authorizeRoles("admin"), deleteAllPosts);
router
  .route("/approve/:id")
  .patch(authenticate, authorizeRoles("admin"), approvePost);
router
  .route("/reject/:id")
  .patch(authenticate, authorizeRoles("admin"), rejectedPost);
export default router;

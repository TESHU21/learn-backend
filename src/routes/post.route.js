import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getSinglePost,
} from "../controllers/post.controller.js";
import { validateRequest } from "../middlewares/validate.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";

const router = Router();
router.route("/create").post(validateRequest(createPostSchema), createPost);
router.route("/").get(getPosts);
router.route("/:id").get(getSinglePost);
router
  .route("/update/:id")
  .patch(validateRequest(updatePostSchema), updatePost);
router.route("/delete/:id").delete(deletePost);
export default router;

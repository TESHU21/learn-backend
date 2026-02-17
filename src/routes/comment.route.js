import { Router } from "express";
import { commentSchema } from "../schemas/comment.schema.js";
import {
  addComment,
  getAllCommentByPost,
  editComment,
  getSingleComment,
  deleteSingleComment,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validateRequest } from "../middlewares/validate.js";
const router = Router();
router
  .route("/:postId")
  .post(
    authenticate,
    validateRequest(commentSchema),
    authorizeRoles("user"),
    addComment
  );
// fetch all comment by PostId
router
  .route("/post/:postId")
  .get(authenticate, authorizeRoles("user", "admin"), getAllCommentByPost);
// Edit a specific comment by commentId
router
  .route("/:commentId")
  .patch(authenticate, authorizeRoles("user", "admin"), editComment);
// Retrive a specific comment by ID
router
  .route("/:commentId")
  .get(authenticate, authorizeRoles("user", "admin"), getSingleComment);

// delete a specific comment by commentId
router
  .route("/:commentId")
  .delete(authenticate, authorizeRoles("user", "admin"), deleteSingleComment);
export default router;

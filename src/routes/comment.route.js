import { Router } from "express";
import { commentSchema } from "../schemas/comment.schema.js";
import {
  addComment,
  getAllCommentByPost,
  editComment,
  deleteSingleComment,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validateRequest } from "../middlewares/validate.js";
const router = Router();
router
  .route("/")
  .post(
    authenticate,
    validateRequest(commentSchema),
    authorizeRoles("user"),
    addComment
  );
// fetch a comment by PostId
router
  .route("/:postId")
  .get(authenticate, authorizeRoles("user", "admin"), getAllCommentByPost);
// Edit a post
router
  .route("/:id")
  .patch(authenticate, authorizeRoles("user", "admin"), editComment);
router
  .route("/:id")
  .delete(authenticate, authorizeRoles("user", "admin"), deleteSingleComment);
export default router;

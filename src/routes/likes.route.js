import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  reactPost,
  removeReaction,
  getReactionstats,
} from "../controllers/likes.controrller.js";
const router = Router();
router.route("/:postId").post(authenticate, authorizeRoles("user"), reactPost);
router
  .route("/:postId")
  .delete(authenticate, authorizeRoles("user"), removeReaction);
router
  .route("/:postId")
  .get(authenticate, authorizeRoles("user", "admin"), getReactionstats);

export default router;

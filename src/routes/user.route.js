import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutuser,
} from "../controllers/user.controller.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/login").post(loginUser);
router.post("/logout", logoutuser);
export default router;

import { Router } from "express";
import {
  login,
  logout,
  profile,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(protect, logout);
router.route("/profile").get(protect, profile);
router.route("/update-profile").patch(protect, updateProfile);

export default router;

import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAunthenicated from "../middlewares/isAunthenticated.js";
import { singleUpload } from "../middlewares/muller.middleware.js";
const router = express.Router();

router.post("/register",singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAunthenicated, updateProfile);

export default router;

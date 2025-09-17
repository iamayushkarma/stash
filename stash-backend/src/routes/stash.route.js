import { Router } from "express";
import {
  saveStash,
  getCategories,
  getUserStats,
} from "../controllers/stash.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, saveStash);
router.route("/categories").get(verifyJWT, getCategories);
router.route("/getStats").get(verifyJWT, getUserStats);

export default router;

import { Router } from "express";
import {
  saveStash,
  getCategories,
  getAllUserSnippets,
} from "../controllers/stash.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, saveStash);
router.route("/").get(verifyJWT, getAllUserSnippets);
router.route("/categories").get(verifyJWT, getCategories);

export default router;

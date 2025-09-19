import { Router } from "express";
import {
  saveStash,
  getCategories,
  getAllUserSnippets,
  deleteCategory,
} from "../controllers/stash.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, saveStash);
router.route("/").get(verifyJWT, getAllUserSnippets);
router.route("/categories").get(verifyJWT, getCategories);

router.route("/:id").delete(verifyJWT, deleteCategory);

export default router;

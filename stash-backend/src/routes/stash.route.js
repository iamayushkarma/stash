import { Router } from "express";
import {
  saveStash,
  getCategories,
  getAllUserSnippets,
  deleteCategory,
  editSnippet,
} from "../controllers/stash.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, saveStash);
router.route("/").get(verifyJWT, getAllUserSnippets);
router.route("/categories").get(verifyJWT, getCategories);

router.route("/:id").delete(verifyJWT, deleteCategory);
router.route("/:id").put(verifyJWT, editSnippet);

export default router;

import { Router } from "express";
import {
  registerUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";
const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/logout").post(logoutUser);
router.route("/google-login").post(loginWithGoogle);

export default router;

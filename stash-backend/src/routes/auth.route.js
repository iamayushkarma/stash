import { Router } from "express";
import {
  registerUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
  getCurrentUser,
  updateUserAccount,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/google-login").post(loginWithGoogle);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateUserAccount);

export default router;

import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be more than 3 characters")
      .isLength({ max: 20 })
      .withMessage("Username should not be more than 20 characters"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be more than 6 characters")
      .isLength({ max: 20 })
      .withMessage("Password should not be more than 20 characters"),
  ];
};
const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be more than 6 characters")
      .isLength({ max: 20 })
      .withMessage("Password should not be more than 20 characters"),
  ];
};
export { userRegisterValidator, userLoginValidator };

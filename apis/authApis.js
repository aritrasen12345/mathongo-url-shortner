import express from "express";
import { body } from "express-validator";

// Import ErrorHandler Utility Middleware
import { errorHandler } from "../utils/errorHandler.js";

// Import Controllers
import logInController from "../controllers/auth/LoginController.js";
import signUpController from "../controllers/auth/SignUpController.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").normalizeEmail().isEmail().withMessage("Invalid Email"),
    body("password")
      .isStrongPassword({ minLength: 6 })
      .withMessage(
        "Password length should be at least 6 characters and should contains 1 lowercase, 1 uppercase and 1 special character"
      ),
  ],
  errorHandler,
  logInController
);

router.post(
  "/signup",
  [
    body("name")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Name length should be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isStrongPassword({ minLength: 6 })
      .withMessage(
        "Password length should be at least 6 characters and should contains 1 lowercase, 1 uppercase and 1 special character"
      ),
  ],
  errorHandler,
  signUpController
);

export default router;

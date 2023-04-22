import express from "express";
import { body } from "express-validator";

// Import isAuthenticated Middleware
import { isAuthenticated } from "../middlewares/isAuth.js";
// Import ErrorHandler Utility Middleware
import { errorHandler } from "../utils/errorHandler.js";

// Import Controllers
import generateURLController from "../controllers/url/generateURLController.js";
import fetchURLController from "../controllers/url/fetchURLController.js";

const router = express.Router();

router.post(
  "/generate",
  [body("url").isURL().withMessage("Invalid URL")],
  errorHandler,
  isAuthenticated,
  generateURLController
);

router.post(
  "/fetch",
  [body("shorturl").isURL().withMessage("Invalid URL")],
  errorHandler,
  fetchURLController
);

export default router;

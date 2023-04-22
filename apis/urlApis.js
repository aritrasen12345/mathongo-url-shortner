import express from "express";
import { body } from "express-validator";

// Import isAuthenticated Middleware
import { isAuthenticated } from "../middlewares/isAuth.js";
// Import ErrorHandler Utility Middleware
import { errorHandler } from "../utils/errorHandler.js";

// Import Controllers
import urlController from "../controllers/url/urlController.js";

const router = express.Router();

router.post(
  "/fetch",
  [body("url").isURL().withMessage("Invalid URL")],
  errorHandler,
  isAuthenticated,
  urlController
);

// Import Redis Client
import client from "../../redis.js";

//Import Models
import User from "../../models/User.js";
import Shorturl from "../../models/Shorturl.js";

const fetchURLController = async (req, res, next) => {
  try {
    const { shorturl } = req.body;
    // Check if starts with "https://shorturl.in/"

    // Split the unique url part
  } catch (err) {
    next(err);
  }
};

export default fetchURLController;

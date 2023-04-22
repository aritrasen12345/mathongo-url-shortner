// Import Redis Client
import client from "../../redis.js";

//Import Models
import Shorturl from "../../models/Shorturl.js";

const fetchURLController = async (req, res, next) => {
  try {
    const { shorturl } = req.body;
    // Check if starts with "https://shorturl.in/"
    if (!shorturl.startsWith("https://shorturl.in/")) {
      return res.status(404).json({
        status: false,
        message: "WRONG URL FOUND!",
        data: [],
      });
    }

    // Split the unique url part
    const uniqueId = shorturl.replace("https://shorturl.in/", "");

    // If uniqueId's length is not equal to 6 throw error
    if (uniqueId.length !== 6) {
      return res.status(404).json({
        status: false,
        message: "WRONG UNIQUE ID FOUND!",
        data: [],
      });
    }

    // Search the Unique id in Cache
    const fetchedOriginalURLFromCache = await client.get(uniqueId);
    if (fetchedOriginalURLFromCache) {
      return res.status(200).json({
        status: true,
        message: "ORIGINAL URL FETCHED SUCCESSFULLY FROM CACHE!",
        data: fetchedOriginalURLFromCache,
      });
    }

    // If not found in Cache find in DB
    const fetchedOriginalURLFromDB = await Shorturl.findOne({ url: shorturl });
    if (fetchedOriginalURLFromDB) {
      return res.status(200).json({
        status: true,
        message: "ORIGINAL URL FETCHED SUCCESSFULLY FROM DB!",
        data: fetchedOriginalURLFromDB,
      });
    }

    // Not found in Cache nor in DB
    return res.status(404).json({
      status: false,
      message: "ORIGINAL URL NOT FOUND!",
      data: [],
    });
  } catch (err) {
    next(err);
  }
};

export default fetchURLController;

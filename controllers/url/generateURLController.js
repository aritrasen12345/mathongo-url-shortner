// Import Redis Client
import client from "../../redis.js";

// Import nanoid
import generateUniqueId from "../../utils/nanoid.js";

//Import Models
import User from "../../models/User.js";
import Shorturl from "../../models/Shorturl.js";

const generateURLController = async (req, res, next) => {
  try {
    const { url } = req.body;
    const userId = req.userId;

    // Check if User's Count is Greater Than Equal to 10, the throw Error User's Maximum Url Generate Capacity Exceeded.
    const UserKey = JSON.stringify(userId);
    const userCount = await client.get(UserKey);

    if (userCount >= 10) {
      return res.status(404).json({
        status: false,
        message:
          "USER MAXIMUM URL GENERATE CAPACITY EXCEEDED! USER CAN ONLY GENERATE 10 URLS PER 1 HOUR!",
        data: [],
      });
    }

    // Check if the Url is available inside redis cache
    const cacheValue = await client.get(url);

    if (cacheValue) {
      const fetchedShortURL = `https://shorturl.in/${cacheValue}`;

      return res.status(200).json({
        status: true,
        message: "SHORTURL FETCHED FROM CACHE!",
        data: { shortUrl: fetchedShortURL },
      });
    }

    // Else Search in the DataBase
    const foundURL = await Shorturl.findOne({ originalUrl: url });
    if (foundURL) {
      return res.status(201).json({
        status: true,
        message: "SHORTURL FETCHED FROM DB!",
        data: { shortUrl: foundURL.url },
      });
    }

    // If Not found in both cache and DB, Create a new Generated url
    // Generate a 6 digit nanoid
    const uniqueId = generateUniqueId();
    const newShortURL = new Shorturl({
      url: `https://shorturl.in/${uniqueId}`,
      originalUrl: url,
    });

    // Store that inside redis
    await client.set(url, uniqueId);
    await client.set(uniqueId, url);

    // Store that into DB
    await newShortURL.save();

    // Increment User Count in Redis Cache
    const userKey = JSON.stringify(req.userId);
    let userCacheValue = await client.get(userKey);
    userCacheValue++;
    await client.set(userKey, userCacheValue, "KEEPTTL");

    // If everything works fine then return URL Generated Successfully
    return res.status(200).json({
      status: true,
      message: "URL GENERATED SUCCESSFULLY!",
      data: newShortURL,
    });
  } catch (err) {
    next(err);
  }
};

export default generateURLController;

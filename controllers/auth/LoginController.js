import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// Import Redis Client
import client from "../../redis.js";

// Import DB Models
import User from "../../models/User.js";

// Import Config
import config from "../../config/config.js";

const logInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email }).select(
      "_id name email password"
    );

    // If Not found then send "No User Found"
    if (!foundUser) {
      return res.status(404).json({
        status: false,
        message: "USER NOT FOUND!",
        data: [],
      });
    }

    const matchedPassword = await bcrypt.compare(password, foundUser.password);

    // If password doesn't match send Invalid Password
    if (!matchedPassword) {
      return res.status(406).json({
        status: false,
        message: "INVALID PASSWORD!",
        data: [],
      });
    }

    // Sign the token
    const token = JWT.sign({ id: foundUser._id }, config.JWT_ACTIVATE, {
      expiresIn: "7d",
    });

    // Store UserId and Count(default=0) inside redis
    const userKey = JSON.stringify(foundUser._id);

    // Check if It's already there or not
    const foundKey = await client.get(userKey);
    if (!foundKey) {
      await client.set(userKey, 0, "EX", 3600);
    }

    // If everything works fine then return Authentication Successful
    return res.status(200).json({
      status: true,
      message: "LOGIN SUCCESSFUL!",
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};

export default logInController;

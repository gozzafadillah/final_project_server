require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserToken = require("../models/UsersToken.model");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

const generateAccessToken = async ({ userId }) => {
  try {
    const payload = { userId: userId };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );
    const userToken = await UserToken.findOne({ userId: userId });
    if (userToken) await userToken.deleteOne();
    await new UserToken({ userId: userId, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(err);
  }
};

const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  return new Promise((resolve, reject) => {
    UserToken.findOne({ token: refreshToken }, (err, doc) => {
      if (!doc)
        return reject({ error: true, message: "Invalid refresh token" });

      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err)
          return reject({ error: true, message: "Invalid refresh token" });
        resolve({
          tokenDetails,
          error: false,
          message: "Valid refresh token",
        });
      });
    });
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
};

module.exports = {
  authenticateToken,
  generateAccessToken,
  verifyToken,
  verifyRefreshToken,
};

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
require("dotenv").config({
  path: "./src/config/config.env",
});
const VALID_API_KEY = process.env.VALID_API_KEY_B27;

exports.requireApiKey = catchAsyncErrors(async (req, res, next) => {
  const providedKey = req.headers.authorization;
  if (!providedKey || providedKey !== `BOOK ${VALID_API_KEY}`) {
    return res.status(401).json({ error: "Sorry it's not Work this time " });
  }
  next();
});

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const database = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      // Fixed typo: MONGODB_URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.error("Error connecting to db:", error);
    });
};

module.exports = database;

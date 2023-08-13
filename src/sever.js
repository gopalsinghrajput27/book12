const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Errorhander = require("./middlewares/error");
const books = require("./routes/BookRoutes");
const Unit = require("./routes/unitRoutes");
const Topic = require("./routes/topicsRoutes");

const bodyParser = require("body-parser");
const Videos = require("./routes/VideosRoutes");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/", books);
app.use("/", Unit);
app.use("/", Topic);

app.use("/", Videos);
app.use(Errorhander);

module.exports = app;

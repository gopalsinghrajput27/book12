// models/topic.js
const mongoose = require("mongoose");

const videosSchema = new mongoose.Schema({
  VideosID: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Topic Name"],

    maxLength: [20, "Name cannot exceed 10 characters"],
    minLength: [2, "Name should have more than 4 characters"],
  },
  VideosName: {
    type: String,

    required: [true, "Please Enter Your Topic Name"],

    maxLength: [20, "Name cannot exceed 10 characters"],
    minLength: [2, "Name should have more than 4 characters"],
  },
  TopicID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
});

const Videos = mongoose.model("Videos", videosSchema);

module.exports = Videos;

// models/topic.js
const mongoose = require("mongoose");

const videosSchema = new mongoose.Schema({
  VideosID: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Topic Name"],

 
  },
  VideosName: {
    type: String,

    required: [true, "Please Enter Your Topic Name"],

  
  },
  TopicID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
});

const Videos = mongoose.model("Videos", videosSchema);

module.exports = Videos;

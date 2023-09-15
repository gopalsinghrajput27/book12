// models/topic.js
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  TopicName: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Topic Name"],
   
  },
  UnitID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
  ],
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;

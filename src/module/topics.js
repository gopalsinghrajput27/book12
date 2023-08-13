// models/topic.js
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  TopicName: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Topic Name"],
    maxLength: [30, "Name cannot exceed 10 characters"],
    minLength: [4, "Name should have more than 4 characters"],
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

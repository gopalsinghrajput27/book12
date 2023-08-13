const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Topic = require("../module/topics");

exports.createTopics = catchAsyncErrors(async (req, res, next) => {
  const { TopicName } = req.body;
  const UnitID = req.foundUnit._id;

  const topic = new Topic({ TopicName, UnitID });
  const savedTopic = await topic.save();

  res.status(200).json(savedTopic);
});

exports.getAllTopics = catchAsyncErrors(async (req, res, next) => {
  const UnitID = req.foundUnit._id;

  const topics = await Topic.find({ UnitID: UnitID });

  if (!topics) {
    return next(new ErrorHandler("No topics found for this unit", 404));
  }

  const responseData = {
    AllTopic: topics,
  };
  res.status(200).json(responseData);
});

exports.getTopicByName = catchAsyncErrors(async (req, res, next) => {
  const UnitID = req.foundUnit._id;
  const TopicName = req.params.topicName;

  const topic = await Topic.findOne({
    UnitID: UnitID,
    TopicName: { $regex: new RegExp(TopicName, "i") },
  });

  if (!topic) {
    return next(new ErrorHandler("Topic not found", 404));
  }

  res.status(200).json(topic);
});

exports.updateTopic = catchAsyncErrors(async (req, res, next) => {
  const UnitID = req.foundUnit.id;
  const Topics = req.params.topicName;
  const topic = await Topic.findOne({
    UnitID: UnitID,
    TopicName: { $regex: new RegExp(Topics, "i") },
  });
  if (!topic) {
    return next(new ErrorHandler("unit not found", 404));
  }
  const { TopicName } = req.body;
  topic.TopicName = TopicName;
  const updatedTopic = await topic.save();

  res.status(200).json({
    success: true,
    Topic: updatedTopic,
  });
});
exports.deleteTopic = catchAsyncErrors(async (req, res, next) => {
  const UnitID = req.foundUnit._id;
  const TopicName = req.params.topicName;
  const unit = await Topic.findOneAndDelete({
    UnitID: UnitID,
    TopicName: { $regex: new RegExp(TopicName, "i") },
  });
  res.status(200).json({
    success: true,
    message: "Unit Delete Successfully",
  });
});

const Videos = require("../module/videos");

const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createVideos = catchAsyncErrors(async (req, res, next) => {
  const { VideosID, VideosName } = req.body;
  const TopicID = req.foundTopic._id;
  const video = new Videos({ VideosID, VideosName, TopicID });
  const saveVideos = await video.save();
  if (!saveVideos.save()) {
    return next(new ErrorHandler("it's videos Present", 501));
  }
  res.status(201).json({
    success: true,
    saveVideos,
  });
});
exports.getAllvideos = catchAsyncErrors(async (req, res, next) => {
  const TopicID = req.foundTopic._id;
  const video = await Videos.find({ TopicID: TopicID });
  if (!video) {
    return next(new ErrorHandler("videos not found", 404));
  }
  res.status(200).json({
    video,
  });
});

exports.getvideosByName = catchAsyncErrors(async (req, res, next) => {
  try {
    const TopicID = req.foundTopic._id;
    const VideosName = req.params.videosName;

    console.log("Searching for video by name:", VideosName);

    const videos = await Videos.findOne({
      TopicID: TopicID,
      videosName: { $regex: new RegExp(VideosName, "i") },
    });

    console.log("Found video:", videos);

    if (!videos) {
      return next(new ErrorHandler("Video not found", 404));
    }

    res.status(200).json({
      videos,
    });
  } catch (err) {
    return next(err);
  }
});

exports.getvideosUpdata = catchAsyncErrors(async (req, res, next) => {
  const TopicID = req.foundTopic._id;
  const VideoName = req.params.videosName;
  const videos = await Videos.findOne({
    TopicID: TopicID,
    videosName: { $regex: new RegExp(VideoName, "i") },
  });
  if (!videos) {
    return next(new ErrorHandler("videos not found", 404));
  }
  const { VideosId, VideosName } = req.body;
  videos.VideosId = VideosId;
  videos.VideosName = VideosName;
  const updatedVideos = await unit.save();

  res.status(200).json({
    success: true,
    videos: updatedVideos,
  });
});

exports.getvideosDelete = catchAsyncErrors(async (req, res, next) => {
  const TopicID = req.foundTopic._id;
  const VideosName = req.params.videosName;
  const videos = await Videos.findOneAndDelete({
    TopicID: TopicID,
    videosName: { $regex: new RegExp(VideosName, "i") },
  });

  res.status(200).json({
    success: true,
    message: " Delete Successfully",
  });
});

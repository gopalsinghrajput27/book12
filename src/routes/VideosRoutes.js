const express = require("express");

const {
  createVideos,
  getAllvideos,
  getvideosUpdata,
  getvideosDelete,
  getvideosByName,
} = require("../controller/videosController");
const { findTopicByName } = require("../middlewares/MiddlemsresForBooks");
const { requireApiKey } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/:bookName/:unitName/:topicName/new/videos")
  .post(requireApiKey,findTopicByName, createVideos);
router
  .route("/:bookName/:unitName/:topicName/allvideos")
  .get(requireApiKey,findTopicByName, getAllvideos);
router
  .route("/:bookName/:unitName/:topicName/:videosName")
  .get(requireApiKey,findTopicByName, getvideosByName)
  .put(requireApiKey,findTopicByName, getvideosUpdata)
  .delete(requireApiKey,findTopicByName, getvideosDelete);

module.exports = router;

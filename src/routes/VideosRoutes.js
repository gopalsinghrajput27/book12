const express = require("express");

const {
  createVideos,
  getAllvideos,
  getvideosUpdata,
  getvideosDelete,
  getvideosByName,
} = require("../controller/videosController");
const { findTopicByName } = require("../middlewares/MiddlemsresForBooks");

const router = express.Router();

router
  .route("/:bookName/:unitName/:topicName/new/videos")
  .post(findTopicByName, createVideos);
router
  .route("/:bookName/:unitName/:topicName/allvideos")
  .get(findTopicByName, getAllvideos);
router
  .route("/:bookName/:unitName/:topicName/:videosName")
  .get(findTopicByName, getvideosByName)
  .put(findTopicByName, getvideosUpdata)
  .delete(findTopicByName, getvideosDelete);

module.exports = router;

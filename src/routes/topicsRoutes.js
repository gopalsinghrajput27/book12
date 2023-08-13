const express = require("express");
const {
  createTopics,
  getAllTopics,
  getTopicByName,
  updateTopic,
  deleteTopic,
} = require("../controller/topicsControll");
const { findUnitByName } = require("../middlewares/MiddlemsresForBooks");

const router = express.Router();

router
  .route("/:bookName/:unitName/new/topic")
  .post(findUnitByName, createTopics);
router.route("/:bookName/:unitName/allTopic").get(findUnitByName, getAllTopics);
router
  .route("/:bookName/:unitName/:topicName")
  .get(findUnitByName, getTopicByName)
  .put(findUnitByName, updateTopic)
  .delete(findUnitByName, deleteTopic);
module.exports = router;

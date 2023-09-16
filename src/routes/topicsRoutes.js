const express = require("express");
const {
  createTopics,
  getAllTopics,
  getTopicByName,
  updateTopic,
  deleteTopic,
} = require("../controller/topicsControll");
const { findUnitByName } = require("../middlewares/MiddlemsresForBooks");
const { requireApiKey } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/:bookName/:unitName/new/topic")
  .post(requireApiKey,findUnitByName, createTopics);
router.route("/:bookName/:unitName/allTopic").get(requireApiKey,findUnitByName, getAllTopics);
router
  .route("/:bookName/:unitName/:topicName")
  .get(requireApiKey,findUnitByName, getTopicByName)
  .put(requireApiKey,findUnitByName, updateTopic)
  .delete(requireApiKey,findUnitByName, deleteTopic);
module.exports = router;

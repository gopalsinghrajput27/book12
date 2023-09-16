const express = require("express");
const {
  createUnit,
  getAllUnit,
  getUnitByName,
  getUnitUpdata,
  getUnitandDelete,
} = require("../controller/unitController");
const { findBookByName } = require("../middlewares/MiddlemsresForBooks");
const { requireApiKey } = require("../middlewares/auth");
const router = express.Router();

router.route("/:bookName/new/unit").post(requireApiKey,findBookByName, createUnit);
router.route("/:bookName").get(requireApiKey,findBookByName, getAllUnit);
router
  .route("/:bookName/:unitName")
  .get(requireApiKey,findBookByName, getUnitByName)
  .put(requireApiKey,findBookByName, getUnitUpdata)
  .delete(requireApiKey,findBookByName, getUnitandDelete);

module.exports = router;

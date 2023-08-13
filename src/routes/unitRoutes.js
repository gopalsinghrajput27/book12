const express = require("express");
const {
  createUnit,
  getAllUnit,
  getUnitByName,
  getUnitUpdata,
  getUnitandDelete,
} = require("../controller/unitController");
const { findBookByName } = require("../middlewares/MiddlemsresForBooks");

const router = express.Router();

router.route("/:bookName/new/unit").post(findBookByName, createUnit);
router.route("/:bookName").get(findBookByName, getAllUnit);
router
  .route("/:bookName/:unitName")
  .get(findBookByName, getUnitByName)
  .put(findBookByName, getUnitUpdata)
  .delete(findBookByName, getUnitandDelete);

module.exports = router;

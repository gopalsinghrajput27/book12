const express = require("express");

const {
  createBooks,
  getAllBooks,

  getbookUpdata,
  getbookandDelete,

  getbookName,
} = require("../controller/bookController");
const { requireApiKey } = require("../middlewares/auth");
const router = express.Router();

router.route("/Books/new").post(requireApiKey,createBooks);
router.route("/Books").get(requireApiKey,getAllBooks);
router
  .route("/Books/:bookName")
  .get(requireApiKey,getbookName)
  .put(requireApiKey,getbookUpdata)
  .delete(requireApiKey,getbookandDelete);

module.exports = router;

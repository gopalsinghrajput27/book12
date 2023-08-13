const Book = require("../module/Books");
const Unit = require("../module/unit");
const Topic = require("../module/topics");

const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.findBookByName = catchAsyncErrors(async (req, res, next) => {
  const bookName = req.params.bookName; // Use camelCase for variable names

  try {
    const book = await Book.findOne({
      BookName: { $regex: new RegExp(bookName, "i") },
    });

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    req.foundBook = book;

    next();
  } catch (err) {
    return next(err);
  }
});

exports.findUnitByName = catchAsyncErrors(async (req, res, next) => {
  try {
    const BookName = req.params.bookName;

    const book = await Book.findOne({
      BookName: { $regex: new RegExp(BookName, "i") },
    });

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    const UnitName = req.params.unitName;
    console.log(UnitName);

    const unit = await Unit.findOne({
      BookID: book._id,
      UnitName: { $regex: new RegExp(UnitName, "i") },
    });

    if (!unit) {
      return next(new ErrorHandler("Unit not found", 404));
    }

    req.foundUnit = unit;

    next();
  } catch (err) {
    return next(err);
  }
});

const escapeRegExp = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

exports.findTopicByName = catchAsyncErrors(async (req, res, next) => {
  try {
    const bookName = req.params.bookName;
    const unitName = req.params.unitName;
    const TopicName = escapeRegExp(req.params.topicName);

    console.log("Searching for topic:", bookName, unitName, TopicName);

    if (!bookName || !unitName || !TopicName) {
      return next(new ErrorHandler("Invalid request parameters", 400));
    }

    const book = await Book.findOne({
      BookName: { $regex: new RegExp(escapeRegExp(bookName), "i") },
    });

    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
    }

    const unit = await Unit.findOne({
      BookID: book._id,
      UnitName: { $regex: new RegExp(escapeRegExp(unitName), "i") },
    });

    if (!unit) {
      return next(new ErrorHandler("Unit not found", 404));
    }

    const topic = await Topic.findOne({
      UnitID: unit._id,
      TopicName: { $regex: new RegExp(TopicName, "i") },
    });

    if (!topic) {
      return next(new ErrorHandler("Topic not found", 404));
    }

    req.foundTopic = topic;

    console.log("Found topic:", topic);

    next();
  } catch (err) {
    return next(err);
  }
});

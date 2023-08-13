const Unit = require("../module/unit");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createUnit = catchAsyncErrors(async (req, res, next) => {
  try {
    const { UnitName, UnitNumber } = req.body;

    if (!req.foundBook) {
      return next(new ErrorHandler("Book not found", 404));
    }

    const BookID = req.foundBook._id;

    const unit = new Unit({ UnitName, UnitNumber, BookID });
    const savedUnit = await unit.save();

    res.status(201).json({ Unit: savedUnit });
  } catch (err) {
    // Handle errors that occur during unit creation or saving
    return next(err);
  }
});

exports.getAllUnit = catchAsyncErrors(async (req, res, next) => {
  const BookID = req.foundBook._id;
  const unit = await Unit.find({ BookID: BookID });

  if (!unit) {
    return next(new ErrorHandler("books not found", 404));
  }
  res.status(200).json({
    unit,
  });
});

exports.getUnitByName = catchAsyncErrors(async (req, res, next) => {
  const BookID = req.foundBook._id;
  const UnitName = req.params.unitName;
  const unit = await Unit.findOne({
    BookID: BookID,
    UnitName: { $regex: new RegExp(UnitName, "i") },
  });

  if (!unit) {
    return next(new ErrorHandler("unit not found", 404));
  }
  res.status(200).json({
    unit,
  });
});

exports.getUnitUpdata = catchAsyncErrors(async (req, res, next) => {
  const BookID = req.foundBook.id;
  const unit = await Unit.findOne({
    BookID: BookID,
    UnitName: req.params.unitName,
  });
  if (!unit) {
    return next(new ErrorHandler("unit not found", 404));
  }
  const { UnitName, UnitNumber } = req.body;
  unit.UnitName = UnitName;
  unit.UnitNumber = UnitNumber;
  const updatedUnit = await unit.save();

  res.status(200).json({
    success: true,
    unit: updatedUnit,
  });
});

exports.getUnitandDelete = catchAsyncErrors(async (req, res, next) => {
  const BookID = req.foundBook._id;
  const UnitName = req.params.unitName;
  const unit = await Unit.findOneAndDelete({
    BookID: BookID,
    UnitName: { $regex: new RegExp(UnitName, "i") },
  });
  res.status(200).json({
    success: true,
    message: "Unit Delete Successfully",
  });
});

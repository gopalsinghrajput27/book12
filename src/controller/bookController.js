const Book = require("../module/Books");

const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createBooks = catchAsyncErrors(async (req, res, next) => {
  const { BookName, img } = req.body;
  const book = new Book({ BookName, img });

  const existingBook = await Book.findOne({ BookName });
  if (existingBook) {
    throw new Error("Duplicate book name entered");
  }

  const saveBook = await book.save();

  res.status(201).json({
    success: true,
    book: saveBook,
  });
  next(err);
});

exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.find();

  if (!book) {
    return next(new ErrorHandler("books not found", 404));
  }
  res.status(200).json({
    book,
  });
});

exports.getbookName = catchAsyncErrors(async (req, res, next) => {
  const bookName = req.params.bookName;

  const book = await Book.findOne({
    BookName: { $regex: new RegExp(bookName, "i") },
  });

  if (!bookName) {
    return next(new ErrorHandler("books not found", 404));
  }
  res.status(200).json(book);
});

exports.getbookUpdata = catchAsyncErrors(async (req, res, next) => {
  const BookNames = req.params.bookName;

  const book = await Book.findOne({
    BookName: { $regex: new RegExp(BookNames, "i") },
  });

  if (!book) {
    return next(new ErrorHandler("books not found", 404));
  }
  const { BookName, img } = req.body;
  book.BookName = BookName;
  book.img = img;
  const updateBook = await book.save();
  res.status(200).json({
    success: true,
    book: updateBook,
  });
});

exports.getbookandDelete = catchAsyncErrors(async (req, res, next) => {
  const BookNames = req.params.bookName;

  const book = await Book.findOneAndDelete({
    BookName: { $regex: new RegExp(BookNames, "i") },
  });

  if (!book) {
    return next(new ErrorHandler("books not found", 404));
  }
  res.status(200).json({
    success: true,
    message: " Delete Successfully",
  });
});

// models/book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  BookName: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Name"],
    maxLength: [10, "Name cannot exceed 10 characters"],
    minLength: [2, "Name should have more than 4 characters"],
  },
  img: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your ImageUrl"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

// models/unit.js
const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  UnitName: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Unit Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  UnitNumber: {
    type: String,
    unique: true,
    required: [true, "please Enter You Unit Number"],
  },
  BookID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;

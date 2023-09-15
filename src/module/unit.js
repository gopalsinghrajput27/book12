// models/unit.js
const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  UnitName: {
    type: String,

    required: [true, "Please Enter Your Unit Name"],
   
    
  },
  UnitNumber: {
    type: String,
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

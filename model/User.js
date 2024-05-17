const { Schema, model } = require("mongoose");
const validator = require("validator");

const newSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your First Name"],
      trim: true,
      maxlength: [30, "Name cannot exceed 30 characters"],
      minlength: [3, "Name should have more than 3 characters"],
      uppercase: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email ID"],
      trim: true,
      validate: [validator.isEmail, "Please Enter a Valid Email ID"],
      unique: [true, "Email already exists"],
      lowercase: true,
    },
    phone: {
      type: Number,
      required: [true, "Please Enter Your Phone No."],
      unique: [true, "The Number is Already in Use"],
      trim: true,
    },
    dob: {
      type: String,
      required: [true, "Please Enter Your Date Of Birth"],
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("newaccess", newSchema, "newaccess");

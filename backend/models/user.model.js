import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  addharCardNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 12,
    maxlength: 12,
    validate: {
      validator: function (v) {
        return /^\d{12}$/.test(v);
      },
      message: "Aadhar Card Number must be exactly 12 digits",
    },
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

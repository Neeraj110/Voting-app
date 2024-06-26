import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.header("Authorization")?.startsWith("Bearer ")) {
    token = req.header("Authorization").split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(401, "Unauthorized request, token not found"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return next(new ApiError(401, "Unauthorized request, user not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return next(new ApiError(401, error.message || "Invalid access token"));
  }
});

export default protect;

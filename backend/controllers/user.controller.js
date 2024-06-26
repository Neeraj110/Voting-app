import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const options = {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};



const genrateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const token = user.generateAccessToken();

    user.token = token;
    await user.save({ validateBeforeSave: false });

    return token;
  } catch (error) {
    throw new ApiError(500, error.message, "something went wrong in tokens");
  }
};

export const signup = asyncHandler(async (req, res) => {
  try {
    const data = req.body;

    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Only one Admin exists in the system"));
    }

    const existed = await User.findOne({ email: data.email });
    if (existed) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User already exists"));
    }

    const user = new User(data);
    await user.save();

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User not created successfully"));
    }

    const token = await genrateTokens(user._id);

    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          200,
          { data: createdUser, token: token },
          "User registered successfully"
        )
      );
  } catch (error) {
    console.error("Error in signup:", error);
    throw new ApiError(500, error.message);
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { addharCardNumber, password } = req.body;

    if (!addharCardNumber || !password) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            "Please provide addharCardNumber and password"
          )
        );
    }
    const user = await User.findOne({ addharCardNumber });

    if (!user) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "User not found with this addharCardNumber")
        );
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, {}, "Password is incorrect, please try again")
        );
    }

    const token = await genrateTokens(user._id);

    if (!token) {
      throw new ApiError(400, "Something went wrong while generating token");
    }

    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          200,
          { data: user, token },
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.error("Error in login:", error);
    throw new ApiError(500, error.message, "Error in login:");
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          token: 1,
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .clearCookie("token")
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    throw new ApiError(500, error.message, "Error in logout");
  }
});

export const profile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "user not found");
  }
  const token = await genrateTokens(user._id);

  if (!token) {
    throw new ApiError(400, "Something went wrong while generating token");
  }

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(200, { data: user, token }, "User fetched successfully")
    );
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, " wrong password ");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;
    const { fullname, username, aadharCardNumber } = req.body;

    if (!userId) {
      throw new ApiError(404, "User not found");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          fullname,
          username,
          aadharCardNumber,
        },
      },
      {
        new: true,
      }
    );

    if (!user) {
      throw new ApiError(400, "User not updated");
    }

    const token = await genrateTokens(userId);

    if (!token) {
      throw new ApiError(400, "Something went wrong while generating token");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: user, token },
          "Profile updated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message, "Error in update profile");
  }
});

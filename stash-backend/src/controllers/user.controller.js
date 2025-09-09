import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    // finding user by id and asiginig then tokens
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // for existing user
  const existingUser = await User.findOne({
    $or: [{ email }, { password }],
  });
  if (existingUser) {
    throw new ApiError(
      409,
      "User with same email or username already exists",
      []
    );
  }
  // creating user id not found in db
  const user = await User.create({
    username,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-refreshToken -password"
  );

  if (!createdUser) {
    throw new ApiError(505, "Something went wrong while user registration");
  }
  // sending response to user except refreshToken and password(hashed)
  return res.status(201).json({
    statusCode: 201,
    success: true,
    message: "User registration successful!",
    data: { user: createdUser },
  });
});

export { registerUser, generateAccessAndRefreshToken };

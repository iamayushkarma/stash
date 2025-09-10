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
// user registration
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // for existing user
  const existingUser = await User.findOne({
    $or: [{ email }, { password }],
  });
  if (existingUser) {
    throw new ApiError(
      409,
      "This email or username is already registered. Please try a different one.",
      []
    );
  }
  // creating user id not found in db
  const user = await User.create({
    username,
    email,
    password,
  });
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
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
    data: { user: createdUser, accessToken, refreshToken },
  });
});
// user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required!");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(
      400,
      "No account found with the provided email. Please check your email or register for a new account."
    );
  }
  // checking user's password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Incorrect password. Please try again.");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-refreshToken -password"
  );

  if (!loggedInUser) {
    throw new ApiError(505, "Something went wrong while user login");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully!"
      )
    );
});

export { registerUser, loginUser };

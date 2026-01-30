import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
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
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ApiError(
      409,
      "This email or username is already registered. Please try a different one.",
      []
    );
  }
  const user = await User.create({
    username,
    email,
    password,
    authType: "local",
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

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
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
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
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

// user login with google
const loginWithGoogle = asyncHandler(async (req, res) => {
  try {
    console.log("📱 Google login request received:", req.body);
    const { name, email, googleId } = req.body;
    if (!email || !googleId) {
      throw new ApiError(400, "Email and Google ID are required!");
    }

    let user = await User.findOne({
      $or: [{ email }, { googleId }],
    });

    if (!user) {
      user = await User.create({
        username: name || email.split("@")[0],
        email,
        authType: "google",
        googleId,
      });
      console.log("✅ New user created:", user._id);
    } else {
      console.log("✅ Existing user found:", user._id);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const loggedInUser = await User.findById(user._id).select(
      "-refreshToken -password"
    );
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        statusCode: 200,
        success: true,
        message: "User logged in successfully via Google!",
        data: { user: loggedInUser, accessToken, refreshToken },
      });
  } catch (error) {
    console.error("🔥 Google login error:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Google login failed!",
      statusCode: error.statusCode || 500,
    });
  }
});

// user logout
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully!"));
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully!"));
});

// Update user account
const updateUserAccount = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "At least one field is required to update");
  }

  if (req.user.authType === "google" && email) {
    throw new ApiError(
      400,
      "Email cannot be updated for Google authenticated accounts"
    );
  }

  if (email || username) {
    const existingUser = await User.findOne({
      $and: [
        { _id: { $ne: req.user._id } },
        {
          $or: [email ? { email } : {}, username ? { username } : {}].filter(
            (obj) => Object.keys(obj).length > 0
          ),
        },
      ],
    });

    if (existingUser) {
      throw new ApiError(
        409,
        "Email or username already taken by another user"
      );
    }
  }

  const updateData = {};
  if (username) updateData.username = username;
  if (email && req.user.authType !== "google") updateData.email = email;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updateData },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account updated successfully!"));
});

export {
  registerUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
  getCurrentUser,
  updateUserAccount,
};

// import { User } from "../models/user.model.js";
// import { ApiResponse } from "../utils/api-response.js";
// import { ApiError } from "../utils/api-error.js";
// import { asyncHandler } from "../utils/async-handler.js";

// const generateAccessAndRefreshToken = async (userId) => {
//   try {
//     // finding user by id and asiginig then tokens
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(
//       500,
//       "Something went wrong while generating access and refresh tokens"
//     );
//   }
// };
// // user registration
// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;
//   // for existing user
//   const existingUser = await User.findOne({
//     $or: [{ email }, { username }],
//   });
//   if (existingUser) {
//     throw new ApiError(
//       409,
//       "This email or username is already registered. Please try a different one.",
//       []
//     );
//   }
//   // creating user id if not found in db
//   const user = await User.create({
//     username,
//     email,
//     password,
//     authType: "local",
//   });
//   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//     user._id
//   );
//   const createdUser = await User.findById(user._id).select(
//     "-refreshToken -password"
//   );

//   if (!createdUser) {
//     throw new ApiError(505, "Something went wrong while user registration");
//   }
//   // sending response to user except refreshToken and password(hashed)
//   return res.status(201).json({
//     statusCode: 201,
//     success: true,
//     message: "User registration successful!",
//     data: { user: createdUser, accessToken, refreshToken },
//   });
// });
// // user login
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email) {
//     throw new ApiError(400, "Email is required!");
//   }
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new ApiError(
//       400,
//       "No account found with the provided email. Please check your email or register for a new account."
//     );
//   }
//   // checking user's password
//   const isPasswordValid = await user.isPasswordCorrect(password);
//   if (!isPasswordValid) {
//     throw new ApiError(400, "Incorrect password. Please try again.");
//   }
//   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//     user._id
//   );
//   const loggedInUser = await User.findById(user._id).select(
//     "-refreshToken -password"
//   );

//   if (!loggedInUser) {
//     throw new ApiError(505, "Something went wrong while user login");
//   }
//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         { user: loggedInUser, accessToken, refreshToken },
//         "User logged in successfully!"
//       )
//     );
// });
// // user login with google
// const loginWithGoogle = asyncHandler(async (req, res) => {
//   try {
//     console.log("req.body:", req.body);
//     const { name, email, googleId } = req.body;
//     if (!email) {
//       throw new ApiError(400, "Email is required!");
//     }
//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({
//         username: name,
//         email,
//         authType: "google",
//         googleId,
//       });
//     }
//     const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//       user._id
//     );

//     const createdUser = await User.findById(user._id).select("-refreshToken");

//     return res.status(200).json({
//       statusCode: 200,
//       success: true,
//       message: "User logged in successfully via Google!",
//       data: { user: createdUser, accessToken, refreshToken },
//     });
//   } catch (error) {
//     console.error("🔥 Google login error details:", {
//       message: error.message,
//       stack: error.stack,
//       errors: error.errors,
//     });

//     res.status(500).json({
//       success: false,
//       message: "User registration failed!",
//       error: error.message,
//     });
//   }
// });
// // user logout
// const logoutUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndUpdate(
//     req.user._id,
//     {
//       $unset: { refreshToken: 1 },
//     },
//     { new: true }
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged out successfully!"));
//   // .json({
//   //   statusCode: 200,
//   //   success: true,
//   //   message: "User logged out successfully!",
//   // });
// });

// export { registerUser, loginUser, loginWithGoogle, logoutUser };

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

  // Set cookies for better mobile compatibility
  // const options = {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  // };
  const options = {
    httpOnly: true,
    secure: true, // MUST be true
    sameSite: "none", // MUST be none for OAuth
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

// user login with google - FIXED VERSION
const loginWithGoogle = asyncHandler(async (req, res) => {
  try {
    console.log("📱 Google login request received:", req.body);

    const { name, email, googleId } = req.body;

    if (!email || !googleId) {
      throw new ApiError(400, "Email and Google ID are required!");
    }

    // Try to find user by email or googleId
    let user = await User.findOne({
      $or: [{ email }, { googleId }],
    });

    // Create new user if doesn't exist
    if (!user) {
      user = await User.create({
        username: name || email.split("@")[0], // Fallback to email username if name not provided
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

    // Return proper error response
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

export { registerUser, loginUser, loginWithGoogle, logoutUser };

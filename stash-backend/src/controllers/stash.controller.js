import { Stash } from "../models/stash.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

// This MUST be at the top
dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const saveStash = asyncHandler(async (req, res) => {
  try {
    const { title, category, type, content, note, sourceUrl } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res
        .status(400)
        .json({ message: "Please select some content. It cannot be empty." });
    }
    if (!title || !category || !type || !sourceUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    let finalContent = content;
    if (type === "image") {
      const uploadResult = await cloudinary.uploader.upload(content, {
        folder: "stashes",
      });
      finalContent = uploadResult.secure_url;
    }

    const newStash = await Stash.create({
      user: userId,
      title,
      category,
      type,
      content: finalContent,
      note,
      sourceUrl,
    });

    // Send a success response back to the extension
    res
      .status(201)
      .json({ message: "Stash saved successfully!", data: newStash });
  } catch (error) {
    console.error("Error saving stash:", error);
    res.status(500).json({ message: "Server error while saving stash" });
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const categories = await Stash.distinct("category", { user: userId });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getUserStats = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const [totalStashes, imageCount, userCategories] = await Promise.all([
      // Count stashes where the 'user' field matches the logged-in user's ID
      Stash.countDocuments({ user: userId }),

      // Count images where the 'user' matches AND the type is 'image'
      Stash.countDocuments({ user: userId, type: "image" }),

      // Get distinct categories only from stashes belonging to this user
      Stash.distinct("category", { user: userId }),
    ]);

    const textCount = totalStashes - imageCount;
    const stats = {
      totalStashes: totalStashes,
      totalImages: imageCount,
      totalTexts: textCount,
      uniqueCategories: userCategories.length,
    };

    res.status(200).json(stats);
  } catch (error) {
    console.log("error fetching stats", error);
  }
});

export { saveStash, getCategories, getUserStats };

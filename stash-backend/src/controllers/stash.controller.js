import { Stash } from "../models/stash.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary
import dotenv from "dotenv";
import { io } from "../index.js";

// This MUST be at the top
dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// this api call saves user snippet data from the extension popup and saves it to mongoDB
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
    io.emit("newStash", newStash); // 🔥 send to all connected clients

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

    // io.emit("newStash", categories); // 🔥 send to all connected clients
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getAllUserSnippets = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const allUsersSavedData = await Stash.find({ user: userId }).sort({
    createdAt: -1,
  });
  // io.emit("newStash", allUsersSavedData);
  res.status(200).json(allUsersSavedData);
});

export { saveStash, getCategories, getAllUserSnippets };
// getAllUserSnippets;

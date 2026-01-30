import { Stash } from "../models/stash.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

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

    // const { content } = req.body;

    console.log("Received content:", content);
    console.log("Received length:", content.length);
    console.log("Content type:", typeof content);

    // Before saving to DB
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
    console.log("About to save:", finalContent);
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

    // io.emit("newStash", categories); // 🔥 send to all connected clients
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getAllUserSnippets = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Get the search term from the URL query, if it exists
  const { search } = req.query;

  // Start with a base filter to only get the logged-in user's data
  const filter = { user: userId };

  // If a search term was provided, add the search logic to the filter
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  // Use the final filter to query the database
  const snippets = await Stash.find(filter).sort({ createdAt: -1 });

  res.status(200).json(snippets);
});

// get user text snippets info only
const getTextSnippets = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const textSnippets = await Stash.find(
    { user: userId, type: "text" },
    {
      _id: 1,
      user: 1,
      title: 1,
      category: 1,
      type: 1,
      content: 1,
      note: 1,
      sourceUrl: 1,
      createdAt: 1,
      updatedAt: 1,
    }
  ).sort({ createdAt: -1 });
  res.status(200).json(textSnippets);
});
// get user image snippets info only
const getImageSnippets = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const imageSnippets = await Stash.find(
    { user: userId, type: "image" },
    {
      _id: 1,
      user: 1,
      title: 1,
      category: 1,
      type: 1,
      content: 1,
      note: 1,
      sourceUrl: 1,
      createdAt: 1,
      updatedAt: 1,
    }
  ).sort({ createdAt: -1 });
  res.status(200).json(imageSnippets);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Stash.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "Item deleted successfully", item: deletedItem });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: err.message });
  }
});

const editSnippet = asyncHandler(async (req, res) => {
  const { title, category, content, note, sourceUrl } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const updateSnippet = await Stash.findByIdAndUpdate(
    { _id: id, user: userId },
    { $set: { title, category, content, note, sourceUrl } },
    { new: true, runValidators: true }
  );
  if (!updateSnippet) {
    return res
      .status(404)
      .json({ message: "Stash not found or user not authorized" });
  }
  res
    .status(200)
    .json({ message: "Stash updated successfully!", data: updateSnippet });
});

export {
  saveStash,
  getCategories,
  getAllUserSnippets,
  deleteCategory,
  editSnippet,
  getTextSnippets,
  getImageSnippets,
};
// getAllUserSnippets;

import mongoose from "mongoose";

const stashSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // This field will be either 'text' or 'image'
    type: {
      type: String,
      required: true,
      enum: ["text", "image"],
    },
    sourceUrl: {
      type: String,
      required: true,
    },
    // This field will store either the selected text or the image URL
    content: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Stash = mongoose.model("Stash", stashSchema, "snippets");

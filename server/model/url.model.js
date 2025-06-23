import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const urlModel = mongoose.model("Urls", UrlSchema);

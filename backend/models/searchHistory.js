import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    lat: Number,
    lon: Number,
    temperature: Number,
    condition: String,
    searchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

searchHistorySchema.index({ searchedAt: -1 });

export default mongoose.model("SearchHistory", searchHistorySchema);
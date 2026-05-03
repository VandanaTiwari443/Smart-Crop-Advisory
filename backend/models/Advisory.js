const mongoose = require("mongoose");

const advisorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    soilType: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    waterAvailability: {
      type: String,
      required: true,
    },
    landArea: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    recommendedCrop: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    fertilizer: {
      type: String,
      required: true,
    },
    waterNeed: {
      type: String,
      required: true,
    },
    estimatedProfit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advisory", advisorySchema);
const Advisory = require("../models/Advisory");

// Crop recommendation logic
const getRecommendation = ({ soilType, season, waterAvailability }) => {
  if (
    soilType === "Loamy" &&
    season === "Rabi" &&
    waterAvailability === "Medium"
  ) {
    return {
      recommendedCrop: "Wheat",
      reason: "Loamy soil and Rabi season are ideal for wheat cultivation.",
      fertilizer: "NPK + Urea",
      waterNeed: "Moderate irrigation required",
      estimatedProfit: 50000,
    };
  }

  if (
    soilType === "Loamy" &&
    season === "Rabi" &&
    waterAvailability === "Low"
  ) {
    return {
      recommendedCrop: "Gram",
      reason: "Loamy soil with low water in Rabi season is suitable for gram.",
      fertilizer: "DAP + Organic compost",
      waterNeed: "Low to moderate irrigation",
      estimatedProfit: 45000,
    };
  }

  if (
    soilType === "Loamy" &&
    season === "Kharif" &&
    waterAvailability === "High"
  ) {
    return {
      recommendedCrop: "Rice",
      reason:
        "Loamy soil with high water in Kharif season is suitable for rice.",
      fertilizer: "DAP + Potash",
      waterNeed: "High irrigation required",
      estimatedProfit: 60000,
    };
  }

  if (
    soilType === "Alluvial" &&
    season === "Kharif" &&
    waterAvailability === "High"
  ) {
    return {
      recommendedCrop: "Rice",
      reason:
        "Alluvial soil with high water availability is suitable for rice.",
      fertilizer: "DAP + Potash",
      waterNeed: "High irrigation required",
      estimatedProfit: 65000,
    };
  }

  if (
    soilType === "Alluvial" &&
    season === "Rabi" &&
    waterAvailability === "Medium"
  ) {
    return {
      recommendedCrop: "Wheat",
      reason: "Alluvial soil in Rabi season supports wheat cultivation.",
      fertilizer: "NPK + Urea",
      waterNeed: "Moderate irrigation required",
      estimatedProfit: 52000,
    };
  }

  if (
    soilType === "Black" &&
    season === "Kharif" &&
    waterAvailability === "High"
  ) {
    return {
      recommendedCrop: "Cotton",
      reason: "Black soil is highly suitable for cotton farming.",
      fertilizer: "NPK + Organic compost",
      waterNeed: "Moderate to high irrigation",
      estimatedProfit: 70000,
    };
  }

  if (
    soilType === "Black" &&
    season === "Kharif" &&
    waterAvailability === "Low"
  ) {
    return {
      recommendedCrop: "Soybean",
      reason: "Black soil with lower water in Kharif is suitable for soybean.",
      fertilizer: "Phosphorus-rich fertilizer",
      waterNeed: "Low to moderate irrigation",
      estimatedProfit: 48000,
    };
  }

  if (
    soilType === "Black" &&
    season === "Rabi" &&
    waterAvailability === "Medium"
  ) {
    return {
      recommendedCrop: "Mustard",
      reason: "Black soil in Rabi season supports mustard cultivation.",
      fertilizer: "Nitrogen + Sulphur",
      waterNeed: "Moderate irrigation",
      estimatedProfit: 53000,
    };
  }

  if (soilType === "Red" && season === "Zaid" && waterAvailability === "Low") {
    return {
      recommendedCrop: "Bajra",
      reason: "Red soil and low water availability suit Bajra well.",
      fertilizer: "Organic manure + Nitrogen",
      waterNeed: "Low irrigation",
      estimatedProfit: 42000,
    };
  }

  if (soilType === "Red" && season === "Zaid" && waterAvailability === "High") {
    return {
      recommendedCrop: "Groundnut",
      reason:
        "Red soil with better water support in Zaid season can suit groundnut.",
      fertilizer: "Gypsum + Phosphorus",
      waterNeed: "Moderate irrigation",
      estimatedProfit: 47000,
    };
  }

  if (
    soilType === "Red" &&
    season === "Kharif" &&
    waterAvailability === "Medium"
  ) {
    return {
      recommendedCrop: "Millet",
      reason:
        "Red soil with medium water in Kharif season is suitable for millet.",
      fertilizer: "Organic compost + Nitrogen",
      waterNeed: "Moderate irrigation",
      estimatedProfit: 43000,
    };
  }

  return {
    recommendedCrop: "Maize",
    reason: "Based on the given data, maize is a flexible and safe option.",
    fertilizer: "Nitrogen-rich fertilizer",
    waterNeed: "Moderate irrigation",
    estimatedProfit: 40000,
  };
};

// Create advisory
const createAdvisory = async (req, res) => {
  try {
    const { soilType, season, waterAvailability, landArea, budget } = req.body;

    if (
      !soilType ||
      !season ||
      !waterAvailability ||
      landArea === undefined ||
      budget === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const recommendation = getRecommendation({
      soilType,
      season,
      waterAvailability,
    });

    const advisory = await Advisory.create({
      user: req.user.id,
      soilType,
      season,
      waterAvailability,
      landArea,
      budget,
      ...recommendation,
    });

    res.status(201).json(advisory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's advisories
const getMyAdvisories = async (req, res) => {
  try {
    const advisories = await Advisory.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(advisories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const advisories = await Advisory.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    const totalAdvisories = advisories.length;
    const latest = advisories[0] || null;

    res.status(200).json({
      totalAdvisories,
      latest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Analytics for charts
const getAnalytics = async (req, res) => {
  try {
    const advisories = await Advisory.find({ user: req.user.id });

    const cropCount = {};
    const soilCount = {};

    advisories.forEach((item) => {
      cropCount[item.recommendedCrop] =
        (cropCount[item.recommendedCrop] || 0) + 1;

      soilCount[item.soilType] = (soilCount[item.soilType] || 0) + 1;
    });

    res.status(200).json({
      cropCount,
      soilCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleAdvisory = async (req, res) => {
  try {
    const advisory = await Advisory.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!advisory) {
      return res.status(404).json({ message: "Advisory not found" });
    }

    res.status(200).json(advisory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAdvisory = async (req, res) => {
  try {
    const advisory = await Advisory.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!advisory) {
      return res.status(404).json({ message: "Advisory not found" });
    }

    res.status(200).json({ message: "Advisory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdvisory,
  getMyAdvisories,
  getDashboardStats,
  getAnalytics,
  getSingleAdvisory,
  deleteAdvisory,
};

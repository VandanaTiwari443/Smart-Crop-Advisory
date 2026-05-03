const express = require("express");
const {
  createAdvisory,
  getMyAdvisories,
  getDashboardStats,
  getAnalytics,
  getSingleAdvisory,
  deleteAdvisory,
} = require("../controllers/advisoryController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createAdvisory);
router.get("/my", authMiddleware, getMyAdvisories);
router.get("/dashboard", authMiddleware, getDashboardStats);
router.get("/analytics", authMiddleware, getAnalytics);
router.get("/:id", authMiddleware, getSingleAdvisory);
router.delete("/:id", authMiddleware, deleteAdvisory);

module.exports = router;
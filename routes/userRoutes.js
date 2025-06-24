const express = require("express");
// ✅ Import both controllers
const { verifyToken } = require("../middleware/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");

const router = express.Router();

// ✅ Routes
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);

module.exports = router;

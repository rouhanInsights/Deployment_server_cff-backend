const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { submitFeedback } = require("../controllers/feedbackController");

const router = express.Router();

router.post("/", verifyToken, submitFeedback);

module.exports = router;

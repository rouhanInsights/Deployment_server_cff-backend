const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { getGreeting } = require("../controllers/getGreetingController");

router.get("/", verifyToken, getGreeting);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getAllSlots } = require("../controllers/slotController");

router.get("/", getAllSlots);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createPaymentOrder } = require("../controllers/paymentController");

router.post("/create-order", createPaymentOrder);

module.exports = router;

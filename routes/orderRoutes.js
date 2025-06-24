const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getOrderById,
  getOrderInvoice,
} = require("../controllers/orderController");

const { verifyToken } = require("../middleware/authMiddleware");

// ✅ Protect the order placement route
router.post("/", verifyToken, placeOrder);

// You may want to protect these too later:
router.get("/user/:id", verifyToken, getUserOrders);
router.get("/:id", verifyToken, getOrderById);
router.get("/:id/invoice", getOrderInvoice);

module.exports = router;

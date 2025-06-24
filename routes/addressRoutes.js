const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getalladdress,
  addaddress,
  deleteaddress,
  editaddress 
} = require("../controllers/addressController");

// 🔐 Protected routes
router.get("/", verifyToken, getalladdress);
router.post("/", verifyToken, addaddress);
router.delete("/:id", verifyToken, deleteaddress);
router.put("/:id", verifyToken, editaddress);
module.exports = router;

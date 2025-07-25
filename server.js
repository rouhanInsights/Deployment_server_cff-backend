const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const slotRoutes = require("./routes/slotRoutes");
const otpRoutes = require("./routes/otpRoutes");
const greetingRoutes = require("./routes/greetingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
dotenv.config();

const app = express();

// ✅ Then regular CORS middleware
app.use(cors({
  origin: [
    "https://calcuttafreshfoods.shop",
    "https://www.calcuttafreshfoods.shop",
    "https://api.calcuttafreshfoods.shop", // ✅ include this
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Route mounts
app.use("/api/users", userRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/users", otpRoutes); 
app.use("/api/users/addresses", addressRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/greetings", greetingRoutes);

// Root test
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

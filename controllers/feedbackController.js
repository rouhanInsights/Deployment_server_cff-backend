const pool = require("../config/db");

const submitFeedback = async (req, res) => {
  const user_id = req.user?.userId;
  const { product_id, rating_product, comment_product, rating_da, comment_da } = req.body;

  if (!product_id || !rating_product || !rating_da) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO cust_feedback 
        (user_id, product_id, rating_product, comment_product, rating_da, comment_da)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, product_id, rating_product, comment_product, rating_da, comment_da]
    );
    res.status(201).json({ message: "Feedback submitted", feedback: result.rows[0] });
  } catch (err) {
    console.error("Feedback error:", err.message);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};

module.exports = { submitFeedback };

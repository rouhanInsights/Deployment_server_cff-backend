const pool = require("../config/db");

const getAllSlots = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT slot_id, slot_details FROM cust_slot_details ORDER BY slot_id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get Slots Error:", err.message);
    res.status(500).json({ error: "Failed to fetch delivery slots" });
  }
};

module.exports = { getAllSlots };

const pool = require("../config/db");

const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM cust_categories ORDER BY category_name`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get Categories Error:", err.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM cust_categories WHERE category_id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Get Category By ID Error:", err.message);
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

module.exports = { getAllCategories, getCategoryById };

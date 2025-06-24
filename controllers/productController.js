const pool = require("../config/db");

// GET /api/products
const getAllProducts = async (req, res) => {
  const { category, search, limit } = req.query;

  try {
    let query = `
      SELECT 
        p.product_id,
        p.name,
        p.description,
        p.product_short_description,
        p.price,
        p.sale_price,
        p.stock_quantity,
        p.weight,
        p.image_url,
        p.created_at,
        c.category_name,
        CASE 
          WHEN p.sale_price IS NOT NULL AND p.sale_price < p.price 
          THEN ROUND(((p.price - p.sale_price) / p.price) * 100)
          ELSE 0
        END AS discount
      FROM cust_products p
      JOIN cust_categories c ON p.category_id = c.category_id
      WHERE 1=1
    `;

    const values = [];

    if (category) {
      values.push(category);
      query += ` AND c.category_name ILIKE $${values.length}`;
    }

    if (search) {
      values.push(`%${search}%`);
      query += ` AND p.name ILIKE $${values.length}`;
    }

    query += ` ORDER BY p.created_at ASC`;

    if (limit) {
      values.push(limit);
      query += ` LIMIT $${values.length}`;
    }

    const result = await pool.query(query, values);

    const transformed = result.rows.map(p => ({
      id: p.product_id,
      name: p.name,
      description: p.description,
      short_description: p.product_short_description,
      price: p.price,
      sale_price: p.sale_price,
      image: p.image_url,
      weight: p.weight,
      discount: p.discount,
    }));

    res.json(transformed);
  } catch (err) {
    console.error("Get Products Error:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
         p.product_id,
         p.name,
         p.description,
         p.product_short_description,
         p.price,
         p.sale_price,
         p.stock_quantity,
         p.weight,
         p.image_url,
         p.created_at,
         c.category_name,
         CASE 
           WHEN p.sale_price IS NOT NULL AND p.sale_price < p.price 
           THEN ROUND(((p.price - p.sale_price) / p.price) * 100)
           ELSE 0
         END AS discount
       FROM cust_products p
       JOIN cust_categories c ON p.category_id = c.category_id
       WHERE p.product_id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const p = result.rows[0];

    const product = {
      id: p.product_id,
      name: p.name,
      description: p.description,
      short_description: p.product_short_description,
      price: p.price,
      sale_price: p.sale_price,
      image: p.image_url,
      weight: p.weight,
      discount: p.discount,
    };

    res.json(product);
  } catch (err) {
    console.error("Get Product By ID Error:", err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// GET /api/products/category?category_id=
const getProductsByCategory = async (req, res) => {
  const { category_id } = req.query;

  if (!category_id) {
    return res.status(400).json({ error: "Category ID is required." });
  }

  try {
    const result = await pool.query(
      `SELECT 
         p.product_id,
         p.name,
         p.description,
         p.product_short_description,
         p.price,
         p.sale_price,
         p.stock_quantity,
         p.weight,
         p.image_url,
         p.created_at,
         c.category_name
       FROM cust_products p
       JOIN cust_categories c ON p.category_id = c.category_id
       WHERE c.category_id = $1
       ORDER BY p.created_at DESC`,
      [category_id]
    );

    const transformed = result.rows.map(p => ({
      id: p.product_id,
      name: p.name,
      description: p.description,
      short_description: p.product_short_description,
      price: p.price,
      sale_price: p.sale_price,
      image: p.image_url,
      weight: p.weight,
      discount:
        p.sale_price && p.price && p.sale_price < p.price
          ? Math.round(((p.price - p.sale_price) / p.price) * 100)
          : 0,
    }));

    res.json(transformed);
  } catch (err) {
    console.error("Category Product Fetch Error:", err.message);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
};

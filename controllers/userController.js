const pool = require("../config/db");

// ✅ Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query("SELECT * FROM cust_users WHERE user_id = $1", [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.userId;

  const clean = (val) => (typeof val === "string" && val.trim() === "") ? null : val;

  const name = clean(req.body.name);
  const phone = clean(req.body.phone);
  const alt_phone = clean(req.body.alt_phone);
  const email = clean(req.body.email);
  const alt_email = clean(req.body.alt_email);
  const dob = req.body.dob;
  const gender = clean(req.body.gender);
  const profile_image_url = clean(req.body.profile_image_url);

  try {
    const result = await pool.query(
      `UPDATE cust_users SET
         name = $1, phone = $2, alt_phone = $3,
         email = $4, alt_email = $5, dob = $6,
         gender = $7, profile_image_url = $8
       WHERE user_id = $9 RETURNING *`,
      [name, phone, alt_phone, email, alt_email, dob, gender, profile_image_url, userId]
    );

    res.json({ message: "Profile updated successfully.", user: result.rows[0] });
    // console.log("Received in backend:", req.body);

  } catch (err) {
    console.error("Update Profile Error:", err.message);
    res.status(500).json({ error: "Failed to update profile" });
  }
};


module.exports = {
  getUserProfile,
  updateUserProfile
};

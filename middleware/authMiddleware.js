const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey123"; // use env var in prod

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded); 
    req.user = decoded; // { userId: ... }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken };

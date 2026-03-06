const db = require("../config/db");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");   

const signup = (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (password.length < 6 || password.length > 20) {
    return res.status(400).json({ error: "Password must be 6-20 characters" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(sql, [email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error occurred while signing up:", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email already exists" });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Generate real token for signup too (optional)
    const token = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ 
      message: "User created successfully", 
      token,  // Now using real JWT token
      user: { id: result.insertId, email }
    });
  });
};
module.exports = { signup };
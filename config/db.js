const mysql = require("mysql2");

// Use environment variables for all sensitive info
const db = mysql.createPool({
  host: process.env.DB_HOST,       // e.g., Render database host
  user: process.env.DB_USER,       // your db username
  password: process.env.DB_PASS,   // your db password
  database: process.env.DB_NAME,   // your db name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database ✅");
    connection.release(); // release back to pool
  }
});

module.exports = db;
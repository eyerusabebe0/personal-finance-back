const mysql = require("mysql2");


const db = mysql.createPool({
  host: "localhost",      
  user: "root",           
  password: "", 
  database: "users",      
  waitForConnections: true,
  connectionLimit: 10,    
  queueLimit: 0
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
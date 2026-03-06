const db = require("../config/db");


const addTrack = (req, res) => {
  let { description, catagory, amount } = req.body; // <-- expects catagory
  const user_id = req.user.id;

  if (!description || !catagory || !amount) {  // <-- checks catagory
    return res.status(400).json({ error: "All fields are required" });
  }

  amount = parseFloat(amount);
  if (isNaN(amount)) {
    return res.status(400).json({ error: "Amount must be a number" });
  }

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const sql =
    "INSERT INTO tracks (user_id, description, catagory, date, amount) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [user_id, description, catagory, formattedDate, amount],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Transaction added" });
    }
  );
};


const getTracks = (req, res) => {
 const sql = "SELECT * FROM tracks WHERE user_id = ?";
  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error while fetching tracks" });
    }
    res.status(200).json(results);
  });
};


const updateTrack = (req, res) => {
  const { id } = req.params;
  const { description, catagory, date, amount } = req.body;

  if (!description || !catagory || !date || !amount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE tracks SET description = ?, catagory = ?, date = ?, amount = ? WHERE id = ?";
  db.query(sql, [description, catagory, date, amount, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error while updating track" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Track not found" });
    }
    res.status(200).json({ message: "Track updated successfully" });
  });
};


const deleteTrack = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM tracks WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "Transaction deleted" });

  });

};

module.exports = {
  addTrack,
  getTracks,
  updateTrack,
  deleteTrack
};
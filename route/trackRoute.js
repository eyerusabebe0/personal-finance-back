const express = require("express");
const router = express.Router();

const {
  addTrack,
  getTracks,
  updateTrack,
  deleteTrack
} = require("../controllers/trackController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/add", verifyToken, addTrack);
router.get("/get", verifyToken, getTracks);
router.put("/update/:id", verifyToken, updateTrack);
router.delete("/delete/:id", verifyToken, deleteTrack);

module.exports = router;
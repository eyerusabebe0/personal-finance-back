const express = require("express");
const cors = require("cors");

// Routes
const signupRoute = require("./route/signupRoute");
const loginRoute = require("./route/loginRoute");
const trackRoute = require("./route/trackRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/tracks", trackRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);

// Use the port from environment (Render provides process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
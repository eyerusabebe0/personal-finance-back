const express = require("express");
const cors = require("cors");

const signupRoute = require("./route/signupRoute"); 
const loginRoute = require("./route/loginRoute");   
const trackRoute=require("./route/trackRoute");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/tracks", trackRoute);

app.use("/signup", signupRoute);  // use router
app.use("/login", loginRoute);    // use router

app.listen(5000, () => console.log("Server running on port 5000"));
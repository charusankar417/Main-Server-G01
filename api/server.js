require("dotenv").config();
const userrouter = require("./Controllers/router1.js");
const oauth = require("./Controllers/discord.js");
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const url = require("url");
const cors = require("cors");
const { error } = require("console");
const cookieParser = require("cookie-parser");
const router = express.Router();

// -Middleware------------------------------------------------------------------------------------------------------------
const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  cors({
    origin:
      "http://localhost:3000" ||
      "http://localhost:3001" ||
      "http://localhost:8000" ||
      "http://localhost:3002" ||
      "localhost:8000",
    credentials: true,
  })
);

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://localhost:3002",
    "localhost:8000",
    "localhost:3000",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/", require("./Routes/routes"));

// -Connect to MongoDB Inlfux-main DB-------------------------------------------------------------------------------------
try {
  mongoose.connect("mongodb://localhost:27017/Influx-main");
  const db = mongoose.connection;
  console.log("Connected");
} catch (error) {
  handleError(error);
}

// -Start the server-------------------------------------------------------------------------------------
app.listen(3001, () => {
  console.log("Server is running");
});

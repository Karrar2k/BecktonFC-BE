/**
 * Created by: Karrar
 */

const express = require("express");
const cors = require("cors");
const app = express();

// middleware to parse the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Define your CORS options
const corsOptions = {
  origin: "https://beckton-fc-fe.vercel.app",  // Your frontend URL
  methods: ["GET", "POST", "OPTIONS"],  // Allow methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allow headers
};

// Use CORS with the defined options
app.use(cors(corsOptions));

// Handle OPTIONS method explicitly
app.options('*', cors(corsOptions));

// Connects to the Mongo DB
require("./db");


// routes
app.use("/api/user", require("./api/users"));
app.use("/api/ticket", require("./api/tickets"));
app.use("/api/shop", require("./api/shop"));
app.use("/api/book", require("./api/bookings"));
app.use("/api/stripe", require("./api/stripe"));
app.use("/api/upload", require("./api/upload"));
app.use("/api/news", require("./api/news"));
app.use("/api/stats", require("./api/stats"));

// Initialize Firebase
require("./firebase/initialize-firebase");

module.exports = app;

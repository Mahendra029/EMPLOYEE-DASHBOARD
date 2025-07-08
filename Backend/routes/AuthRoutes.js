const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/AuthController");

// Routes
router.post("/signup", signup); // POST /auth/signup
router.post("/login", login);   // POST /auth/login

module.exports = router;

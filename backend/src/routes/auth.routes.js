const express = require("express");

const { signup } = require("../controllers/auth.controller");

const authRoutes = express.Router();

// POST: /api/auth/sign-up
authRoutes.post("/sign-up", signup);

module.exports = authRoutes;
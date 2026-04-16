const express = require("express");

const { signup, signout } = require("../controllers/auth.controller");

const authRoutes = express.Router();

// POST: /api/auth/sign-up
authRoutes.post("/sign-up", signup);

// POST: /api/auth/sign-out
authRoutes.post("/sign-out", signout);

module.exports = authRoutes;
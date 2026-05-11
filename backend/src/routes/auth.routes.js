const express = require("express");
const multer = require("multer");

const {
  signup,
  signin,
  signout,
  getCurrentUser,
  editProfile
} = require("../controllers/auth.controller");
const { verifyToken } = require("../utilities/auth");

const authRoutes = express.Router();

// const upload = multer({ dest: './uploads/' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniquePrefix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST: /api/auth/sign-up
authRoutes.post("/sign-up", signup);

// POST: /api/auth/sign-in
authRoutes.post("/sign-in", signin);

// POST: /api/auth/sign-out
authRoutes.post("/sign-out", signout);

// POST: /api/auth/current-user
authRoutes.post("/current-user", verifyToken, getCurrentUser);

// PUT: /api/auth/edit-profile
authRoutes.put("/edit-profile", verifyToken, upload.single("selectedPicture"), editProfile);

module.exports = authRoutes;
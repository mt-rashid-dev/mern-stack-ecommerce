const express = require("express");
const multer = require("multer");

const { getProducts, addNewProduct } = require("../controllers/product.controller.js");
const { verifyToken, verifyAdmin } = require("../utilities/auth.js");

const productRoutes = express.Router();

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

// GET: /api/products
productRoutes.get("/", getProducts);

// POST: /api/products
productRoutes.post("/", verifyToken, verifyAdmin, upload.single("productImage"), addNewProduct);

module.exports = productRoutes;
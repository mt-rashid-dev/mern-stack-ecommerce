const express = require("express");
const multer = require("multer");

const { getProducts, addNewProduct, getProduct, updateProduct } = require("../controllers/product.controller.js");
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

// GET: /api/products/get-product/:id
productRoutes.get("/get-product/:id", verifyToken, verifyAdmin, getProduct);

// PUT; /api/products
productRoutes.put("/", verifyToken, verifyAdmin, upload.single("newImage"), updateProduct);

module.exports = productRoutes;
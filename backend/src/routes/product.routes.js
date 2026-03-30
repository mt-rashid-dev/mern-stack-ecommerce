const express = require("express");

const { getProducts } = require("../controllers/product.controller.js");

const productRoutes = express.Router();

// GET: /api/products
productRoutes.get("/", getProducts);

module.exports = productRoutes;
const express = require("express");

const { checkout, verifyCheckout, verifyOrder, getMyOrders, getPendingOrders, getSingleOrder } = require("../controllers/order.controller");
const { verifyToken, verifyAdmin} = require("../utilities/auth");

const orderRoutes = express.Router();

// POST: /api/orders/checkout
orderRoutes.post("/checkout", verifyToken, checkout);

// GET: /api/orders/verify-checkout
orderRoutes.get("/verify-checkout", verifyCheckout);

// POST: /api/orders/verify-order
orderRoutes.post("/verify-order", verifyOrder);

// GET: /api/orders/my-orders
orderRoutes.get("/my-orders", verifyToken, getMyOrders);

// GET: /api/orders/pending-orders
orderRoutes.get("/pending-orders", verifyToken, verifyAdmin, getPendingOrders);

// GET: /api/orders/single-order/:id
orderRoutes.get("/single-order/:id", verifyToken, getSingleOrder);

module.exports = orderRoutes;
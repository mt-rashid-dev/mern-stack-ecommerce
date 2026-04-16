const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectdb } = require("./utilities/db.js");
const productRoutes = require("./routes/product.routes.js");
const authRoutes = require("./routes/auth.routes.js");

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to MERN-STACK-ECOMMERCE Backend App");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  const error = new Error("404 not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    success: false,
    message: error.message || "Sorry! Something went wrong."
  });
});

app.listen(port, async () => {
	await connectdb();
  console.log(`Backend app listening on port ${port}`);
});
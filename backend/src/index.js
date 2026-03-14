const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Welcome to MERN-STACK-ECOMMERCE Backend App");
});

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
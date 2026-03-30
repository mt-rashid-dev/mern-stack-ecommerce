const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  img: {
    type: String,
    required: [true, "Product image is required"]
  },
  title: {
    type: String,
    required: [true, "Product name is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  category: {
    type: String,
    required: [true, "Category is required"]
  },
	currency: {
		type: String,
		default: "USD"
	},
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
	discount: {
	  type: Number,
	  default: 0
	},
  inStock: {
    type: Number,
    required: [true, "In-stock quantity is required"]
  }
});

const Product = new model("Product", productSchema);

module.exports = Product;
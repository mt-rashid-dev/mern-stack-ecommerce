const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartItemSchema = new Schema({
  productId: {
    type: String,
    required: [true, "Product ID is required"]
  },
  productImage: {
    type: String,
    default: ""
  },
  productTitle: {
    type: String,
    required: [true, "Product title is required"]
  },
  category: {
    type: String,
    required: [true, "Category is required"]
  },
  discount: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"]
  },
  outOfStock: {
    type: Boolean,
    default: false
  }
});

const dateSchema = new Schema({
  day: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

const orderSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  cartItems: [cartItemSchema],
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"]
  },
  paymentStatus: {
    type: String,
    enum: {
      values: ["Pending", "Paid"],
      message: "Payment status {VALUE} is not valid"
    },
    default: "Pending"
  },
  orderConfirmation: {
    type: Boolean,
    default: false
  },
  availability: {
    type: String,
    enum: {
      values: ["Available", "Inventory Shortage"],
      message: "Availability {VALUE} is not valid"
    },
    default: "Available"
  },
  shippingStatus: {
    type: String,
    enum: {
      values: ["Pending", "Delivered"],
      message: "Shipping status {VALUE} is not valid"
    },
    default: "Pending"
  },
  date: dateSchema
});

const Order = new model("Order", orderSchema);

module.exports = Order;
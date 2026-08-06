const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const checkout = async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const cartItems = req.body.cart;
    const totalPrice = req.body.total;

    const newCartItems = cartItems.map((cartItem) => ({
      productId: cartItem._id,
      productImage: cartItem.img,
      productTitle: cartItem.title,
      category: cartItem.category,
      discount: cartItem.discount,
      price: cartItem.price,
      quantity: cartItem.quantity
    }));

    const date = new Date();
    const newDate = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };

    const newOrder = new Order({ firstName, lastName, email, cartItems: newCartItems, totalPrice, date: newDate });
    const savedOrder = await newOrder.save();

    const lineItems = cartItems.map((cartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.title
        },
        unit_amount: cartItem.price * 100
      },
      quantity: cartItem.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.API_BASE_URL}/api/orders/verify-checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.API_BASE_URL}/api/orders/verify-checkout?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        order_id: savedOrder._id.toString()
      }
    });

    res.send({
      sessionId: session.id,
      sessionURL: session.url
    });
  } catch (error) {
    console.log(`Error - failed to make a new checkout session: ${error}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    })
  }
};

const verifyCheckout = async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata.order_id;

    if (session.payment_status === "paid") {
      const result = await Order.findOne({ _id: orderId });
      const order = JSON.parse(JSON.stringify(result));
      if (order.orderConfirmation) {
        /*
          * If the order has already confirmed, prevent re-verification of this order
          * Otherwise, in-stock item count of each products of this order will be reduced in the database
          */
         return res.redirect(`${process.env.FRONTEND_BASE_URL}/verify-order?order_id=${orderId}`);
      }
      order.cartItems.forEach(async (cartItem) => {
        const product = await Product.findOne({ _id: cartItem.productId });
        const remainingItems = product.inStock - cartItem.quantity;
        if (remainingItems > 0) {
          await Product.findOneAndUpdate({ _id: product._id }, { $set: { inStock: remainingItems } });
        } else {
          cartItem.outOfStock = true;
          order.availability = "Inventory Shortage";
        }
      });
      await Order.findOneAndUpdate({ _id: orderId }, { $set: {
        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        cartItems: order.cartItems,
        totalPrice: order.totalPrice,
        paymentStatus: "Paid",
        orderConfirmation: true,
        availability: order.availability,
        shippingStatus: order.shippingStatus,
        date: order.date
      } });
      res.redirect(`${process.env.FRONTEND_BASE_URL}/verify-order?order_id=${orderId}`);
    } else {
      res.redirect(`${process.env.FRONTEND_BASE_URL}/verify-order?order_id=${orderId}`);
    }
  } catch (error) {
    next(error);
  }
};

const verifyOrder = async (req, res, next) => {
  try {
    const orderId = req.body.orderId;
    const order = await Order.findOne({ _id: orderId });

    if (order.paymentStatus === "Paid") {
      res.status(200).send({
        success: true,
        message: `Thanks for shopping with us. Your order is confirmed successfully. Here's your order id for your records: ${orderId}`
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Sorry! Your order was not confirmed."
      });
    }
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res) => {
  try {
    const email = req.user.email;
    const page = req.query.page;

    const myOrders = await Order.find({ email: email }).limit(8).skip((page - 1) * 8);
    const count = await Order.find({ email: email }).countDocuments();
    
    res.status(200).send({
      myOrders,
      totalPages: Math.ceil(count / 8),
      success: true
    });
  } catch (error) {
    console.log("Error in getMyOrders function:", error);
    res.status(500).send({
      message: "Internal server error",
      success: false
    });
  }
};

const getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find();

    res.status(200).send({
      pendingOrders,
      success: true
    });
  } catch (error) {
    console.log(`Error - failed to get pending orders: ${error}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const singleOrder = await Order.findOne({ _id: orderId });

    res.status(200).send({
      singleOrder,
      success: true
    });
  } catch (error) {
    console.log(`Error - failed to get single order: ${error}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    });
  }
}

module.exports = { checkout, verifyCheckout, verifyOrder, getMyOrders, getPendingOrders, getSingleOrder };
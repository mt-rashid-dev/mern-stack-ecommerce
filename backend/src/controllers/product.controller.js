const Product = require("../models/product.model.js");

const getProducts = async (req, res, next) => {
	try {
	  const page = req.query.page;
	  const limit = req.query.limit;
	  const search = req.query.search;
	  let searchRegexp = null;
	  let filter = {};
	  let count = 0;
		
	  if (search && search !== "All") {
	    searchRegexp = new RegExp(`.*${search}.*`, "i");
	    filter = {
	      $or: [
	        { productName: { $regex: searchRegexp } },
	        { category: { $regex: searchRegexp } }
	      ]
	    };
	    count = await Product.find(filter).countDocuments();
	  } else {
	    count = await Product.find().countDocuments();
	  }
		
	  const products = await Product.find(filter).skip((page - 1) * limit).limit(limit);
		
	  if (products.length > 0) {
	    res.status(200).send({
	      products,
	      totalPages: Math.ceil(count / limit),
	      message: "",
	      success: true
	    });
	  } else {
	    res.status(200).send({
	      message: "No items found",
	      success: false
	    });
	  }
	} catch (err) {
	  next(err);
	}
};

const addNewProduct = async (req, res) => {
	try {
		const newProduct = new Product({
			img: req.file.path,
			title: req.body.productTitle,
			description: req.body.description,
			category: req.body.category,
			discount: req.body.discount,
			price: req.body.price,
			inStock: req.body.inStock
		});

		await newProduct.save();
		res.status(201).send({
			message: "New product added successfully",
			success: true
		});
	} catch (error) {
		console.log(`Error - failed to add new product: ${error}`);
		res.status(500).send({
			message: "Internal server error",
			success: false
		});
	}
};

module.exports = { getProducts, addNewProduct };
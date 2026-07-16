const fs = require("node:fs");

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

const getProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findOne({ _id: productId });

		if (!product) {
			return res.status(404).send({
				message: "Sorry! The product was not found",
        errorStatus: "not found",
				success: false
			});
		}

		res.status(200).send({
			product,
			message: "The product has been found successfully",
			success: true
		});
	} catch (error) {
		console.log(`Error - failed to get product: ${error}`);
		res.status(500).send({
			message: "Internal server error",
			success: false
		});
	}
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.body.productId;
    const editedTitle = req.body.title;
    const editedDescription = req.body.description;
    const editedCategory = req.body.category;
    const editedDiscount = req.body.discount;
    const editedPrice = req.body.price;
    const editedInStock = req.body.inStock;
    let newImage = "";
    let previousImage = "";

    const product = await Product.findOne({ _id: productId }, { img: 1 });
    previousImage = product.img;

    if (!req.file) {
      newImage = previousImage;
    } else {
      newImage = req.file.path;
      fs.unlink(previousImage, (error) => {
        if (error) {
          console.log(`Error - failed to delete product image: ${error}`);
        } else {
          console.log(`${previousImage} was deleted`);
        }
      });
    }

    const result = await Product.updateOne({ _id: productId }, { $set: {
        img: newImage,
        title: editedTitle,
        description: editedDescription,
        category: editedCategory,
        discount: editedDiscount,
        price: editedPrice,
        inStock: editedInStock
      } });

    if (result.modifiedCount > 0) {
      res.status(200).send({
        message: "The product has been updated successfully",
        success: true
      });
    } else {
      res.status(400).send({
        message: "Sorry! The product update was not successful",
        errorStatus: "update unsuccessful",
        success: false
      });
    }

  } catch (error) {
    console.log(`Error - failed to update product: ${error}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await Product.deleteOne({ _id: productId });
    console.log(result);

    res.status(200).send({
      message: "The product deleted successfully",
      success: true
    });
  } catch (error) {
    console.log(`Error - failed to delete product: ${error}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    });
  }
};

module.exports = {
	getProducts,
	addNewProduct,
  getProduct,
  updateProduct,
  deleteProduct
};
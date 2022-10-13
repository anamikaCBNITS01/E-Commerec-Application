const Product = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // throw new Error("Some Eror");
  res.json(products);
});

const getSearchProducts = asyncHandler(async (req, res) => {
  // const products = await Product.find({});
  // res.json(products);
  // res.send("searching")
  console.log("data", req.params.key)
  let data = await Product.find(
    {
      "$or": [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { details: { $regex: req.params.key } }
      ]
    }
  )
  res.send(data);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});

module.exports = { getProducts, getProduct, getSearchProducts };

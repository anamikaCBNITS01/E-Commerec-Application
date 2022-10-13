const express = require("express");
const {
  getProduct,
  getProducts,
  getSearchProducts
} = require("../controllers/productsController");
const router = express.Router();

//GET ROUTE FOR ALL PRODUCTS
router.route("/products").get(getProducts);

//GET ROUTE FOR SINGLE PRODUCT
router.route("/products/:id").get(getProduct);

//GET SEARCH PRODUCTS
router.route("/search/:key").get(getSearchProducts);

module.exports = router;

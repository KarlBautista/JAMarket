const express = require("express");
const router = express.Router();
const { addToCart, getCart, getCartProduct } = require("../controllers/cartController");



router.post("/add-to-cart", addToCart);
router.get("/get-cart", getCart);
router.get("/get-cart-product", getCartProduct)
module.exports = router;
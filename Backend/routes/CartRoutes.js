const express = require("express");
const router = express.Router();
const { addToCart, getCart, getCartProduct, deleteFromCart } = require("../controllers/cartController");



router.post("/add-to-cart", addToCart);
router.get("/get-cart", getCart);
router.get("/get-cart-product", getCartProduct)
router.delete("/delete-from-cart", deleteFromCart)
module.exports = router;
const express = require("express");
const router = express.Router();
const { getAllShops, getAllProducts, getAllProductsFromStore } = require("../controllers/shopController")


router.get("/all-shops", getAllShops);
router.get("/all-shop-products", getAllProducts);
router.get("/all-products-from-store", getAllProductsFromStore);
module.exports =  router ;
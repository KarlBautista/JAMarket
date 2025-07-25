const express = require("express");
const router = express.Router();
const { getAllShops, getAllProducts } = require("../controllers/shopController")


router.get("/all-shops", getAllShops);
router.get("/all-shop-products", getAllProducts);
module.exports =  router ;
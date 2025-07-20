const express = require("express");
const router = express.Router();
const { AddProduct, getProducts } = require("../controllers/productController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/add-product", upload.single("productImage"), AddProduct);
router.get("/all-products", getProducts )
module.exports = router;
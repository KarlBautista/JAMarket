const express = require("express");
const router = express.Router();
const { AddProduct } = require("../controllers/productController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/add-product", upload.single("productImage"), AddProduct);

module.exports = router;
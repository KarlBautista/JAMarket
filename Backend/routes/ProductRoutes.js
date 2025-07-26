const express = require("express");
const router = express.Router();
const { AddProduct, getProducts, getAllProductFromTable, getProduct } = require("../controllers/productController");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/add-product", upload.single("productImage"), AddProduct);
router.get("/all-products", getProducts);
router.get("/all-products-from-table", getAllProductFromTable);
router.get("/product", getProduct);


module.exports = router;
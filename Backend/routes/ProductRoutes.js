const express = require("express");
const router = express.Router();
const { AddProduct, getProducts, getFeaturedProducts, getProduct, getProductByCategory, deleteProduct, getProductToUpdate, updateProduct } = require("../controllers/productController");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/add-product", upload.single("productImage"), AddProduct);
router.get("/all-products", getProducts);
router.get("/featured-products", getFeaturedProducts);
router.get("/product", getProduct);
router.post("/products-by-category", getProductByCategory);
router.delete("/delete-product/:productId", deleteProduct);
router.get("/product-to-update/:productId", getProductToUpdate);
router.put("/update-product", upload.single("file"), updateProduct);



module.exports = router;
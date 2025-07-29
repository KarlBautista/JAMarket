const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders } =  require ("../controllers/orderController");

router.post("/place-order", placeOrder);
router.get("/orders", getAllOrders)
module.exports = router;
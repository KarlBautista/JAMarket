const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders, getAllOrderItems } =  require ("../controllers/orderController");

router.post("/place-order", placeOrder);
router.get("/orders", getAllOrders)
router.get("/order-items", getAllOrderItems)
module.exports = router;
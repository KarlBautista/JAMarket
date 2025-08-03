const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders, getAllOrderItems, cancelOrder, deleteOrder } =  require ("../controllers/orderController");

router.post("/place-order", placeOrder);
router.get("/orders", getAllOrders)
router.get("/order-items", getAllOrderItems);
router.get("/cancel-order", cancelOrder)
router.delete("/delete-order", deleteOrder);
module.exports = router;    
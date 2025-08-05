const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders, getAllOrderItems, cancelOrder, deleteOrder, getAllOrdersFromStoreOwner, rejectOrder, shipOrder, receiveOrder } =  require ("../controllers/orderController");

router.post("/place-order", placeOrder);
router.get("/orders", getAllOrders)
router.get("/order-items", getAllOrderItems);
router.get("/cancel-order", cancelOrder)
router.delete("/delete-order", deleteOrder);
router.get("/orders-store-owner", getAllOrdersFromStoreOwner);
router.put("/reject-order", rejectOrder);
router.put("/ship-order", shipOrder);
router.put("/receive-order", receiveOrder);
module.exports = router;    
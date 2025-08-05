const supabase = require("../config/supabaseClient")

const placeOrder = async (req, res) => {
    const { userId, cart, totalAmount, mop } = req.body;
   
    console.log(cart)
  
    try{
        const { data: insertData, error: insertError } = await supabase.from("orders").insert({
            "customer_id": userId,
            "status": "pending",
            "total_amount": totalAmount,
            "payment_method": mop
        }).select("id");
        if(insertError){
            return res.status(500).json({ error: insertError });
        }
        const orderId = insertData[0].id;
        
        const orderItems = cart.map((c) => ({
            "order_id": orderId,
            "product_id": c.product_id,
            "quantity": 1,

        }));
        const { error: insertItemError } = await supabase.from("orders_item")
        .insert(orderItems);
        if(insertItemError){
          console.log("dito error")
          console.log(insertItemError)
            return res.status(500).json({ error: insertError });
        }

        const { error: deleteCartError } = await supabase.from("Cart").delete().eq("user_id", userId);
        if(deleteCartError){
            res.status(500).json({ error: `error dito sa pagdelete sa cart: ${deleteCartError}`});
        }

        res.status(200).json({ message: "successfully placed order" })
        console.log("finished");

    } catch(err){
        return res.status(404).json({ error: err });
    }
}

const getAllOrders = async (req, res) => {
    
    const customerId = req.query.id;
    console.log("Customer ID:", customerId)
    try{
        const { data: orderData, error: orderError } = await supabase.from("orders")
        .select("*")
        .eq("customer_id", customerId);
        if(orderError){
            return res.status(404).json({ error: orderError });
        }
        return res.status(200).json({ message: "got all the order data", data: orderData });
    } catch(err){
        return res.status(404).json({ error: err });
    }
    
}

const getAllOrderItems = async (req, res) => {
    const ids = req.query.orderId;
    const orderIds =  Array.isArray(ids) ? ids : [ids];
    try{
        const { data: orderItemsData, error: orderItemsError } = await supabase.from("orders_item")
        .select("*").in("order_id", orderIds);
        if(orderItemsError){
            res.status(500).json({ error: orderItemsError });
        }
        const productIds = orderItemsData.map((order) => order.product_id);
        const { data: productOrderItemData, error: productOrderItemError} = await 
        supabase.from("products").select("*").in("product_id", productIds);
        if(productOrderItemError){
            res.status(500).json({ error: productOrderItemError });
        }
        res.status(200).json({ message: "got all the orderItem and products", 
                               orderItem: orderItemsData, 
                               orderProducts: productOrderItemData });
    } catch(err){
        res.status(500).json({ error: err });
    }
}

const cancelOrder = async (req, res) => {
    console.log("running");
    const orderId = req.query.orderId;
    console.log(orderId)
    try{
        const { error: cancelOrderError } = await supabase.from("orders")
        .update({ status: "cancelled"}).eq("id", orderId);

        if(cancelOrderError){
            return res.status(500).json({ error: cancelOrderError });
        }
        return res.status(200).json({ message: `cancelled order ${orderId}`});
    } catch (err){
        res.status(500).json({ error: err });
    }
}

const deleteOrder = async (req, res) => {
    console.log("gumagana")
    const orderId = req.query.orderId;
    try{
        const { error: deleteOrderError } = await supabase.from("orders")
        .delete().eq("id", orderId);
        if(deleteOrderError){
            return res.status(500).json({ error: deleteOrderError });
        }
        return res.status(200).json({ message: `Successfully deleted order: ${orderId}`});
    } catch(err){
        return res.status(500).json({ error: err });
    }
}

const getAllOrdersFromStoreOwner = async (req, res) => {
    const storeOwnerId = req.query.storeOwnerId;
    try {
        const { data: storeOwnerOrders, error: storeOwnerError } = await supabase
            .from("orders")
            .select(`
                id,
                customer_id,
                order_date,
                total_amount,
                payment_method,
                status,
                delivered_date,
                ship_date,
                users:customer_id!inner ( 
                    id,
                    email,
                    first_name,
                    last_name,
                    phone
                ),
                orders_item!inner (
                    id,
                    quantity,
                    product_id,
                    products!inner (
                        product_id,
                        product_name,
                        price,
                        sku,
                        description,
                        product_image,
                        store_owner_id
                    )
                )
            `)
            .eq("orders_item.products.store_owner_id", storeOwnerId);

        if (storeOwnerError) {
            return res.status(500).json({ error: `Error in getting store owner orders: ${storeOwnerError}` });
        }

        return res.status(200).json({
            message: "nakuha na lahat ng store owner orders",
            data: storeOwnerOrders
        });

    } catch (err) {
        return res.status(500).json({ error: err.message || err });
    }
};


const rejectOrder = async (req, res) => {

    const orderId = req.query.orderId;
    try{
        const { error: rejectedOrderError } = await supabase.from("orders")
        .update({ status: "cancelled"}).eq("id", orderId)
        
        if(rejectedOrderError){
            return res.status(500).json({ error: `Error while rejecting order :${rejectOrder}` });
        }
        return res.status(200).json({ message: `Rejected Order ${orderId}` });
    } catch (err){
        return res.status(500).json({ error: err });
    }
}

const shipOrder = async (req, res) => {
    const orderId = req.query.orderId;
    try{
        const { error: shipOrderError } = await supabase.from("orders")
        .update({ status: "shipped", ship_date: new Date() }).eq("id", orderId);
        if(shipOrderError){
            return res.status(500).json({ error: `Error Updating data to shipped: ${shipOrderError}` });
        }
        return res.status(200).json({ message: `Shipped Order: ${orderId} `});
    } catch (err){
        return res.status(500).json({ error: err });
    }
}

const receiveOrder = async (req, res) => {
    const orderId = req.query.orderId;
    try{
        const { error: receiveOrderError } = await supabase.from("orders")
        .update({ status: "delivered", delivered_date: new Date() }).eq("id", orderId);
        if(receiveOrderError){
            return res.status(500).json({ error: `Error in updating to status to delivered: ${receiveOrderError}` });
        }
        return res.status(200).json({ message: `Received Order: ${orderId} `});
    } catch (err){
        return res.status(500).json({ error: err });
    }
}

module.exports = { placeOrder,
                 getAllOrders, 
                getAllOrderItems, 
                cancelOrder, 
                deleteOrder, 
                getAllOrdersFromStoreOwner,
                rejectOrder,
                shipOrder,
                receiveOrder }
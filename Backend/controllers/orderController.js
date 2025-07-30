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

        }))
        const { error: insertItemError } = await supabase.from("orders_item")
        .insert(orderItems);
        if(insertItemError){
          console.log("dito error")
          console.log(insertItemError)
            return res.status(500).json({ error: insertError });
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
    
}

module.exports = { placeOrder, getAllOrders }
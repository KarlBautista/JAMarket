const supabase = require("../config/supabaseClient")

const placeOrder = async (req, res) => {
    const { userId, cart, totalAmount, mop } = req.body;
    try{
        const { error: insertError } = await supabase.from("orders").insert({
            "customer_id": userId,
            "orders": cart.product_name,
            "status": "pending",
            "total_amount": totalAmount,
            "payment_method": mop
        })
        if(insertError){
            return res.status(500).json({ error: insertError });
        }
    } catch(err){
        return res.status(404).json({ error: err });
    }
}

const getAllOrders = async (req, res) => {
    try{
        const { data: orderData, error: orderError } = await supabase.from("orders")
        .select("*");
        if(orderError){
            return res.status(404).json({ error: orderError });
        }
        return res.status(200).json({ message: "got all the order data", data: orderData });
    } catch(err){
        return res.status(404).json({ error: err });
    }
    
}

module.exports = { placeOrder, getAllOrders }
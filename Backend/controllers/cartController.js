const supabase = require("../config/supabaseClient")

const addToCart = async (req, res) => {
    const { productId, customerId } = req.body;
    try{
        const { data: insertCartData, error: insertCartError } = await supabase.from("Cart")
        .insert({
            user_id: customerId,
            product_id: productId,
        }).single();

        if(insertCartError){
            return res.status(500).json({ error: `nag error dito sa insert Error: ${insertCartError}`});
        }
        return res.status(200).json({ message: "successfully inserted to cart", data: insertCartData });
    } 
    catch(err){
        console.error(err);
    }
}

const getCart = async (req, res) => {
    const { userId } = req.query;
    try{
        const { data: cartData, error: cartError }  = await supabase.from("Cart").select("*")
        .eq("user_id", userId);

        if(cartError){
            return res.status(500).json({ error: cartError});
        }
        res.status(200).json({ message: "successfully get all the cart data", data: cartData})
    } catch(err){
        console.error(err);
    }
}


const getCartProduct = async (req, res) => {
    console.log("This is running");
    const ids = req.query.id;
    const productId = Array.isArray(ids) ? ids : [ids];
    console.log(productId);
    try{
        const { data, error } = await supabase.from("products")
        .select("*").in("product_id", productId);

          if(error){
        return res.status(500).json({ error: error});
        }
    return res.status(200).json({ message: "tangina gumana na", data: data});
    } 
    catch(err){
        return res.status(500).json({ error: error});
    }



}

module.exports = { addToCart, getCart, getCartProduct }
const supabase = require("../config/supabaseClient")

const addToCart = async (req, res) => {
    const { productId, customerId, quantity } = req.body;
    try{
        const { data: insertCartData, error: insertCartError } = await supabase.from("Cart")
        .insert({
            user_id: customerId,
            product_id: productId,
            quantity: quantity,
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
  console.log("getCartProduct is running");
  console.log("req.query:", req.query); 
  const ids = req.query.id;
  console.log("Raw ids:", ids); 
  let productIds;
  if (Array.isArray(ids)) {
    productIds = ids;
  } else if (ids) {
    productIds = [ids]; // Convert single ID to array
  } else {
    return res.status(400).json({ error: "No product IDs provided" });
  }
  
  const queryIds = [...new Set(productIds)];
  console.log("Query IDs for database:", queryIds);
  
  try{
    const { data: productData, error: productError} = await supabase
      .from("products")
      .select("*")
      .in("product_id", queryIds);

    if(productError){
        console.log("Database error:", productError);
        return res.status(500).json({ error: productError });
    }
    
    console.log("Products from database:", productData); 

    const allCartData = productIds.map((id) => { 
      return productData.find((p) => p.product_id.toString() === id.toString());
    }).filter(Boolean); 

    console.log("Final cart data:", allCartData); 
    res.status(200).json({ message: "Successfully fetched cart products", data: allCartData});
    
  } catch(err){
    console.error("Error in getCartProduct:", err);
    return res.status(500).json({ error: err.message || err })
  }
};

const deleteFromCart = async (req, res) => {
    const cartId = req.query.id;
   try{
        const { error: deleteError } = await supabase.from("Cart")
        .delete().eq("id", cartId);
        
        if(deleteError){
            return res.status(500).json({ error: deleteError });
        }
        
        res.status(200).json({ message: `Deleted Cart id: ${cartId}`})
   } catch(err){
        res.status(500).json({ error: err });
   }
}


module.exports = { addToCart, getCart, getCartProduct, deleteFromCart }
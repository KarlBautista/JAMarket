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
  console.log("this is running");
  const ids = req.query.id;
  const productIds = ids.map((id) => Array.isArray(id) ? id : [id]);
  console.log(productIds);
  const queryIds = [...new Set(productIds)];
  try{
    const { data: productData, error: productError} = await supabase.from("products").select("*").in("product_id", queryIds);

    if(productError){
        return res.status(500).json({ error: productError });
    }
    console.log(productData);

    const allCartData = ids.map((id) => { 
    return productData.find((p) => p.product_id === id);
    });

    res.status(200).json({ message: "nakuha na lahat sa cart", data: allCartData});
    
  
  } catch(err){
    return res.status(500).json({ error: err })
  }
};


module.exports = { addToCart, getCart, getCartProduct }
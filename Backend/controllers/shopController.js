const supabase = require("../config/supabaseClient");

const getAllShops = async (req, res) => {

    try{
        const { data: shopsData, error: shopsError } = await supabase.from("partners")
        .select("*");
        if(shopsError){
          
            return res.status(500).json({ error: shopsError });
        };
        return res.status(200).json({ message: "Successfully get all shops", data: shopsData });
    } catch(err){
        console.error(err);
        return res.status(404).json({ error: err });
    }
}

const getAllProducts = async (req, res) => {
    try{
        const { data: allProductData, error: allProductError } = await supabase.from("products")
        .select("*");
        if(allProductError){
            return res.status(500).json({ error: productError });
        }
        res.status(200).json({ message: "successfully got all the products", data: allProductData });
    } catch(err){
        res.status(404).json({ error: err });
    }
}

module.exports = { getAllShops, getAllProducts }
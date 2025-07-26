
const supabase = require("../config/supabaseClient");

const AddProduct = async (req, res) => {
    const {
        userId,
        storeName,
        productName,
        description,
        price,
        category,
        stockQuantity,
        sku,
    } = req.body;
  
    const file = req.file;

       if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    

    try{
        const filePath = `product-image/${Date.now()}_${file.originalname}`
        const { data: storageData, error: storageError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
        });

        if(storageError){
            console.log(`nag error dito sa pag insert ng product image ${storageError.message} `)
            return res.status(500).json({ error: storageError.message });
        }

        const {data: publicUrlData } = await supabase
        .storage
        .from("product-images")
        .getPublicUrl(filePath);;

        productImageUrl = publicUrlData.publicUrl;

        const parsedPrice = parseFloat(price);
        const parsedStock = parseFloat(stockQuantity);

        const { data: insertProductData, error: insertProductError } = await supabase.from("products")
        .insert({
            product_name: productName,
            description,
            price: parsedPrice,
            category,
            stock_quantity: parsedStock,
            sku,
            product_image: productImageUrl,
            store_owner_id: userId,
            store_name: storeName,
        }).single();

        if(insertProductError) {
            console.log("nag error dito sa insert product error")
           return res.status(500).json({ error: insertProductError.message});
        }

        return res.status(201).json({ message: "Product Added", insertProductData})

    } catch(err){
        res.status(500).json({ error: err });
        console.error(err)
    }
};  


const getProducts = async (req, res) => {
    const userId = req.query.userId;
    console.log(userId);
    try{
        const { data: productData, error: productError } = await supabase.from("products")
        .select("*").eq("store_owner_id", userId);

        if(productError){
            console.log("dito nag error sa data error ng supabase");
            return res.status(500).json({ error: productError.message });
        }
        
        res.status(200).json({ message: "successfully got all the products", data: productData });
    } catch(err) {
        res.status(500).json({ error: "Failed to get all products "});
        console.error(err)
    }
};


const getAllProductFromTable = async (req, res) => {
    try{
        const { data: allProductData, error: allProductError } = await supabase.from("products")
            .select("*").limit(12);

            if(allProductError){
                 console.log("dito nag error sa all productError");
                return res.status(500).json({ error: allProductError.message });
               
            }   

            return res.status(200).json({ message: "Successfully got all the data from the products", data: allProductData });
        
    } catch(error){
        return res.status(500).json({ error: error });
    }
}

const getProduct = async (req, res) => {
    const productId = req.query.id;
    try{
        const { data: productData, error: productError } = await supabase.from("products")
        .select("*").eq("product_id", productId).single();
        if(productError){
            return res.status(500).json({ error: productError });
        }
        return res.status(200).json({ message: "successfully got the product", data: productData });
    } catch (err){
        return res.status(404).json({ error: err });
    }
}


module.exports = { AddProduct, getProducts, getAllProductFromTable, getProduct}

const supabase = require("../config/supabaseClient");

const AddProduct = async (req, res) => {
    const {
        userId,
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


module.exports = { AddProduct }
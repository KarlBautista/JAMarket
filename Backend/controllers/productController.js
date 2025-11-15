
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
        return res.status(400).json({ error: "No file uploade   d" });
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


const getFeaturedProducts = async (req, res) => {
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

const getProductByCategory = async (req, res) => {
    const category = req.body.category;
  
    try {
        const { data: productByCategoryData, error: productByCategoryError } = await supabase.from("products").select("*")
        .eq("category", category);
        
        if(productByCategoryError){
            console.error(`Error getting product by category: ${productByCategoryError.message}`);
            res.status(500).json({ success: false, error: productByCategoryError.message });
        }
        res.status(200).json({ success: true, data: productByCategoryData })

    } catch (err) {
        console.error(`Error getting products by category: ${err.message}`);
        res.status(500).json({ success: false, error: err.message });
    }
}

const deleteProduct = async (req, res) => {
      const productId = req.params.productId;  
    try {
        const { error: deletedProductError } = await supabase.from("products")
        .delete().eq("product_id", productId);

        if(deletedProductError){
            console.error(`Error deleting product ${productId}: ${deletedProductError.message }`);
            res.status(500).json({ success: false, error: err.message });
        }
        res.status(200).json({ success: true, message: `successfully deleted product ${productId}` });
    } catch (err) {
        console.error(`Something went wrong deleting product ${productId}`);
        res.status(500).json({ success: false, error: err.message });
    }
}

const getProductToUpdate = async (req, res) => {
    const productId = req.params.productId;
    console.log("product id to", productId);
    try {
        const { data: getProductToUpdateData, error: getProductToUpdateError} = await supabase.from("products")
        .select("*").eq("product_id", productId);

        if(getProductToUpdateError){
            console.error(`Error getting the product data: ${getProductToUpdateError.message}`);
            res.status(500).json({ success: false, error: getProductToUpdateError.message });
        }

        res.status(200).json({ success: true, data: getProductToUpdateData });
        
    } catch (err) {
        console.error(`Something went wrong getting the product data: ${err.message}`);
        res.status(500).json({ success: false, error: err.message });
    }
}

const updateProduct = async (req, res) => {
    const {
        productId,
        userId,
        productName,
        description,
        price,
        category,
        stockQuantity,
        sku,
        oldImageUrl 
    } = req.body;

    const file = req.file;
    let productImageUrl = oldImageUrl; 

    try {
        if (file) {
            const filePath = `product-image/${Date.now()}_${file.originalname}`;

            const { data: storageData, error: storageError } = await supabase.storage
                .from("product-images")
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: true, // allows replacement if same name
                });

            if (storageError) {
                console.error(`Error uploading updated image: ${storageError.message}`);
                return res.status(500).json({ success: false, error: storageError.message });
            }

            const { data: publicUrlData } = supabase
                .storage
                .from("product-images")
                .getPublicUrl(filePath);

            productImageUrl = publicUrlData.publicUrl;
        }

        const parsedPrice = parseFloat(price);
        const parsedStock = parseInt(stockQuantity, 10);

        const { data: updateData, error: updateError } = await supabase
            .from("products")
            .update({
                product_name: productName,
                description,
                price: parsedPrice,
                category,
                stock_quantity: parsedStock,
                sku,
                product_image: productImageUrl,
            })
            .eq("product_id", productId) 
            .eq("store_owner_id", userId) 
            .select()
            .single();

        if (updateError) {
            console.error(`Error updating product: ${updateError.message}`);
            return res.status(500).json({ success: false, error: updateError.message });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updateData,
        });

    } catch (err) {
        console.error(`Something went wrong updating product: ${err.message}`);
        res.status(500).json({ success: false, error: err.message });
    }
};



module.exports = { AddProduct, getProducts, getFeaturedProducts, getProduct, getProductByCategory, deleteProduct, getProductToUpdate, updateProduct}
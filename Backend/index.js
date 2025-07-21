const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = 5000;


const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes")

app.use(cors());
app.use(express.json());  

app.use("/api", productRoutes);
app.use("/api", cartRoutes);







app.listen(PORT, () => {
    console.log("Running in port ", PORT)
})
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = 5000;


const productRoutes = require("./routes/ProductRoutes");

app.use(cors());
app.use(express.json());  

app.use("/api", productRoutes);







app.listen(PORT, () => {
    console.log("Running in port ", PORT)
})
const express = require("express");
const path = require("path");
const cors = require("cors");
require('dotenv').config();
const supabase = require("./supabaseClient");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.post("/register", async (req, res) => {
    const { fullname, email, password, user_type } = req.body;
    console.log(fullname, email, password, user_type)
    try{
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if(authError){
            return res.status(500).json({ message: authError.message });
        }
        const user = authData.user;

        const { error: insertError } = await supabase.from("users").insert({
            id: user.id,
            fullname,
            user_type
        }).single();

        if(insertError){
            return res.status(500).json({ message: insertError.message });
        }
       return res.status(200).json({ message: "user registered successfully" });
    } catch(err){
    }
}) 











app.listen(PORT, () => {
    console.log("Running in port ", PORT)
})
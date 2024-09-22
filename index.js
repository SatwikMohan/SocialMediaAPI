const express = require("express");
//const mong = require("mongoose");
const router = require("./routes.js");
require('dotenv').config();
const PORT = process.env.PORT||8000;
const app = express();
app.use(express.json());
app.use(router);
app.post('/', (req, res) => {
    res.send('POST request received');
});

app.listen(PORT,()=>{
    console.log("Running on Port "+PORT);
});

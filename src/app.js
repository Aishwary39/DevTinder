const express = require("express");
const connectDB = require("./config/database");

const app = express();

connectDB().then(()=>{
    console.log("Database connected successfully..");
    app.listen(8084, ()=>{
    console.log("Server is successfully listening on port 8084.");
})
}).catch((err)=>{
    console.log("Database can not be connected... !!!")
})

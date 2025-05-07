const express = require('express');

const app = express(); // instatiating express

app.listen(3000, ()=>{
    console.log("server is listening at 3000 port...")
}); // listening at 3000 port

// app.use((req,res)=>{
//     res.send("Hello from the server");
// }) //callback function is known as request handler

// To create the route handlers

app.use("/hello", (req,res)=>{
    res.send("Hello Hello Hello !!!!");
})

app.use("/otherurl", (req,res)=>{
    res.send("other url or any url you want to handle");
})

app.use("/", (req, res)=>{
    res.send("Default url when none matches...")
});




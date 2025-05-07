const express = require('express');

const app = express(); // instatiating express

app.listen(3000, ()=>{
    console.log("server is listening at 3000 port...")
}); // listening at 3000 port

// app.use((req,res)=>{
//     res.send("Hello from the server");
// }) //callback function is known as request handler

// To create the route handlers

/**
 * app.use is used to create route handlers for all the HTTP methods (GET, POST, PUT, DELETE, etc.)
 * instead of app.get, app.post, etc.
 */

/**
 * routes can also take regex pattern as well
 * app.get(/.*hello/, (req,res)=>{})
 * eg : ab?c => a, ac, abc, abbc, abbbc, abbbbc, abbbbbc
 */

/**
 * for get method /user
 */
app.get("/user", (req, res)=>{
    console.log(req.query); // will return query params when send like this /user?name=aishwary&age=28
    console.log(req.params); // will return params when send like this /user/aishwary/28 but url in the handler should be like this /user/:name/:age
    res.send({name: "Aishwary Mishra", age: 28, city: "Lucknow"});
});

/**
 * for post method /user
 */
app.post("/user", (req, res)=>{
    res.send("Data saved to datbase successfully");
})

/**
 * for delete method /user
 */
app.delete("/user", (req, res)=>{
    res.send("Data deleted from the database successfully");
})


app.use("/hello", (req,res)=>{
    res.send("Hello Hello Hello !!!!");
});

app.use("/otherurl", (req,res)=>{
    res.send("other url or any url you want to handle");
})

app.use("/", (req, res)=>{
    res.send("Default url when none matches...")
});




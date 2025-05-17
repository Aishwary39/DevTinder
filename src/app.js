const express = require('express');

const app = express(); // instatiating express

const {adminAuth, userAuth} = require("./middlewares/auth");

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
    res.send({name: "Aishwary Mishra", age: 28, city: "Lucknow"}); // res.send is must to send the response else it will keep waiting for the response and stops after timeout error
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


/**
 * in app.use we can make multiple route handlers for the same url ,
 * can also wrap route handlers in an array make it one array and make it in mix and match array, 
 * two or three in array wherever you want and keep the rest as it is 
 * and it will behave the same way
 * 
 * app.use("/hello", [RH1, RH2], RH3, RH4, RH5) // this will call all the route handlers in the array one by one
 * app.use("/hello", [RH1, RH2, RH3, RH4, RH5]) // this will call all the route handlers in the array one by one
 * app.use("/hello", [RH1], [RH2], RH3, RH4, RH5) // this will call all the route handlers in the array one by one and so on in any order
 * 
 */

app.use("/hello",
    (req,res, next) => {
        res.send("Hello Hello Hello !!!!");
        next(); // this will call the next middleware function in the stack
    },
    (req,res, next) => {
        res.send("Hello Hello Hello !!!! 2nd time"); // this will not be called because the response is already sent in the first middleware function
        next(); // this will call the next middleware function in the stack
    },
    (req,res, next) => {
        res.send("Hello Hello Hello !!!! 3rd time"); // this will not be called because the response is already sent in the first middleware function
    }
);

app.use("/otherurl", (req,res)=>{
    res.send("other url or any url you want to handle");
})

// app.use("/", (req, res)=>{
//     res.send("Default url when none matches...")
// });


/**
 * these middleware functions are called in the order they are defined
 * and they are used to create middlewares functions for the routes eg : logging, authentication, etc.
 */

/**
 * 1. This is one way of writing, but for many other authentication methods avoid writing multiple times and that's why middlewares are used.
 */
app.get("/admin/getAllUser", (req, res, next)=>{
    // first I will check if the user is authenticated or not
    const token =  "xyz"; // this is just a dummy token, in real world we will get it from the request header or body
    const authentication  =  token === "xyz"; // this is just a dummy authentication, in real world we will check it from the database or any other source

    if(authentication){
        console.log("User is authenticated");
        res.send("User is authenticated and data is sent"); // this will send the response to the client
    }
    else {
        console.log("Authentication failed");
        res.send(401).send("Authentication failed");
    }
});

/**
 * 2. Another way to send the adminAuth to middleware and reuse when required
 */

// app.use("/admin", adminAuth);

// app.get("/admin/getAllUsers", (req,res)=>{
//     res.send("All data send");
// })

app.get("/user/getUserDetails", userAuth, (req,res)=>{
    res.send({
        name: "Aishwary",
        city: "Noida"
    })
});




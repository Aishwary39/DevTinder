const adminAuth = (req, res, next) =>{
    const token = "xyz";
    const authentication = token === "xyz";
    if(!authentication)
    {
        res.send("Autentication issue, check the details");
    }
    else 
    {
        console.log("Authenticated successfull");
        next();
    }
}


const userAuth =  (req, res, next)=>{
    const token = "12345";
    const authentication =  token === "1345";
    if(!authentication)
    {
        res.send("Authentication failed, please login again.");
    }
    else {
        console.log("Authentication successfully");
        next();
    }

}
module.exports = {
    adminAuth,
    userAuth
}
const jwt = require('jsonwebtoken')
const User = require("''/models/userModel.js");
const aysncHandler = require("express-async-handler");

const protect = asyncHandler(async(req,res,next) => {
    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token= req.headers.authorization.spilt(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();

        }catch(error){
            res.status(401);
            throw new Error("Not authorised,token failed");
        }
    }
})
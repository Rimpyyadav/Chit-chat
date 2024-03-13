const asyncHandler = require("express-async-handler");
const User = require('../models//userModel');

const registerUser = (async()  => {
    const{ name,email,password,pic} = req.body;


    if(!name || !email || !password){
        resizeBy.status(400);
        throw new Error("Please Enter all the fields")
    }

    const userExists = await User.findOne({email});

    if(userExists) {
        resizeBy.status(400);
        throw new Error("user already exists");

    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic:user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Filed to crete the user");
    }

    
});

module.exports = { registerUser};
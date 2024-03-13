const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: { type:String, reqired:true},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:
       " https://vectorified.com/images/anon-icon-32.jpg",
},
},
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
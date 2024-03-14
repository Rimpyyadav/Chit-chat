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

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword.this.password )
}

userSchema.pre('save', async function(next){
    if(!this.modified){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);
module.exports = User;
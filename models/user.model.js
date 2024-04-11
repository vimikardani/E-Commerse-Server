const mongoose=require('mongoose');


// Registered user scheme
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    
    
},
{
    timestamps:true
});




module.exports=new mongoose.model("User",userSchema)
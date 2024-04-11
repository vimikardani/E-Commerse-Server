const User=require('../models/user.model');
const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const registerUser=asyncHandler(async(req,res)=>{
    try {

        // required all fields
        const {name,email,username,password}=req.body;
        if(!name || !email || !username || !password){
            res.status(400)
            res.json({ message: 'Please add all fields' });
            
        }

        // check if user exists
        const userExists=await User.findOne({email})
        if(userExists){
            res.status(400);
            res.json({ message: 'User already exists' });
            
        }

        // Hash password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        // Create User
        const user=await User.create({name,email,username,password:hashedPassword});

        if(user){
            res.status(201).json({
                _id:user.id,
                name:user.name,
                email:user.email,
                username:user.username,
                token:generateToken(user._id)
            })
        }
        

    } 
    catch (error) {
        res.send(error)
        
    }
})

const loginUser=asyncHandler(async(req,res)=>{
    try {
        const {email,password}=req.body

        // Check for User email
        const user=await User.findOne({email})
        
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user.id,
                name:user.name,
                email:user.email,
                username:user.username,
                token:generateToken(user._id)
            })

        }
        else{

            res.status(401)
            res.json({ message: 'Login failed. Please check your username and password.' });

        }

        
    } catch (error) {
        res.send(error)
    }
})

const getMe=asyncHandler(async(req,res)=>{
    try {
        const {_id,name,email,username}=await User.findById(req.user.id)

        req.status(200).json({
            id:_id,
            name,
            email,
            username
        })
    } catch (error) {
        
    }
})

// Generate JWT

const generateToken=(id)=>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:'30d',
    })

}

module.exports={registerUser,loginUser,getMe}
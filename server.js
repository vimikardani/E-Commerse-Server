const express=require('express');
const connectDB=require('./config/db');
const bodyParser=require('body-parser')
require('dotenv').config();
const cors=require('cors');
const Product=require('./models/product.model');


const app=express();
app.use(cors());

connectDB();

app.use(
    bodyParser.urlencoded({
        extended:true,
    })
);
app.use(express.json());

app.get('/search/:key',async(req,res)=>{

    try {
        const searchWord=req.body.searchword;
        const productsfound=await Product.find({productName:{ $regex: req.params.key}})
        res.send(productsfound)
    } 
    catch (error) {
      res.send(error)
    }
})



app.use('/user', require('./routers/user.router'));
app.use('/', require('./routers/product.router'));



app.listen(3700,()=>{
    console.log('Server started at port 3700');
})
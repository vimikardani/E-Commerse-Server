const Product=require('../models/product.model');
const Category=require('../models/category.model');
const Cart=require('../models/cart.model');
const User=require('../models/user.model')


const addallProducts=async(req,res)=>{
    try {
        const {productImage,productName,productinfo,MRP}=req.body;
        const product=await  Product.create({productImage,productName,productinfo,MRP,quantity:1});
        res.send('products added');
        
    } 
    catch (error) {
        res.send(error)
    }
}

const getallProducts=async(req,res)=>{
    try {
        const allProduct=await Product.find();
        res.send(allProduct);
    } 
    catch (error) {
        res.send(error)
    }
}

const findProductId=async(req,res)=>{
    try {
        const id=req.params.id;
        const productdata=await Product.findById(id);
        res.send(productdata);
    } 
    catch (error) {
        res.send(error)
    }
}

const addallCategory=async(req,res)=>{
    try {
        const {categoryImage,categoryName}=req.body;
        const category=await Category.create({categoryImage,categoryName});
        res.send('Category Added');
    } 
    catch (error) {
       res.send(error) 
    }
}

const getallCategory=async(req,res)=>{
    try {
        const allCategory=await Category.find();
        console.log(allCategory);
        res.send(allCategory);
    } 
    catch (error) {
        res.send(error)
    }
}

const addtoCart = async (req, res) => {
    try {
        console.log(req.body);

        // Check if the user already has a cart
        const existingCart = await Cart.findOne({ user: req.body.userID });

        if (existingCart) {
            // If the user already has a cart, add the new product to the existing cart
            existingCart.products.push({
                product: req.body.products[0].productId,
                quantity: req.body.products[0].quantity,
                MRP: req.body.products[0].MRP,
                total:req.body.products[0].quantity*req.body.products[0].MRP,
                createAt:new Date()
            });

            const updatedCart = await existingCart.save();

            res.status(201).json({
                message: "Product added to the existing cart successfully",
                cart: updatedCart
            });
        } else {
            // If the user doesn't have a cart, create a new cart
            const newCart = new Cart({
                user: req.body.userID,
                products: [{
                    product: req.body.products[0].productId,
                    quantity: req.body.products[0].quantity,
                    MRP: req.body.products[0].MRP,
                    total:req.body.products[0].quantity*req.body.products[0].MRP,
                    createAt:new Date()
                }]
            });

            const savedCart = await newCart.save();

            res.status(201).json({
                message: "Cart created successfully",
                cart: savedCart
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteCartitem=async(req,res)=>{
    try {
        const id=req.params.id;
        await Cart.deleteOne({ _id: id});
        res.send('cart item delete successfully')
    } 
    catch (error) {
        res.send(error)
    }
}





module.exports={addallProducts,addallCategory,getallProducts,getallCategory,findProductId,addtoCart,deleteCartitem};
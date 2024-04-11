const express=require('express');
const router=express.Router();
const Product=require('../models/product.model');
const {addallProducts,addallCategory,getallProducts,getallCategory,findProductId,addtoCart,deleteCartitem}=require('../controllers/product.controller');



const {protect}=require('../middleware/authmiddleware')

router.post('/addproduct',addallProducts);

router.post('/addcategory',addallCategory);


router.get('/products', getallProducts);

router.get('/categories',getallCategory);

router.get('/products/:id',findProductId);


router.post('/addtocart',addtoCart);

router.delete('/product/:id',deleteCartitem)

module.exports=router;
const mongoose=require('mongoose');

const productSchema=mongoose.Schema({

    productImage:{
        type:[String],
        require:true
    },
    productName:{
        type:String,
        require:true
    },
    productinfo:{
        type:String,
        require:true
    },
    MRP:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
},
{
    timestamps:true
}
)

module.exports=new mongoose.model("Product",productSchema)
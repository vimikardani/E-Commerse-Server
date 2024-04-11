const mongoose=require('mongoose');

var Schema=mongoose.Schema
var ObjectId=Schema.ObjectId

const cartSchema=new Schema(
    {
        userId: {
          type:ObjectId,
            ref:'User'
        },
        products: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              
            },
            quantity: {
              type: Number,
              default: 1
            },
            MRP:{
                type:Number
            },
            total:{
              type:Number
          },
          createAt:{
            type:String
          }
          }
        ],
},
{
  timestamps:true
}
)

module.exports=new mongoose.model("Cart",cartSchema)
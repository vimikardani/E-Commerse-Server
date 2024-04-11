const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    categoryImage:{
        type:String,
        require:true
    },
    categoryName:{
        type:String,
        require:true
    }
},
{
    timestamps:true
}
)

module.exports=new mongoose.model("Category",categorySchema);
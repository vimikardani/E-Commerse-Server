const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGO_URL);
        console.log('database Connected');
    } 
    catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports=connectDB;
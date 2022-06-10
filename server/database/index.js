const mongoose =require('mongoose');
const {MONGO_URL}=require('../config');
const connectDatabase=async()=>{
    try {
        const connection=await mongoose.connect(MONGO_URL);
        console.log(`Database connected to : ${connection.connection.host}`); 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports=connectDatabase;
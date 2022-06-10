require('dotenv').config({path:'server/config/config.env'});
module.exports={MONGO_URL,JWT_SECRET_TOKEN,RAZORPAY_ID,RAZORPAY_KEY,NODE_ENV}=process.env;
const express=require('express');
const cors = require('cors')
const path =require('path');
const connectDatabase=require('./database');
const errorHandler=require('./middlewares/errorHandler');
const authRouter=require('./routes/auth');
const productRouter=require('./routes/product');
const orderRouter=require('./routes/order');
const uploadRoute=require('./routes/upload');
const PORT=process.env.PORT || 5000;
const {NODE_ENV}=require('./config');
const app=express();
connectDatabase();
app.use(cors());
app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'../','uploads')))
app.use('/api/user/',authRouter);
app.use('/api/products/',productRouter);
app.use('/api/orders/',orderRouter);
app.use('/api/upload',uploadRoute);
console.log(NODE_ENV);
console.log(NODE_ENV === 'production');
if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../','/client/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '../','client', 'build', 'index.html'))
    )
  }
app.use(errorHandler);

app.listen(PORT,()=>console.log(`listening to port ${PORT}`));





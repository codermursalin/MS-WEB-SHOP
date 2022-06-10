const asyncHandler=require('express-async-handler');
const User = require('../models/User');
const customError = require('../services/customError');
const { verifyToken } = require('../services/jwtToken');
exports.isSignedIn=asyncHandler(async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        const token=req.headers.authorization.split(' ')[1];
        const {id}=verifyToken(token);
        req.user= await User.findById(id).select('-password');
        
        next();
    }else{
        return next(customError.unAuthorized());
    }
})

exports.isAdmin=asyncHandler(async(req,res,next)=>{
    if(req.user.isAdmin===true){
        next();
    }
    else{
        return(next(customError.unAuthorized('only admin can do this')))
    }
})
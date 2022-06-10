const jwt =require('jsonwebtoken');
const {JWT_SECRET_TOKEN} =require('../config');
exports.generateToken=(id)=>{
    return jwt.sign({id}, JWT_SECRET_TOKEN, { expiresIn: '30d' });
}
exports.verifyToken=(token)=>{
    return jwt.verify(token, JWT_SECRET_TOKEN);
}
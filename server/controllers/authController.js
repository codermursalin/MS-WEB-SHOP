const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const customError = require('../services/customError');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../services/jwtToken');

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users)
})

exports.getUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
        return next(customError.notFound('User not found'));
    }
    res.status(200).json(user);
})

exports.updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return next(customError.notFound('User not found'));
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    res.status(200).json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    })
})

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return next(customError.notFound('User not found'));
    }
    await User.findByIdAndDelete(id);
    res.status(200).json("user deleted");
})
exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const alreadyExists = await User.exists({ email });
    if (alreadyExists) {
        return next(customError.alreadyExist('user already registered'));
    }
    const user = await User.create({ name, email, password });
    if (!user) {
        return next();
    }
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    });
})

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(customError.wrongCredentials())
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    console.log(user);
    if (!matchPassword) {
        return next(customError.wrongCredentials())
    }
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })

})

exports.getUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(customError.unAuthorized());
    }
    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })

})

exports.updateUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(customError.unAuthorized());
    }
    else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password || user.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    }
})
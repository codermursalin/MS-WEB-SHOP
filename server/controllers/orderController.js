const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const customError = require('../services/customError');
const Razorpay = require('razorpay');
const { RAZORPAY_KEY, RAZORPAY_ID } = require('../config');
const shortid =require('shortid');
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  if (orderItems && orderItems.length === 0) {
    return next(customError.notFound('No Order Items'))
  }
  else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})


exports.getOrderById = asyncHandler(async (req, res, next) => {

  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if (!order) {
    return next(customError.notFound('order not found'));
  }
  res.json(order);
})

exports.createOrderPayment = asyncHandler(async (req, res, next) => {
  try {
    const instance = new Razorpay({
      key_id: RAZORPAY_ID,
      key_secret: RAZORPAY_KEY,
    });
    const options = {
      amount: req.body.amount*100,
      currency: 'INR',
      receipt: shortid.generate()
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).json('Some error occured');
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
})

exports.getAPIKEY=asyncHandler(async(req,res,next)=>{
  res.json(RAZORPAY_ID);
})
exports.payOrder = asyncHandler(async (req, res, next) => {
  
  try {
    const {razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
      const order = await Order.findById(req.params.id)
      if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        }
      const updatedOrder = await order.save()
      res.json(updatedOrder);
      }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
})

exports.getOrder = asyncHandler(async (req, res, next) => {
  const orders=await Order.find({user:req.user._id});
  res.json(orders);
})
exports.getAdminOrder = asyncHandler(async (req, res, next) => {
  const orders=await Order.find();
  res.json(orders);
})

exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    return next(customError.notFound('Order not found'))
  }
})

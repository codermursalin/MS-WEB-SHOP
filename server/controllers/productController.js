const asyncHandler=require('express-async-handler');
const Product=require('../models/Product');
const customError = require('../services/customError');
exports.getAllProducts=asyncHandler(async(req,res,next)=>{
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
  ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
  : {}
  const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

exports.getSingleProduct=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    if(!product){
        return next(customError.notFound('product not found'))
    }
    res.status(200).json(product);
})

exports.createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })

  exports.updateProduct = asyncHandler(async (req, res) => {
    const {id}=req.params;
    console.log(id);
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      return next(customError.notFound('product not found'))
    }
  })

exports.deleteProduct=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    if(!product){
        return next(customError.notFound('product not found'))
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json("Product Deleted");
})

exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    return next(customError.notFound('product Not Found'));
  }
})


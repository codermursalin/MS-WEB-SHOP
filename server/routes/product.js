const { getAllProducts, getSingleProduct, deleteProduct, createProduct, updateProduct, createProductReview } = require('../controllers/productController');
const { isSignedIn,isAdmin } = require('../middlewares/auth');
const router=require('express').Router();
router.get('/:id',getSingleProduct);
router.get('/',getAllProducts);
router.delete('/admin/product/remove/:id',isSignedIn,isAdmin,deleteProduct)
router.post('/admin/product/create',isSignedIn,isAdmin,createProduct);
router.post('/admin/product/update/:id',isSignedIn,isAdmin,updateProduct);
router.post('/:id/review',isSignedIn,createProductReview);
module.exports=router;
const {createOrder, getOrderById, payOrder, getAPIKEY,createOrderPayment, getOrder, getAdminOrder, updateOrderToDelivered } = require('../controllers/orderController');
const { isSignedIn,isAdmin } = require('../middlewares/auth');
const router=require('express').Router();
router.post('/',isSignedIn,createOrder);
router.get('/apikey',getAPIKEY);
router.get('/myorders',isSignedIn,getOrder);
router.get('/admin/myorders',isSignedIn,isAdmin,getAdminOrder);
router.put('/:id/pay',isSignedIn,payOrder);
router.put('/:id/deliver',isSignedIn,isAdmin,updateOrderToDelivered);
router.get('/:id',isSignedIn,getOrderById);

router.post('/createorder',createOrderPayment);

module.exports=router;
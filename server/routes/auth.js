const { registerUser, loginUser, getUserProfile, updateUserProfile,getAllUsers, deleteUser, updateUser, getUser } = require('../controllers/authController');
const { isSignedIn,isAdmin } = require('../middlewares/auth');

const router=require('express').Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',isSignedIn,getUserProfile);
router.put('/profile',isSignedIn,updateUserProfile);
router.get('/admin/users',isSignedIn,isAdmin,getAllUsers);
router.get('/:id',isSignedIn,isAdmin,getUser);
router.put('/admin/users/edit/:id',isSignedIn,isAdmin,updateUser)
router.delete('/admin/users/remove/:id',isSignedIn,isAdmin,deleteUser)

module.exports=router;
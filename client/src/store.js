import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer
} from "./reducer/productReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  adminUserUpdateReducer,
} from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  myorderListReducer,
  adminOrderListReducer,
  orderDeliverReducer,
  orderPayReducer,
} from "./reducer/orderReducer";
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  adminUserUpdate: adminUserUpdateReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  myorderList: myorderListReducer,
  adminOrderList: adminOrderListReducer,
  orderDeliver: orderDeliverReducer,
  productReviewCreate:productReviewCreateReducer,
  orderPay:orderPayReducer
});
const getCartFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const getUserFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAdressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initialState = {
  cart: {
    cartItems: getCartFromLocalStorage,
    shippingAddress: shippingAdressFromStorage,
  },
  userLogin: { userInfo: getUserFromLocalStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;

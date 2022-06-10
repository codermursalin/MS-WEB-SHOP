import { CART_ADD_ITEM,CART_CLEAR_ITEMS,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from "../constants/cartConstant";

export const cartReducer=(state={cartItems: [], shippingAddress: {} },action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
                const item=action.payload;
                const exists=state.cartItems.find(x=>item.id===x.id);
                if(exists){
                    return {
                        ...state,
                        cartItems:state.cartItems.map(x=>x.id===item.id?item:x)
                    }
                }
                else{
                    return {...state,cartItems:[...state.cartItems,item]}
                }
        case CART_REMOVE_ITEM:{
            console.log(action.payload)
            return {...state,
            cartItems:state.cartItems.filter(item=>item.id!==action.payload.id)}
        }
        case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
      case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
      default:
                return state;
    }
}
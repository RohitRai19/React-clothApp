import { createContext,useReducer } from "react";
import {createAction} from '../utils/firebase/reducer/reducer.utils'
const addCartItem = (cartItem, productToAdd) => {
  //find if cartItem cantains productToAdd
  const existingCartItem = cartItem.find(

    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItem.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItem, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItem, cartItemToRemove) => {
  const existingCartItem = cartItem.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItem.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  if (existingCartItem) {
    return cartItem.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearCartItem = (cartItem, cartItemToClear) =>
  cartItem.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItem: [],
  cartCount: 0,
  addItemToCart: () => {},
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartTotal: 0,
});


const CART_ACTION_TYPES={
  SET_CART_ITEMS:'SET_CART_ITEMS',
  SET_IS_CART_OPEN:'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItem: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state,action)=>{
  const{type,payload}=action;

switch(type){
  case CART_ACTION_TYPES.SET_CART_ITEMS:
    return{
      ...state,
      ...payload 
    }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return{
        ...state,
       isCartOpen:payload, 
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
}
};

export const CartProvider = ({children})=>{
  const[{cartItem,isCartOpen,cartCount,cartTotal},dispatch]=
  useReducer(cartReducer,INITIAL_STATE);


// const AddToCartAction = (itemToAdd)=>{
//   dispatch({type:'ADD_To_CART',payload: itemToAdd})
// }

const updatecartItemReducer = (newcartItem)=>{
  const newCartCount = newcartItem.reduce(
    (total,cartItem)=> total + cartItem.quantity,
    0
  )

  const newCartTotal = newcartItem.reduce(
    (total,cartItem)=> total + cartItem.quantity * cartItem.price,
    0
  );

  dispatch(
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
    {  
       cartItem:newcartItem,
      cartTotal:newCartTotal,
      cartCount:newCartCount,
    })

  )
}

  const addItemToCart = (productToAdd) => {
    const newcartItem = addCartItem(cartItem, productToAdd);
    updatecartItemReducer(newcartItem);
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newcartItem = removeCartItem(cartItem, cartItemToRemove);
    updatecartItemReducer(newcartItem);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newcartItem = clearCartItem(cartItem, cartItemToClear);
    updatecartItemReducer(newcartItem);
  };

const setIsCartOpen = (bool)=>{
  dispatch( createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool));
}
   
  const value = {
    isCartOpen,
    setIsCartOpen,
    addCartItem,
    cartItem,
    addItemToCart,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;

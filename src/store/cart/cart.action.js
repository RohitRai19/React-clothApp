import { createAction } from "../../utils/firebase/reducer/reducer.utils"
import { CART_ACTION_TYPES } from "./cart.types"


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

export const setIsCartOpen = (boolean)=>{
   return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean);
}


export const addItemToCart = (cartItem,productToAdd) => {
    const newCartItem = addCartItem(cartItem, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItem);
  };

   export const removeItemToCart = (cartItem,cartItemToRemove) => {
    const newCartItem = removeCartItem(cartItem, cartItemToRemove,);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItem);
    
  };

  export const clearItemFromCart = (cartItem,cartItemToClear) => {
    const newCartItem = clearCartItem(cartItem, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItem);
  };

// const setIsCartOpen = (bool)=>{
//   dispatch( createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool));
// }
   
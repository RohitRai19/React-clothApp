import { useContext } from 'react';
import { useNavigate } from 'react-router';
import CartContext from '../../context/cart.component';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import'./cart-dropdown.styles.scss'


const CartDropdown =()=>{
    const {cartItem} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = ()=>{
      navigate('/checkout')
    }

    
return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItem.length ? (
          cartItem.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
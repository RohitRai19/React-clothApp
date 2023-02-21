import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import'./cart-dropdown.styles.scss'


const CartDropdown =()=>{
    const cartItem = useSelector(selectCartItems);
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
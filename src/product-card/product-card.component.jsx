import { useDispatch,useSelector } from 'react-redux';
import { selectCartItems } from '../store/cart/cart.selector';
import'./product-card.styles.scss'
import Button from '../components/button/button.component'
import { addItemToCart } from '../store/cart/cart.action';


const ProductCard =({product})=> {
    const {name,price,imageUrl}= product;
    const dispatch =useDispatch();
    const cartItem = useSelector(selectCartItems)
    const addProductToCart =()=> dispatch(addItemToCart(cartItem,product));
    return(
       <div className="product-card-container">
        <img src={imageUrl} alt={`${name}`}/> 
<div className="footer">
<span className="name">{name}</span>
<span className="price">{price}</span>
</div>
<Button buttonType='inverted' onClick={addProductToCart}>Add to card</Button>
</div>
    );
};

export default ProductCard
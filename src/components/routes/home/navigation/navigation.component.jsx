import { Fragment } from "react";
import { Outlet,Link } from "react-router-dom";
import CartIcon from "../../../cart-icon/cart-icon.component";
import { ReactComponent as CrwnLogo } from '../../../../asset/crown.svg'
import { signOutUser } from "../../../../utils/firebase/firebase.utlis";
import { useSelector } from "react-redux";

import'./navigation.style.scss'
import CartDropdown from "../../../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../../../store/user/user.selector";

import {selectIsCartOpen } from'../../../../store/cart/cart.selector'

const Navigation =() =>{

 const currentUser =useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen); 

    return(
<Fragment>
    <div className="navigation">
   <Link className="logo-conatiner" to='/'>
<CrwnLogo className="logo"/>
   </Link>
   <div className="nav-links-container"> 
    <Link className="nav-link" to='Shop'>Shop</Link>
  
    { currentUser ?(<span className="nav-link" onClick={signOutUser}> SIGN OUT</span>)
    :( <Link className="nav-link" to='/auth'>Sing In</Link>)}
  
  <CartIcon/>
   </div>
    {isCartOpen && <CartDropdown/>}
    </div>
    <Outlet/>
</Fragment>
    );
}
export default Navigation;
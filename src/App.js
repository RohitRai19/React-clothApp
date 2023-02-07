import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Routes,Route} from 'react-router-dom'
import Navigation from "./components/routes/home/navigation/navigation.component";
import Home from "./components/routes/home/home.components";
import Authentication from './components/routes/home/Authentication1/authentication.component1';
import Shop from './shop/shop.component';
import Checkout from './components/routes/home/checkout/checkout.component';
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "./utils/firebase/firebase.utlis";
import { setCurrentUser } from './store/user/user.action';

const App = () => {
const dispatch = useDispatch();

  useEffect(()=>{ 
    const unsubcribe =onAuthStateChangedListener((user)=>{
    if(user){
      createUserDocumentFromAuth(user)
    }
    dispatch (setCurrentUser(user));
  });
   return unsubcribe }
   ,[dispatch]); 
  return (
    
<Routes>

  <Route path='/' element={<Navigation/>}>

  <Route index element={<Home/>}/>
  <Route path='shop/*' element={<Shop/>}/>
  <Route path='auth' element={<Authentication/>}/>
  <Route path='checkout' element={<Checkout/>}/>
  </Route>
  </Routes>
  );
};

export default App;

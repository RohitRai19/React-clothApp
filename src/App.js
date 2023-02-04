
import {Routes,Route} from 'react-router-dom'
import Navigation from "./components/routes/home/navigation/navigation.component";
import Home from "./components/routes/home/home.components";
import Authentication from './components/routes/home/Authentication1/authentication.component1';
import Shop from './shop/shop.component';
import Checkout from './components/routes/home/checkout/checkout.component';

const App = () => {
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

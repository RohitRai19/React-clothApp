import { Outlet } from 'react-router-dom';
import Directory from '../../../components/directory/directory.component'
// import Navigation from './navigation/navigation.component';




const Home = ({category}) => {
  
  return (
    <div>
      
    {/* <Navigation></Navigation> */}
   <Directory categories={category}/>
   <Outlet/>
   </div>
  );
};

export default Home;

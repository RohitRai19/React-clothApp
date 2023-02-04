import { Routes,Route } from "react-router-dom";
import './shop.style.scss'
import CategoriesPreview from "../components/routes/home/Categories-preview/Categories-preview.component";
import Category from "../components/routes/category/Category.component";

const Shop = () => {
  return (
<Routes>
  <Route index element={<CategoriesPreview/>}/>
  <Route path=":category" element={<Category/>}/>
</Routes>

  );
};

export default Shop;

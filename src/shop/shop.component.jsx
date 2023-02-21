import {useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import './shop.style.scss'
import CategoriesPreview from "../components/routes/home/Categories-preview/Categories-preview.component";
import Category from "../components/routes/category/Category.component";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utlis";
import { setCategories } from "../store/categories/category.action";

const Shop = () => {
  const dispatch =useDispatch()
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoryArray));
    };
    getCategoriesMap();
  }, [dispatch]);
  return (
<Routes>
  <Route index element={<CategoriesPreview/>}/>
  <Route path=":category" element={<Category/>}/>
</Routes>

  );
};

export default Shop;

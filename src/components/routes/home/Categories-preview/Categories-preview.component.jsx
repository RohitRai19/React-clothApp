import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../../../context/categories.context";
import CategoryPreview from "../../../category-preview/Category-preview.component";

const CategoriesPreview = () => {
  const {categoriesMap}=useContext(CategoriesContext)

  return (
  <Fragment>
      {Object.keys(categoriesMap).map((title) => {
    const products = categoriesMap[title];
return (<CategoryPreview key={title} title={title} products={products}/>);

})}
</Fragment>
  );
};

export default CategoriesPreview;

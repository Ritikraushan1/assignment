// Context.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import {ProductAPI} from '../api/ProductAPI';

const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await ProductAPI.getProductscategory();
    setCategories(response.data);
  };

  const fetchSubcategories = async categoryId => {
    const response = await ProductAPI.getProductsSubcategory({
      parentId: categoryId,
    });
    setSubcategories(response.data.subCategories);
  };

  const fetchProducts = async subcategoryId => {
    console.log('sub category id', subcategoryId);
    const response = await ProductAPI.getProductsDataBycategory({
      subId: subcategoryId.id,
    });
    setProducts(response.data.products);
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        selectedCategory,
        setSelectedCategory,
        subcategories,
        selectedSubcategory,
        setSelectedSubcategory,
        products,
        fetchSubcategories,
        fetchProducts,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

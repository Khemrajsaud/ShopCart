import React from 'react';
import { getAllBrands, getCategories } from '@/sanity/lib/queries';
import Shop from '@/components/Shop';

const ShopPage = async () => {
  const categories = await getCategories();
  const brandsResponse = await getAllBrands(); 
  const brands = 'data' in brandsResponse ? brandsResponse.data : []; 
  console.log(brands);
  

  return (
    <div>
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;

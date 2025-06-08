import Container from "@/components/Container";
import React from "react";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import HomeCategories from "@/components/HomeCategories";
import { getCategories } from "@/sanity/lib/queries";
import ShopByBrands from "@/components/ShopByBrands";
import LatestBlog from "@/components/LatestBlog";

const page = async() => {
  const categories = await getCategories(6);

  
  return (
    <Container className="bg-shop_light-pink">
      <HomeBanner />
    
        <ProductGrid />
       <HomeCategories categories = {categories}/>
       <ShopByBrands/>
       <LatestBlog/>
      
    </Container>
  );
};

export default page;

import { Title } from "@/components/text";
import { getDealProducts } from "@/sanity/lib/queries";
import Container from "@/components/Container";

import React from "react";

import ProductCart from "@/components/ProductCart";
import { Any } from "next-sanity";


const DealPage = async () => {
  const products = await getDealProducts();
  console.log(products);

  return (
    <div className="py-10 bg-deal_bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoratio-[1px] text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products.map((product:Any) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </div>
        
      </Container>
    </div>
  );
};

export default DealPage;

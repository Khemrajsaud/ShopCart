import Container from "@/components/Container";
import React from "react";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";

const page = () => {
  return (
    <Container className="">
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
      </div>
    </Container>
  );
};

export default page;

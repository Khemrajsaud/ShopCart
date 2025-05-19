import Link from "next/link";
import React from "react";
import { Title } from "./text";
import banner_1 from "@/images/banner/banner_1.png";
import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-shop_ight_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <Title>
          Grape Up to 50% Of On <br />
          Selected Headphone
        </Title>
        
        <Link
          href={"/shop"}
          className="bg-shop_dark_green rounded-md px-5 text-sm hover:bg-shop_dark_green hoverEffect text-white/90 font-semibold py-2 "
        >
          Buy Now
        </Link>
      </div>
      <div>
        <Image src={banner_1} alt="banner_1" className="hidden md:inline-flex w-50"/>
      </div>
    </div>
  );
};

export default HomeBanner;

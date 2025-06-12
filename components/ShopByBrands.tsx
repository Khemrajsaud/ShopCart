
import React from "react";
import { Title } from "./text";
import Link from "next/link";
import Image from "next/image";
import { getAllBrands } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";


// Define the brand type based on the fetched data
type Brand = {
  _id: string;
  slug: { current: string };
  image?: { asset: { url: () => string } };
  name?: string;
};

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },

];

const ShopByBrands = async () => {
  const response = await getAllBrands();
  const brands = response?.data ?? []; // Extract the 'data' property


  return (
    <div className="mb-10 lg:mb-20 bg-shop_lighter_bg p-5 lg:p-7">
      {/* Header */}
      <div className="flex items-center justify-between gap-5 mb-10">
        <Title className="text-2xl">Shop By Brand</Title>
        <Link
          href="/shop"
          className="text-sm font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          View all
        </Link>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {Array.isArray(brands) && brands.length > 0 ? (
          brands.map((brand: Brand) => (
            <Link
              key={brand?._id || ""}
              href={`/brand/${brand?.slug?.current}`}
              className="bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_dark_green/20 hoverEffect"
            >
              {brand?.image ? (
                <Image
                  src={urlFor(brand.image).url()}
                  alt={brand?.name || "Brand"}
                  width={250}
                  height={250}
                  className="w-32 h-20 object-contain"
                />
              ) : (
                <span className="text-sm text-gray-500">No Image</span>
              )}
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full">No brands found</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-shop_light_green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop_light_green"
          >
            <span className="inline-flex scale-100 group-hover:scale-100 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">

              <p className="text-darkColor/80 font-bold capitalize">{item?.title}</p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default ShopByBrands;

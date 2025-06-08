import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import AddToWishilistButton from "./AddToWishilistButton";
import { Title } from "./text";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCart = ({ product }: { product: Product }) => {
  const firstImage = product?.images?.[0];

  const hasValidImage =
    firstImage &&
    typeof firstImage === "object" &&
    firstImage.asset &&
    firstImage.asset._ref;

  return (
    <div className="text-sm border-[1px] border-dark_blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden bg-shop_btn_dark_green ">
        {hasValidImage ? (
          <Link href={`/product/${product?.slug?.current}`}>
          <Image
            src={urlFor(firstImage).url()}
            alt="Product Image"
            loading="lazy"
            width={800}
            height={800}
            className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop_lighter_bg hoverEffect ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
          </Link>
        ) : (
          <div>No image available</div>
        )}
        {product?.brand === "new" && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect">
            New!
          </p>
        )}

        {product?.brand === "sale" && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect">
            Sale!
          </p>
        )}
        <AddToWishilistButton product={product} />

        {product?.brand === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2 ">
     
        {product?.categories &&
          product.categories.map((cat, index) => (
            <p
              className=" uppercase line-clamp-1 text-xs text-shop_light_text"
              key={index}
            >
              {cat.title}
            </p>
          ))}
        <Title className="text-sm line-clamp-1">{product?.name}</Title>
        <div className="flex items-center gap-4">
          <div className=" flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={13}
                className={
                  index < 4 ? "text-shop_light_green" : "text-shop_light_text"
                }
                fill={index < 4 ? "#93D991" : "ababab"}
              />
            ))}
          </div>
          <p className="text-shop_lighter_text text-xs tracking-wide">
            5 Review
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className={`${product?.stock === 0 ? "text-red-600": "text-shop_light_green font-semibold"}`}>In Stock</p>


          <p className={`text-shop_light_green font-semibold`}>
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>
        <PriceView price={product?.price}
        discount={product?.discount}
        className="text-sm"
        />
        <AddToCartButton  product={product} className="w-full rounded-full"/>
      </div>
    </div>
  );
};

export default ProductCart;

"use client";
import React, { useState } from "react";
import useStore from "@/store";
import Container from "./Container";
import { Heart, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";

import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";
import { urlFor } from "@/sanity/lib/image";

const WishListProducts = () => {
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const [visibleProducts, setVisibleProducts] = useState(7);

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishilist = ()=> {
    const confirmReset = window.confirm ("Are you sure you want to reset your wishlist?"
     ); if(confirmReset){
            resetFavorite();
            toast.success("wishlist reset successfully");
        }
        
  }
  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <>
          <div className=" overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b">
                <tr className="bg-black/5">
                  <th className="p-2 text-left">Images</th>
                  <th className="p-2 text-left hidden md:table-cell">
                    {" "}
                    Category
                  </th>
                  <th className="p-2 text-left hidden md:table-cell">Type</th>
                  <th className="p-2 text-left  hidden md:table-cell">
                    Status
                  </th>
                        <th className="p-2 text-center md:text-left">Price</th>
                  <th className="p-2 text-center md:text-left">Action</th>{" "}
                </tr>
              </thead>

              <tbody>
                {favoriteProduct
                  ?.slice(0, visibleProducts)
                  ?.map((product: Product) => (
                    <tr key={product?._id} className="border-b">
                      <td className=" px-2 py-4 flex items-center gap-2">
                        <X
                          onClick={() => {
                            removeFromFavorite(product?._id);

                            toast.success("Product removed from wishlist");
                          }}
                          size={18}
                          className="hover:text-red-600 hover:cursor-pointer hoverEffect"
                        />

                        {product?.images && (
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="border rounded-md group hidden md:inline-flex"
                          >
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt={"product image"}
                              width={50}
                              height={50}
                              className=" rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain"
                            />
                          </Link>
                        )}

                        <p className="line-clamp-1 ">{product?.name}</p>
                      </td>
                      {/* <td className="p-2 capitalize hidden md:table-cell">
                        {product?.categories && (
                          <p>
                            {product.categories.map((cat) => cat.title).join(",")}
                          </p>
                        )}
                      </td> */}

                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.categories && (
                          <p>
                            {product.categories
                              .map((cat) => cat)
                              .join(", ")}
                          </p>
                        )}
                      </td>

                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.variant}
                      </td>
                      <td
                        className={`p-2 w-24 ${
                          (product?.stock as number) > 0
                            ? "text-green-600"
                            : "text-red-600"
                        } font-medium text-sm hidden md:table-cell
                      `}
                      >
                        {(product?.stock as number) > 0
                          ? "In Stock"
                          : "Out of stock"}
                      </td>

                      <td className=" p-2">
                        <PriceFormatter amount={product?.price} />
                      </td>
                      <td className="p-2">
                        <AddToCartButton product={product} className="w-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2">

            {visibleProducts < favoriteProduct?.length && (
            <div className="mt-5">
              <Button variant="outline" onClick={loadMore}>
                Load More
              </Button>
            </div>
          )}

          {visibleProducts > 8 && (
            <div className="my-5">
                <Button onClick={()=> setVisibleProducts(8) } variant="outline">Load Less</Button>


            </div>
          )}

          
          </div>
          {favoriteProduct?.length>0 && (
            <Button onClick={handleResetWishilist} className="mb-5  " variant="destructive" size="lg"> Reset Wishlist</Button>
          )}
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 animate-ping rounded-full bg-muted-forground/20">
              <Heart
                className="h-12 w-12 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-muted-foreground">
                Item added to your wishlist will appear here
              </p>
            </div>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default WishListProducts;

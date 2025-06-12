"use client";

import React, { useState, useEffect } from "react";
import useStore from "@/store";
import { ShoppingBag, Trash } from "lucide-react";
import NoAccess from "@/components/NoAccess";
import EmptyCart from "@/components/EmptyCart";
import { Title } from "@/components/text";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import AddToWishilistButton from "@/components/AddToWishilistButton";
import toast from "react-hot-toast";
import PriceFormatter from "@/components/PriceFormatter";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/nextjs";
import QuantityButton from "@/components/QuentityButton";
import { client } from "@/sanity/lib/client";
import { Address } from "@/sanity.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

const CartPage = () => {
  const { deleteCartProduct, resetCart, getSubTotalPrice, getTotalPrice } =
    useStore();
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      setSelectedAddress(defaultAddress || data[0] || null);
    } catch (error) {
      console.error("Address fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchAddress();
  }, []);

  const handleResetCart = () => {
    if (window.confirm("Are you sure you want to reset your cart?")) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName || "Unknown",
        customerEmail: user?.primaryEmailAddress?.emailAddress || "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress ? JSON.stringify(selectedAddress) : null,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: groupedItems, metadata }),
      });

      const session = await res.json();
      if (session?.url) {
        window.location.href = session.url;
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="bg-gray-50 pb-20">
      {isSignedIn ? (
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
          {groupedItems && groupedItems.length > 0 ? (
            <>
              <div className="flex items-center gap-2 py-4">
                <ShoppingBag className="text-darkColor" />
                <Title className="text-base sm:text-lg">Shopping Cart</Title>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg border">
                  {groupedItems.map((item, index) => {
                    const { product, quantity } = item;
                    const productId = product?._id || `product-${index}`;
                    const productUrl = product?.images?.[0]?.asset?._ref
                      ? urlFor(product.images[0].asset._ref).url()
                      : null;

                    return (
                      <div
                        key={productId}
                        className="border-b p-4 flex flex-col sm:flex-row gap-4"
                      >
                        {productUrl ? (
                          <Link href={`/product/${product?.slug?.current}`}>
                            <Image
                              src={productUrl}
                              alt="product image"
                              width={100}
                              height={140}
                              className="object-cover rounded-md hover:scale-105 transition"
                            />
                          </Link>
                        ) : (
                          <div className="w-32 h-40 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded-md">
                            No Image
                          </div>
                        )}

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="space-y-1 text-sm sm:text-base">
                            <h2 className="font-semibold">{product?.name}</h2>
                            <p className="text-gray-600">
                              Variant: <strong>{product?.variant}</strong>
                            </p>
                            <p className="text-gray-600">
                              Status: <strong>{product?.status}</strong>
                            </p>
                            <p className="text-gray-600">
                              Quantity: <strong>{quantity}</strong>
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AddToWishilistButton product={product} />
                                </TooltipTrigger>
                                <TooltipContent className="bg-black text-white text-xs p-2 rounded">
                                  Add to Favorite
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => {
                                      deleteCartProduct(productId);
                                      toast.success(
                                        "Product deleted successfully!"
                                      );
                                    }}
                                    className="p-2 rounded-full hover:bg-red-600 hover:text-white transition"
                                  >
                                    <Trash className="w-5 h-5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="text-xs">
                                  Delete Product
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between sm:items-end">
                          <PriceFormatter
                            amount={(product?.price || 0) * quantity}
                            className="text-sm sm:text-base font-medium"
                          />
                          <QuantityButton product={product} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="p-4">
                    <Button
                      onClick={handleResetCart}
                      className="w-full sm:w-auto"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border text-sm sm:text-base">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <div className="flex justify-between font-semibold text-base sm:text-lg">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} />
                      </div>
                      <Button
                        className="w-full rounded-full tracking-wide text-sm sm:text-base"
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? "Please wait..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>

                  {addresses && (
                    <Card className="bg-white rounded-md">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">
                          Delivery Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          defaultValue={addresses
                            .find((addr) => addr.default)
                            ?._id.toString()}
                        >
                          {addresses.map((address) => (
                            <div
                              key={address._id}
                              onClick={() => setSelectedAddress(address)}
                              className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                                selectedAddress?._id === address._id
                                  ? "text-shop_dark_green"
                                  : ""
                              }`}
                            >
                              <RadioGroupItem value={address._id.toString()} />
                              <Label className="grid gap-1.5 flex-1">
                                <span className="font-semibold">
                                  {address.name}
                                </span>
                                <span className="text-xs text-black/60">
                                  {address.address}, {address.city},{" "}
                                  {address.zip}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <Button
                          variant="outline"
                          className="w-full mt-4 text-sm sm:text-base"
                        >
                          Add New Address
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </div>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;

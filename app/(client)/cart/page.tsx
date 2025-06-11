// "use client";

// import React, { useState, useEffect } from "react";
// import useStore from "@/store";
// import { ShoppingBag, Trash } from "lucide-react";
// import NoAccess from "@/components/NoAccess";
// import EmptyCart from "@/components/EmptyCart";
// import { Title } from "@/components/text";
// import Link from "next/link";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@radix-ui/react-tooltip";
// import AddToWishilistButton from "@/components/AddToWishilistButton";
// import toast from "react-hot-toast";
// import PriceFormateer from "@/components/PriceFormateer";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@clerk/nextjs";
// import QuentityButton from "@/components/QuentityButton";
// import PriceFormatter from "@/components/PriceFormatter";
// import { client } from "@/sanity/lib/client";
// import { Address } from "@/sanity.types";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
// import { Label } from "@radix-ui/react-label";
// import { useUser } from "sanity";
// import { Metadata } from "next";

// const CartPage = () => {
//   const {
//     deleteCartProduct,
//     getItemCount,
//     resetCart,
//     getSubTotalPrice,
//     getTotalPrice,
//   } = useStore();
//   const groupedItems = useStore((state) => state.getGroupedItems());
//   const { isSignedIn } = useAuth();
//   const user = useUser()

//   const [isClient, setIsClient] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [addresses, setAddresses] = useState<Address[] | null>(null);
//   const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

//   const fetchAddress = async () => {
//     setLoading(true);
//     try {
//       const query = `*[_type=="address"] | order(publishedAt desc)`;
//       const data = await client.fetch(query);
//       setAddresses(data);

//       const defaultAddress = data.find((addr: Address) => addr.default);
//       if (defaultAddress) {
//         setSelectedAddress(defaultAddress);
//       } else if (data.length > 0) {
//         setSelectedAddress(data[0]);
//       }
//     } catch (error) {
//       console.error("Address fetching error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setIsClient(true);
//     fetchAddress();
//   }, []);

//   const handleResetCart = () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to reset your cart?"
//     );
//     if (confirmed) {
//       resetCart();
//       toast.success("Cart reset successfully!");
//     }
//   };

//   if (!isClient) return null;

//   const handleCheckout=()=>{
//     setLoading(true)
//     try {
//       const metadata:Metadata = {
//         orderNumber: crypto.randomUUID(),
//         customerName: user?.fullName ?? "Unknown",
//         customerEmail: user?.emailAddress[0]?.emailAddress ?? "Unknown",
//         clerkUserId: user?.id,
//         address: selectedAddress,
//       }
      
//     } catch (error) {
//       console.error("Error creating checkout session:",error);
      
      
//     }finally{
//       setLoading(false)
//     }

//   }

//   return (
//     <div className="bg-gray-50 pb-20">
//       {isSignedIn ? (
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           {groupedItems && groupedItems.length > 0 ? (
//             <>
//               <div className="flex items-center gap-2 py-5">
//                 <ShoppingBag className="text-darkColor" />
//                 <Title>Shopping Cart</Title>
//               </div>
//               <div className="grid lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-2 bg-white rounded-lg border">
//                   {groupedItems.map((item, index) => {
//                     const { product, quantity } = item;
//                     const productId = product?._id || `product-${index}`;
//                     const productUrl = product?.images?.[0]?.asset?._ref
//                       ? urlFor(product.images[0].asset._ref).url()
//                       : null;

//                     return (
//                       <div
//                         key={productId}
//                         className="border-b p-4 flex flex-col md:flex-row gap-4"
//                       >
//                         {productUrl ? (
//                           <Link href={`/product/${product?.slug?.current}`}>
//                             <Image
//                               src={productUrl}
//                               alt="product image"
//                               width={100}
//                               height={140}
//                               className="object-cover hover:scale-105 transition"
//                             />
//                           </Link>
//                         ) : (
//                           <div className="w-40 h-60 bg-gray-100 flex items-center justify-center">
//                             No Image
//                           </div>
//                         )}

//                         <div className="flex-1 flex flex-col justify-between">
//                           <div>
//                             <h2 className="text-lg font-bold">
//                               {product?.name}
//                             </h2>
//                             <p className="text-sm text-gray-600">
//                               Variant: <strong>{product?.variant}</strong>
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               Status: <strong>{product?.status}</strong>
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               Quantity: <strong>{quantity}</strong>
//                             </p>
//                           </div>

//                           <div className="flex items-center gap-2 mt-2">
//                             <TooltipProvider>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <AddToWishilistButton
//                                     product={product}
//                                     className="relative top-0 right-0"
//                                   />
//                                 </TooltipTrigger>
//                                 <TooltipContent className="bg-black text-white rounded-md p-2">
//                                   Add to Favorite
//                                 </TooltipContent>
//                               </Tooltip>
//                               <Tooltip>
//                                 <TooltipTrigger asChild>
//                                   <button
//                                     onClick={() => {
//                                       deleteCartProduct(productId);
//                                       toast.success(
//                                         "Product deleted successfully!"
//                                       );
//                                     }}
//                                     className="p-2.5 rounded-full hover:bg-red-600 hover:text-white transition"
//                                   >
//                                     <Trash className="w-5 h-5" />
//                                   </button>
//                                 </TooltipTrigger>
//                                 <TooltipContent>Delete Product</TooltipContent>
//                               </Tooltip>
//                             </TooltipProvider>
//                           </div>
//                         </div>

//                         <div className="flex flex-col justify-between">
//                           <PriceFormateer
//                             amount={(product?.price || 0) * quantity}
//                             className="text-base md:text-lg font-semibold"
//                           />
//                           <QuentityButton product={product} />
//                         </div>
//                       </div>
//                     );
//                   })}
//                   <div className="p-4">
//                     <Button onClick={handleResetCart}>Reset Cart</Button>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="lg:col-span-1">
//                     <div className="hidden md:inline-block w-full bg-white p-4 rounded-lg border">
//                       <h2 className="text-xl font-semibold mb-4">
//                         Order Summary
//                       </h2>

//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <span>SubTotal</span>
//                           <PriceFormatter amount={getSubTotalPrice()} />
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span>Discount</span>
//                           <PriceFormatter
//                             amount={getSubTotalPrice() - getTotalPrice()}
//                           />
//                         </div>
//                         <div className="flex items-center justify-between font-semibold text-lg">
//                           <span>Total</span>
//                           <PriceFormatter amount={getTotalPrice()} />
//                         </div>
//                         <Button
//                           className="w-full rounded-full font-semibold tracking-wide hoverEffect"
//                           size="lg"
//                           disabled={loading}
//                           onClick={handleCheckout}
//                         >
//                           {loading ? "Please wait...": "Processed to checkout"}
                          
//                         </Button>
//                       </div>
//                     </div>
//                   </div>

//                   {addresses && (
//                     <div className="bg-white rounded-md mt-5">
//                       <Card>
//                         <CardHeader>
//                           <CardTitle>Delivery Address</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <RadioGroup
//                             defaultValue={addresses
//                               .find((addr) => addr.default)
//                               ?._id.toString()}
//                           >
//                             {addresses.map((address) => (
//                               <div
//                                 key={address._id}
//                                 onClick={() => setSelectedAddress(address)}
//                                 className={`flex items-center space-x-2 mb-4 cursor-pointer ${
//                                   selectedAddress?._id === address._id
//                                     ? "text-shop_dark_green"
//                                     : ""
//                                 }`}
//                               >
//                                 <RadioGroupItem
//                                   value={address._id.toString()}
//                                 />
//                                 <Label
//                                   htmlFor={`address-${address._id}`}
//                                   className="grid gap-1.5 flex-1"
//                                 >
//                                   <span className="font-semibold">
//                                     {address.name}
//                                   </span>
//                                   <span className="text-sm text-black/60">
//                                     {address.address}, {address.city},{" "}
//                                     {address.zip}
//                                   </span>
//                                 </Label>
//                               </div>
//                             ))}
//                           </RadioGroup>
//                           <Button variant="outline" className="w-full mt-4">
//                             Add New Address
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   )}
//                 </div>

//                 <div className="md:hidden flex bottom-0 left-0 w-full bg-white pt-2">
//                   <div className="bg-white p-4 rounded-lg border mx-4">
//                     <h2>Order Summary</h2>
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <span>SubTotal</span>
//                           <PriceFormatter amount={getSubTotalPrice()} />
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span>Discount</span>
//                           <PriceFormatter
//                             amount={getSubTotalPrice() - getTotalPrice()}
//                           />
//                         </div>
//                         <div className="flex items-center justify-between font-semibold text-lg">
//                           <span>Total</span>
//                           <PriceFormatter amount={getTotalPrice()} />
//                         </div>
//                         <Button
//                           className="w-full rounded-full font-semibold tracking-wide hoverEffect"
//                           size="lg"
//                            disabled={loading}
//                           onClick={handleCheckout}
                        
//                         >
                         
//                           {loading ? "Please wait...": "Processed to checkout"}
//                         </Button>
//                       </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <EmptyCart />
//           )}
//         </div>
//       ) : (
//         <NoAccess />
//       )}
//     </div>
//   );
// };

// export default CartPage;


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
  const {
    deleteCartProduct,
    // getItemCount,
    resetCart,
    getSubTotalPrice,
    getTotalPrice,
  } = useStore();
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
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
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
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

//   const handleCheckout = async () => {
//     setLoading(true);
//     try {
//       const metadata = {
//         orderNumber: crypto.randomUUID(),
//         customerName: user?.fullName || "Unknown",
//         customerEmail: user?.primaryEmailAddress?.emailAddress || "Unknown",
//         clerkUserId: user?.id,
//         address: selectedAddress,
//       };

//       // const res = await fetch("/api/checkout", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify({ cart: groupedItems, metadata }),
//       // });


//       const res = await fetch("/api/checkout", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ cart: groupedItems, metadata }),
// });

//       const session = await res.json();

//       if (session?.url) {
//         window.location.href = session.url;
//       } else {
//         toast.error("Failed to create checkout session");
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//       toast.error("An error occurred during checkout");
//     } finally {
//       setLoading(false);
//     }
//   };

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
        <div className="max-w-6xl mx-auto px-4 py-8">
          {groupedItems && groupedItems.length > 0 ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-darkColor" />
                <Title>Shopping Cart</Title>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
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
                        className="border-b p-4 flex flex-col md:flex-row gap-4"
                      >
                        {productUrl ? (
                          <Link href={`/product/${product?.slug?.current}`}>
                            <Image
                              src={productUrl}
                              alt="product image"
                              width={100}
                              height={140}
                              className="object-cover hover:scale-105 transition"
                            />
                          </Link>
                        ) : (
                          <div className="w-40 h-60 bg-gray-100 flex items-center justify-center">
                            No Image
                          </div>
                        )}

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h2 className="text-lg font-bold">
                              {product?.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                              Variant: <strong>{product?.variant}</strong>
                            </p>
                            <p className="text-sm text-gray-600">
                              Status: <strong>{product?.status}</strong>
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantity: <strong>{quantity}</strong>
                            </p>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AddToWishilistButton
                                    product={product}
                                    className="relative top-0 right-0"
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="bg-black text-white rounded-md p-2">
                                  Add to Favorite
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => {
                                      deleteCartProduct(productId);
                                      toast.success("Product deleted successfully!");
                                    }}
                                    className="p-2.5 rounded-full hover:bg-red-600 hover:text-white transition"
                                  >
                                    <Trash className="w-5 h-5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>Delete Product</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <PriceFormatter
                            amount={(product?.price || 0) * quantity}
                            className="text-base md:text-lg font-semibold"
                          />
                          <QuantityButton product={product} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="p-4">
                    <Button onClick={handleResetCart}>Reset Cart</Button>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} />
                      </div>
                      <Button
                        className="w-full rounded-full font-semibold tracking-wide"
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? "Please wait..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {addresses && (
                    <Card className="bg-white rounded-md mt-5">
                      <CardHeader>
                        <CardTitle>Delivery Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          defaultValue={addresses.find((addr) => addr.default)?._id.toString()}
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
                                <span className="font-semibold">{address.name}</span>
                                <span className="text-sm text-black/60">
                                  {address.address}, {address.city}, {address.zip}
                                </span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <Button variant="outline" className="w-full mt-4">
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


// "use client";

// import React, { useState } from "react";
// import useStore from "@/store";
// // import { useUser } from "sanity";
// // import { Address } from "@/sanity.types";
// import { Container, ShoppingBag, Trash } from "lucide-react";
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
// import QuentityButton from "@/components/QuentityButton";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@clerk/nextjs";

// const CartPage = () => {
//   const {
//     deleteCartProduct,
//     // getTotalPrice,
//     getItemCount,
//     // getSubTotalPrice,
//     resetCart,
//   } = useStore();

//   const [isClient, setIsClient] = useState(false);
//   // const { loading, setLoading } = useState(false);
//   // const groupeItems = useStore((state) => state.getGroupedItems());

//   const groupeItems = useStore((state) => state.getGroupedItems());

//   console.log(groupeItems);

//   const { isSignedIn } = useAuth();
//   // const { user } = useUser();
//   // const [address, setAddresses] = useState<

//   // const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

//   const hadleLeResetCart = () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to reset your cart?"
//     );
//     if (confirmed) {
//       resetCart();
//       toast.success("Cart reset successfully!");
//     }
//   };

//   return (
//     <div className="bg-gray-50 pb-52 md:pb-10">
//       {isSignedIn ? (
//         <Container>
//           {groupeItems?.length ? (
//             <>
//               <div className=" flex items-center gap-2 py-5">
//                 <ShoppingBag className="text-darkColor" />
//                 <Title>Shopping Cart</Title>
//               </div>

//               <div className="grid lg:grid-cols-3 md:gap-8">
//                 <div className=" lg:col-span-2 rounded-lg">
//                   <div className=" border bg-white rounded-md">
//                     {groupeItems?.map(({ product }) => {
//                       const itemCount = getItemCount(product?._id);
//                       return (
//                         <div
//                           key={product?._id}
//                           className="border-b p-2.5 last:border-b-0 flex items-center  justify-between gap-5"
//                         >
//                           <div
//                             className="flex flex-1 items-start gap-2 h-26 md:h-44
//                 "
//                           >
//                             {product?.images && (
//                               <Link
//                                 className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
//                                 href={`/product/${product?.slug?.current}`}
//                               >
//                                 <Image
//                                   // src={urlFor(product?.images[0].url())}
//                                   src={urlFor(product?.images[0]).url()}
//                                   alt="productImage "
//                                   width={500}
//                                   height={500}
//                                   loading="lazy"
//                                   className="w-32 md:w-40 h-32 md:h-60 object-cover group-hover:scale-105 hoverEffect"
//                                 />
//                               </Link>
//                             )}

//                             <div className=" h-full flex flex-1 flex-col justify-between py-1">
//                               <div className="flex flex-col gap-o.5 md:gap-1.5">
//                                 <h2 className="text-base font-semibold line-clamp-1 ">
//                                   {product?.name}
//                                 </h2>
//                                 <p className="text-sm capitalize">
//                                   Variant: {""}{" "}
//                                   <span className="font-semibold">
//                                     {product?.variant}
//                                   </span>
//                                 </p>
//                                 <p className="text-sm capitalize">
//                                   Status: {""}{" "}
//                                   <span className="font-semibold">
//                                     {product?.status}
//                                   </span>
//                                 </p>
//                               </div>
//                             </div>
//                             <div>
//                               <TooltipProvider>
//                                 {/* <Tooltip>
//                                   <TooltipTrigger>
//                                     <AddToWishilistButton
//                                       product={product}
//                                       className="relative top-0 right-0"
//                                     />
//                                   </TooltipTrigger>

//                                   <TooltipContent className="font-bold">
//                                     Add to Fovrite
//                                   </TooltipContent>
//                                 </Tooltip> */}

//                                 <Tooltip>
//                                   <TooltipTrigger asChild>
//                                     <AddToWishilistButton
//                                       product={product}
//                                       className="relative top-0 right-0"
//                                     />
//                                   </TooltipTrigger>
//                                   <TooltipContent>
//                                     Add to Favorite
//                                   </TooltipContent>
//                                 </Tooltip>

//                                 <Tooltip>
//                                   <TooltipTrigger>
//                                     <Trash
//                                       onClick={() => {
//                                         deleteCartProduct(product?._id);
//                                         toast.success(
//                                           "Product deleted successfully!"
//                                         );
//                                       }}
//                                       className="w-4 h-4 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
//                                     />
//                                   </TooltipTrigger>
//                                   <TooltipContent className=" font-bold bg-red-600">
//                                     Delete product
//                                   </TooltipContent>
//                                 </Tooltip>
//                               </TooltipProvider>
//                             </div>
//                           </div>
//                           <div className=" flex flex-col items-start justify-between h-36 md:p-1 md:h-44">
//                             <PriceFormateer
//                               amount={(product?.price as number) * itemCount}
//                               className="text-base md:text-lg font-semibold"
//                             />
//                             <QuentityButton product={product} />
//                           </div>
//                         </div>
//                       );
//                     })}

//                     <Button onClick={hadleLeResetCart}>Reset</Button>
//                   </div>
//                 </div>
//                 <div>summary</div>
//               </div>
//             </>
//           ) : (
//             <EmptyCart />
//           )}
//         </Container>
//       ) : (
//         <NoAccess />
//       )}
//     </div>
//   );
// };

// export default CartPage;

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
// // import { useUser } from "sanity";
// import { client } from "@/sanity/lib/client";
// import { Address } from "@/sanity.types";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
// import { Label } from "@radix-ui/react-label";

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

//   const [isClient, setIsClient] = useState(false);
//   const { loading, setLoading } = useState(false);
//   // const { user } = useUser();
//   const [addresses, setAddresses] = useState<Address[] | null>(null);
//   const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

//   const fetchAddress = async () => {
//     setLoading(true);
//     try {
//       const query = `*[_type=="address"]| order(publishedAt desc)`;
//       const data = await client.fetch(query);
//       setAddresses(data);

//       const defaultAddress = data.find((addr: Address) => addr.default);
//       if (defaultAddress) {
//         setSelectedAddress(defaultAddress);
//       } else if (data.length > 0) {
//         setSelectedAddress(data[0]);
//       }
//     } catch (error) {
//       console.log("Address fetching error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setIsClient(true);
//     fetchAddress();
//   });

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

//   return (
//     <div className="bg-gray-50 pb-20">
//       {/* {true ? ( // For testing bypassing isSignedIn */}
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
//                     const itemCount = getItemCount(productId);
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
//                               className=" object-cover hover:scale-105 transition"
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

//                           <div className="flex items-center  gap-2 mt-2">
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

//                 <div className="">
//                   <div className="lg:col-span-1">
//                     <div className="hidden md:inline-block w-full bg-white p-4 rounded-lg border">
//                       <h2 className="text-xl font-semibold mb-4">
//                         Order Summary
//                       </h2>

//                       <div className="space-y-4 ">
//                         <div className="flex items-center justify-between">
//                           <span>SubTotal</span>
//                           <PriceFormatter amount={getSubTotalPrice} />
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span>Discount</span>
//                           <PriceFormatter
//                             amount={getSubTotalPrice() - getTotalPrice()}
//                           />
//                         </div>

//                         <div className=" flex items-center justify-between font-semibold text-lg">
//                           <span>Total</span>
//                           <PriceFormatter amount={getTotalPrice()} />
//                         </div>

//                         <Button
//                           className=" w-full rounded-full font-semibold tracking-wide hoverEffect"
//                           size="lg"
//                         >
//                           {/* {loading ? "Please wait..."? : "Proceed to Checkout"} */}
//                           process
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
//                           <RadioGroup defaultValue={addresses?.find((addr)=> addr.default)?._id.toString}>
//                             {addresses?.map((address) => (
//                               <div key={address?._id}
//                               onClick={()=> setSelectedAddress(address)}
//                               className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?.-id === address?._id && "text-shop_dark_green"}`}
                              
//                               >
//                                 <RadioGroupItem
//                                   value={address?._id.toString()}
//                                 />
//                                 <Label htmlFor={`address-${address._id}`}
                                
//                                 className="grid gap-1.5 flex-1">
//                                   <span className="font-semibold">

//                                     {address?.name}
                                  
//                                   </span>
//                                   <span className="text-sm text-black/60">
//                                     {address.address}, {address.city}, {""}
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

//                 {/* order summary for mobile view */}
//                 <div className="md:hidden flex bottom-0 left-0 w-full bg-white pt-2">
//                   <div className="bg-white p-4 rounded-lg border mx-4">
//                     <h2>Order Summary</h2>
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
import PriceFormateer from "@/components/PriceFormateer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import QuentityButton from "@/components/QuentityButton";
import PriceFormatter from "@/components/PriceFormatter";
import { client } from "@/sanity/lib/client";
import { Address } from "@/sanity.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

const CartPage = () => {
  const {
    deleteCartProduct,
    getItemCount,
    resetCart,
    getSubTotalPrice,
    getTotalPrice,
  } = useStore();
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();

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
    const confirmed = window.confirm("Are you sure you want to reset your cart?");
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
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
                            <h2 className="text-lg font-bold">{product?.name}</h2>
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
                          <PriceFormateer
                            amount={(product?.price || 0) * quantity}
                            className="text-base md:text-lg font-semibold"
                          />
                          <QuentityButton product={product} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="p-4">
                    <Button onClick={handleResetCart}>Reset Cart</Button>
                  </div>
                </div>

                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden md:inline-block w-full bg-white p-4 rounded-lg border">
                      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>SubTotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Discount</span>
                          <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                        </div>
                        <div className="flex items-center justify-between font-semibold text-lg">
                          <span>Total</span>
                          <PriceFormatter amount={getTotalPrice()} />
                        </div>
                        <Button className="w-full rounded-full font-semibold tracking-wide hoverEffect" size="lg">
                          Process
                        </Button>
                      </div>
                    </div>
                  </div>

                  {addresses && (
                    <div className="bg-white rounded-md mt-5">
                      <Card>
                        <CardHeader>
                          <CardTitle>Delivery Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RadioGroup defaultValue={addresses.find((addr) => addr.default)?._id.toString()}>
                            {addresses.map((address) => (
                              <div
                                key={address._id}
                                onClick={() => setSelectedAddress(address)}
                                className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                                  selectedAddress?._id === address._id ? "text-shop_dark_green" : ""
                                }`}
                              >
                                <RadioGroupItem value={address._id.toString()} />
                                <Label htmlFor={`address-${address._id}`} className="grid gap-1.5 flex-1">
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
                    </div>
                  )}
                </div>

                <div className="md:hidden flex bottom-0 left-0 w-full bg-white pt-2">
                  <div className="bg-white p-4 rounded-lg border mx-4">
                    <h2>Order Summary</h2>
                  </div>
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
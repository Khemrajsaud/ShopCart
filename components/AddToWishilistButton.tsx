
"use client"
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import useStore from "@/store";
import toast from "react-hot-toast";

const AddToWishilistButton = ({
  product,

  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);

  const handleFavrout = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully"
            : "Product added successfully!"
        );
      });
    }
  };
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <button
        onClick={handleFavrout}
        className={`p-2.5 rounded-full hover:bg-shop_dark_green hover:text-white hoverEffect bg-shop_lighter_bg ${existingProduct ? "bg-shop_dark_green/80 text-white" : "bg-lightColor/10"} `}
      >
        <Heart size={15} />
      </button>
    </div>
  );
};

export default AddToWishilistButton;


// "use client";
// import { cn } from "@/lib/utils";
// import { Product } from "@/sanity.types";
// import { Heart } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import useStore from "@/store";
// import toast from "react-hot-toast";

// const AddToWishilistButton = ({
//   product,
//   className,
// }: {
//   product: Product;
//   className?: string;
// }) => {
//   const { favoriteProduct, addToFavorite } = useStore();
//   const [existingProduct, setExistingProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     const availableProduct = favoriteProduct?.find(
//       (item) => item?._id === product?._id
//     );
//     setExistingProduct(availableProduct || null);
//   }, [product, favoriteProduct]);

//   const handleFavrout = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (product?._id) {
//       addToFavorite(product).then(() => {
//         toast.success(
//           existingProduct
//             ? "Product removed successfully"
//             : "Product added successfully!"
//         );
//       });
//     }
//   };

//   return (
//     <button
//       onClick={handleFavrout}
//       className={cn(
//         `p-2.5 rounded-full hover:bg-shop_dark_green hover:text-white hoverEffect bg-shop_lighter_bg 
//         ${existingProduct ? " text-shop_dark_green" : "bg-lightColor/10"}`,
//         className
//       )}
//     >
//       <Heart size={15} />
//     </button>
//   );
// };

// export default AddToWishilistButton;

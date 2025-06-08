
// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import { Any } from "next-sanity";
// import { Category } from "@/sanity.types";
// import { client } from "@/sanity/lib/client";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import dynamic from "next/dynamic";
// const ProductCart = dynamic(() => import("./ProductCart"), { ssr: false });
// const NoProductAvailable = dynamic(() => import("@/components/NoProductAvailable"), { ssr: false });
// import { AnimatePresence } from "motion/react";
// import { motion } from "motion/react";

// interface Props {
//   categories: Category[];
//   slug: string;
//   initialProducts?: Any[];
// }

// const CategoryProducts = ({ categories, slug, initialProducts }: Props) => {
//   const [currentSlug, setCurrentSlug] = useState(slug);
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState(initialProducts || []);
//   const router = useRouter();

//   const generateSlug = (title: string) => {
//     return title.toLowerCase().replace(/\s+/g, "-");
//   };

//   const handleCategoryChange = (title: string) => {
//     if (!title) return;
//     const newSlug = generateSlug(title);
//     if (newSlug === currentSlug) return;
//     setCurrentSlug(newSlug);
//     router.push(`/category/${newSlug}`, { scroll: false });
//   };

//   const fetchProducts = async (categorySlug: string) => {
//     try {
//       setLoading(true);
//       const query = `
//     *[_type == 'product' && references(*[_type == "categories" && slug.current == $categorySlug]._id)] | order(name asc){
//       ...,
//       "category": category[]->title,
//       "images": images,
//       "imageUrl": images[0].asset->url
//     }
//   `;

//       const data = await client.fetch(query, { categorySlug });
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products: ", error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!initialProducts || initialProducts.length === 0) {
//       fetchProducts(currentSlug);
//     }
//   }, [currentSlug, initialProducts, router]);

//   return (
//     <div className="flex items-start flex-col md:flex-row gap-5">
//       <div className="flex flex-col space-y-3">
//         {categories.map((item: Any) => {
//           const generatedSlug = item.slug?.current || generateSlug(item.title);
//           return (
//             <Button
//               onClick={() => handleCategoryChange(item.title)}
//               className={`bg-transparent border-0 p-0 rounded-none text-darkColor shadow-none hover:bg-shop_orange hover:text-white font-semibold hoverEffect border-b last:border-b-0 transition-colors capitalize ${
//                 generatedSlug === currentSlug ? "bg-gray-600 text-white border-shop_orange hover:bg-black" : "bg-white"
//               }`}
//               key={item._id || item.title}
//             >
//               <p className="w-full text-left px-2">{item.title}</p>
//             </Button>
//           );
//         })}
//       </div>

//       <div className="flex-1">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
//             <div className="flex items-center space-x-2 text-blue-600">
//               <Loader2 className="w-5 h-5 animate-spin" />
//               <span>Product is loading...</span>
//             </div>
//           </div>
//         ) : products?.length > 0 ? (
//           <div>
//             {products.map((product: Any) => (
//               <AnimatePresence key={product?._id}>
//                 <motion.div>
//                   <div>{product?.images}</div>
//                   <ProductCart product={product} />
//                 </motion.div>
//               </AnimatePresence>
//             ))}
//           </div>
//         ) : (
//           <NoProductAvailable selectedTab={currentSlug} className="mt-0 w-full" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryProducts;

"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Any } from "next-sanity";
import { Category } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
const ProductCart = dynamic(() => import("./ProductCart"), { ssr: false });
const NoProductAvailable = dynamic(() => import("@/components/NoProductAvailable"), { ssr: false });
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

interface Props {
  categories: Category[];
  slug: string;
  initialProducts?: Any[];
}

const CategoryProducts = ({ categories, slug, initialProducts = [] }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Any[]>(initialProducts);
  const router = useRouter();

  const handleCategoryChange = (slug: string) => {
    if (!slug || slug === currentSlug) return;
    setCurrentSlug(slug);
    router.push(`/category/${slug}`, { scroll: false });
  };

  const fetchProducts = async (categorySlug: string) => {
    try {
      setLoading(true);
      console.log("Fetching products for slug:", categorySlug);

      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
          ...,
          "category": category[]->title,
          "imageUrl": images[0].asset->url
        }
      `;
      const data = await client.fetch(query, { categorySlug });
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="flex items-start flex-col md:flex-row gap-5">
      {/* Category Buttons */}
      <div className="flex flex-col space-y-3">
        {categories.map((item: Category) => {
          const categorySlug = item.slug?.current || "";
          return (
            <Button
              onClick={() => handleCategoryChange(categorySlug)}
              key={item._id}
              className={`bg-transparent border-0 p-0 rounded-none text-darkColor shadow-none hover:bg-shop_orange hover:text-white font-semibold border-b last:border-b-0 transition-colors capitalize ${
                categorySlug === currentSlug ? "bg-gray-600 text-white border-shop_orange hover:bg-black" : "bg-white"
              }`}
            >
              <p className="w-full text-left px-2">{item.title}</p>
            </Button>
          );
        })}
      </div>

      {/* Products */}
      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: Any) => (
              <AnimatePresence key={product?._id}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Fallback image and title if ProductCart fails */}
                  {/* <div>
                    <img src={product?.imageUrl} alt={product?.name} className="w-full h-48 object-cover mb-2" />
                    <p className="text-lg font-semibold">{product?.name}</p>
                  </div> */}

                  {/* Recommended if ProductCart is working */}
                  <ProductCart product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable selectedTab={currentSlug} className="mt-0 w-full" />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

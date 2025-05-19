// "use client"

// import React, { useEffect, useState } from 'react'
// import HomeTabBar from './HomeTabBar';
// import { productType } from '@/constant/data';
// import { client } from '@/sanity/lib/client';
// import {AnimatePresence, motion} from "motion/react"
// import { Loader, Loader2 } from 'lucide-react';
// import NoProductAvailable from './NoProductAvailable';





// const ProductGrid = () => {
//     const [products, setProducts]= useState([]);
//     const [loading, setLoading] = useState(false);

//     const [selectedTab, setSelectTab] = useState(productType[0]?.title || "");

//     const params = {variant: selectedTab.toLowerCase()}
//     useEffect(()=>{
//       const fetchData = async()=>{
//         try {
//           const response = await client.fetch(params);
//           console.log(response);
          
          
//         } catch (error) {
//           console.error("Product fetching Error:", error);
          
          
//         }finally {
//           setLoading(false);
//         }
      
//       }
//       fetchData();
//     },[selectedTab])


//   return (
//     <div>
//      <HomeTabBar selectedTab = {selectedTab} onTabSelect= {setSelectTab}/>

//      {loading ? ( <div className='flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10'>
//       <div className='text-blue-600 space-x-2 flex items-center'>
//         <Loader2 className=' w-5 h-6 animate-spin' />
//         <span>Product is loading..</span>

//       </div>
//     </div>): products?.length ?(
//       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10'>
//         {product?.map(products)=>(
//           <AnimatePresence key={products?._id}>
//             <motion.div>
//               <ProductCart products={products}/>
//             </motion.div>
//           </AnimatePresence>
//         )}

//           </div>

//     ):(<NoProductAvailable selectedTab={selectedTab}/>)
//     }
//     </div>
//   )
// }

// export default ProductGrid

"use client"

import React, { useEffect, useState } from 'react'
import HomeTabBar from './HomeTabBar';
import { productType } from '@/constant/data';
import { client } from '@/sanity/lib/client';
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from 'lucide-react';
import NoProductAvailable from './NoProductAvailable';
import ProductCart from './ProductCart';
import { Product } from '@/sanity.types';


const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectTab] = useState(productType[0]?.title || "");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "product" && variant == "${selectedTab.toLowerCase()}"]`;
        const response = await client.fetch(query);
        setProducts(response);
      } catch (error) {
        console.error("Product fetching Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectTab} />

      {loading ? (
        <div className='flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10'>
          <div className='text-blue-600 space-x-2 flex items-center'>
            <Loader2 className='w-5 h-6 animate-spin' />
            <span>Product is loading..</span>
          </div>
        </div>
      ) : products?.length ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10'>
          {products.map((product) => (
            <AnimatePresence key={product?._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
              <ProductCart product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;


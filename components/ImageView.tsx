// "use client";
// import {
//   internalGroqTypeReferenceTo,
//   SanityImageCrop,
//   SanityImageHotspot,
// } from "@/sanity.types";
// import { AnimatePresence } from "motion/react";
// import React, { useState } from "react";
// import { motion } from "motion/react";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";

// interface Props {
//   images?: Array<{
//     asset?: {
//       _ref: string;
//       _type: "reference";
//       _weak?: boolean;
//       [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
//     };
//     hotspot?: SanityImageHotspot;
//     crop?: SanityImageCrop;
//     _type: "image";
//     _key: string;
//   }>;
//   isStock?: number;
// }

// const ImageView = ({ images = [], isStock }: Props) => {
//   const [active, setActive] = useState(images[0]);
//   console.log(active);

//   return (
//     <div className="w-full md:w-1/2 space-y-4">
//       <AnimatePresence mode="wait ">
//         <motion.div
//         key={active?._key}
//         initial={{opacity:0}
//       }
//       animate={{opacity:1}}
//       exit={{opacity:0}}
//       transition={{duration:0.5}}
//         className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden">
//           <Image
//             src={urlFor(active).url()}
//             alt="productImage"
//             width={700}
//             height={700}
//             priority
//             className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md ${
//               isStock ===0 ? "opacity-50" : ""
//             }`}
//           />
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ImageView;



"use client";

import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }> | null;
  isStock?: number  | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images?.[0] ?? null);

  return (
    <div className="w-full md:w-1/2 space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key || "placeholder"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] border border-darkColor/10 rounded-md group overflow-hidden"
        >
          {active?.asset?._ref ? (
            <Image
              src={urlFor(active).url()}
              alt="productImage"
              width={600}
              height={600}
              priority
              className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md ${
                isStock === 0 ? "opacity-50" : ""
              }`}
            />
          ) : (
            <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-md">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </motion.div>

        <div className=" grid grid-cols-6 gap-2 h-20 md:h-24">
          {images?.map((image)=>(
            <button key={image?._key}
            onClick={()=>setActive(image)}
            className={`border rounded-md overflow-hidden ${active?._key === image?._key ? " opacity-100 border-darkColor": "opacity-80"}`}
            >
              <Image
              src={urlFor(image).url()}
              alt={`Thumnail ${image._key}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
              
              
              ></Image>
            </button>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ImageView;

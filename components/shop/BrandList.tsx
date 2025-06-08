// // import { BRAND_QUERYResult } from '@/sanity.types'

// import React from "react";
// import { Title } from "../text";
// import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
// import { Label } from "@radix-ui/react-label";
// import { Brand } from "@/sanity.types";

// interface Props {
//   // brands: BRAND_QUERYResult;
//   brands: Brand[];

//   selectedBrand?: string | null;
//   setSelectedBrand?: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
//   return (
//     <div className="w-full">
//       <Title className="text-base font-black">Brands </Title>
//       <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
//         {brands?.map((brand) => (
//           <div
//             key={brand?._id}
//             onClick={() => setSelectedBrand(brand?.slug?.current as string)}
//             className="flex items-center space-x-2 hover:cursor-pointer"
//           >
//             <RadioGroupItem
//               value={brand?.slug?.current as string}
//               className="rounded-sm"
//             />

//             <Label
//               htmlFor={brand?.slug?.current}
//               className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
//             ></Label>
//           </div>
//         ))}
//         {selectedBrand && (
//           <button
//             onClick={() => setSelectedBrand(null)}
//             className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
//           >
//             {" "}
//             Reset selection
//           </button>
//         )}
//       </RadioGroup>
//     </div>
//   );
// };

// export default BrandList;

import React from "react";
import { Title } from "../text";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import { Brand } from "@/sanity.types";
import { CheckIcon } from "lucide-react"; // optional icon

interface Props {
  brands: Brand[];
  selectedBrand?: string | null;
  setSelectedBrand?: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="w-full">
      <Title className="text-base font-black">Brands</Title>

      <RadioGroup
        value={selectedBrand || ""}
        onValueChange={(value) => setSelectedBrand?.(value || null)}
        className="mt-4 flex flex-col gap-3"
      >
        {brands?.map((brand) => (
          <div
            key={brand?._id}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug?.current || ""}
              id={brand?.slug?.current}
              className="w-5 h-5 rounded-md border-2 border-gray-400 flex items-center justify-center data-[state=checked]:bg-shop_dark_green data-[state=checked]:border-shop_dark_green transition-colors"
            >
              {/* Show ✔ when selected */}
              {selectedBrand === brand?.slug?.current && (
                <CheckIcon className="text-white w-3 h-3" />
              )}
            </RadioGroupItem>

            <Label
              htmlFor={brand?.slug?.current}
              className={`${
                selectedBrand === brand?.slug?.current
                  ? "font-semibold text-shop_dark_green"
                  : "text-gray-700"
              }`}
            >
              {brand.title || "Unnamed Brand"}
            </Label>
          </div>
        ))}

        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand?.(null)}
            className="text-sm font-medium mt-3 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandList;

// import { Category } from "@/sanity.types";
// import React from "react";
// import { Title } from "../text";
// import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

// import { Label } from "../ui/label";
// interface Props {
//   categories: Category[];
//   selectedCategory?: string | null;
//   setSelectedCategory?: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const CategoryList = ({
//   categories,
//   selectedCategory,
//   setSelectedCategory,
// }: Props) => {
 
  
//   return (
//     <div className=" w-full bg-white p-5">
//       <Title className="text-base font-black">Product Categories</Title>
//       <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
//         {categories?.map((category) => (
//           <div 
//           onClick={()=> setSelectedCategory(category?.slug?.current as string)}
//           key={category?._id} className="flex items-center space-x-2 hover:cursor-pointer">
//             <RadioGroupItem
//               value={category?.slug?.current as string}
//               id={category?.slug?.current}
//               className="rounded-sm"
//             />
//             <Label  htmlFor={category?.slug?.current}
//             className={`${selectedCategory === category?.slug?.current ? "font-semibold text-shop_dark_green": "font-normal"}`}
//             >{category?.title}</Label>
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default CategoryList;

import { Category } from "@/sanity.types";
import React from "react";
import { Title } from "../text";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "../ui/label";
import { CheckIcon } from "lucide-react"; // optional for check icon

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full bg-white py-8 rounded-md shadow-sm">
      <Title className="text-base font-black">Product Categories</Title>

      <RadioGroup
        value={selectedCategory || ""}
        onValueChange={(value) => setSelectedCategory?.(value || null)}
        className="mt-4 flex flex-col gap-3"
      >
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <RadioGroupItem
              value={category?.slug?.current || ""}
              id={category?.slug?.current}
              className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center data-[state=checked]:bg-shop_dark_green data-[state=checked]:border-shop_dark_green transition-colors"
            >
              {selectedCategory === category?.slug?.current && (
                <CheckIcon className="text-white w-3 h-3" />
              )}
            </RadioGroupItem>

            <Label
              htmlFor={category?.slug?.current}
              className={`${
                selectedCategory === category?.slug?.current
                  ? "font-semibold text-shop_dark_green"
                  : "text-gray-700"
              }`}
            >
              {category?.title}
            </Label>
          </div>
        ))}

        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory?.(null)}
            className="text-sm font-medium mt-3 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
          >
            Reset category
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default CategoryList;


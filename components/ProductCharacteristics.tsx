import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/lib/queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import React from "react";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brand = await getBrand(product?.slug?.current as string);
  console.log(brand);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className=" flex items-center justify-between gap-30 ">
          <span>{product?.name}:Characteristics</span>
          
          <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">
            Brand:
            {brand && <span>{brand[0]?.brandName}</span>}
          </p>

          <p className="flex items-center justify-between ">
            Collection: {""}
            <span className="font-semibold tracking-wide ">
              {product?.variant}
            </span>
            </p>

          <p className="flex items-center justify-between ">
            Type: {""}
            <span className="font-semibold tracking-wide ">
              {product?.variant}
            </span>
          </p>
          <p className="flex items-center justify-between ">
            Stock: {""}
            <span className="font-semibold tracking-wide ">
              {product?.stock ? "Available": "Out of Stack"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;

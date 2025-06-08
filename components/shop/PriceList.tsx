import React from "react";
import { Title } from "../text";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import { CheckIcon } from "lucide-react";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100-$200", value: "100-200" },
  { title: "$200-$300", value: "200-300" },
  { title: "$300-$500", value: "300-400" },
  { title: "Over $500", value: "400-500" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white py-5">
      <Title className="text-base font-black">Price</Title>
      <RadioGroup
        className="mt-4 flex flex-col gap-3"
        value={selectedPrice ?? ""}
        onValueChange={(value) => setSelectedPrice(value)}
      >
        {priceArray.map((price, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <RadioGroupItem
              value={price.value}
              id={price.value}
              className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center data-[state=checked]:bg-shop_dark_green data-[state=checked]:border-shop_dark_green transition-colors"
            >
              {selectedPrice === price.value && (
                <CheckIcon className="text-white w-3 h-3" />
              )}
            </RadioGroupItem>
            <Label
              htmlFor={price.value}
              className={`${
                selectedPrice === price.value
                  ? "font-semibold text-shop_dark_green"
                  : "text-gray-700"
              }`}
            >
              {price.title}
            </Label>
          </div>
        ))}

        {selectedPrice && (
          <button
            onClick={() => setSelectedPrice(null)}
            className="text-sm font-medium mt-3 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
          >
            Reset Price
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default PriceList;

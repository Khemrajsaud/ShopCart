import React from "react";
import PriceFormateer from "./PriceFormateer";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <PriceFormateer amount={price} className="text-shop_dark_green" />
      {price && discount} (
      <PriceFormateer
        amount={price + (discount * price) / 100}
        className="line-through font-normal text-shop_light_text"
      />
      )
    </div>
  );
};

export default PriceView;

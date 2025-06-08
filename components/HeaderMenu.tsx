"use client";
import { headerData } from "@/constant/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathName = usePathname();

  return (
    <div className="hidden md:inline-flex w-1/3 items-center justify-center gap-7 text-sm capitalize font-semibold text-lightColor">
      {headerData?.map((item) => {
        const isActive = pathName === item.href;
        return (
          <Link
            key={item.title}
            href={item.href}
            className={`relative group hover:text-shop_light_green ${
              isActive ? "text-shop_light_green" : ""
            }`}
          >
            {item.title}

            <span
              className={`absolute -bottom-0.5 right-1/2 h-0.5 bg-green-500 transition-all duration-300 ${
                isActive ? "w-1/2 left-0" : "w-0 group-hover:w-1/2 group-hover:left-0"
              }`}
            />
            <span
              className={`absolute -bottom-0.5 left-1/2 h-0.5 bg-green-500 transition-all duration-300 ${
                isActive ? "w-1/2 left-0" : "w-0 group-hover:w-1/2 group-hover:left-0"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenu;

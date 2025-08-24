import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardListProductProps {
  name: string;
  slug: string;
  price: number;
  sold: number;
  discountPercentage: number | any;
  discountPrice: number | any;
  rating: number | string;
  thumbnail?: string | any;
}

export default function CardListProduct({
  name,
  slug,
  price,
  sold,
  discountPercentage,
  discountPrice,
  rating,
  thumbnail,
}: CardListProductProps) {
  const formatIDR = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatSold = (sold: number): string => {
    let formatted = "";

    if (sold >= 1000000) {
      formatted = Math.floor(sold / 1000000) + "jt";
    } else if (sold >= 100000) {
      formatted = Math.floor(sold / 1000) + "rb";
    } else if (sold >= 10000) {
      formatted = Math.floor(sold / 1000) + "rb";
    } else if (sold >= 1000) {
      formatted =
        (sold / 1000).toFixed(sold % 1000 === 0 ? 0 : 1).replace(".", ",") +
        "rb";
    } else {
      formatted = sold.toString();
    }

    return sold > 100 ? formatted + "+" : formatted;
  };

  return (
    <Link href={slug || ""}>
      <div className="h-full w-full cursor-pointer rounded-lg bg-white border-[#E2E8F0] border inline-block">
        <div className="aspect-3/2 relative">
     
          <img
            src={thumbnail || "/images/d.jpg"}

          />
        </div>
        <div className="p-2">
          <h1 className="text-black text-sm font-normal leading-[14px]">
            {name}
          </h1>
          <div className="flex items-center">
            <h1 className="text-[#E41A67] md:text-sm text-xs font-semibold leading-[17px] pt-2">
              {formatIDR(discountPrice)}
            </h1>
            {discountPercentage > 0 && (
              <h2 className="text-[#747474] md:text-xs text-[10px] font-medium leading-3 mt-2 ml-1 line-through">
                {formatIDR(price)}
              </h2>
            )}
            {discountPercentage > 0 && (
              <p className="text-[#046A7C] md:text-xs text-[10px] font-semibold leading-[14px] bg-[#CFFAFF] rounded-sm mt-1.5 p-0.5 ml-1">
                {discountPercentage}%
              </p>
            )}
          </div>

          <div className="flex justify-between mt-3">
            <div className="flex items-center">
              <img src="/icon/bintang.svg" alt="rating" />
              <p className="text-black md:text-sm text-xs font-normal leading-[14px] pl-[6px]">
                {rating}
              </p>
            </div>
            <p className="text-black md:text-sm text-xs font-normal leading-[14px]">
              {formatSold(sold)}
              <span className="pl-1">Terjual</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

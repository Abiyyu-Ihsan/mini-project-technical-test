import Link from "next/link";
import React from "react";

interface TopProductSectionProps {
  images: string | undefined;
  name?: string;
  slug?: string;
}

export default function CardTopProduct({ images, name, slug }: TopProductSectionProps) {
  return (
    <section>
      <div className="flex  flex-col w-full group">
        <div className="relative overflow-hidden rounded-md">
          <img
            src={images || "/images/d.jpg"}
            alt={name || "Product image"}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-110"
          />

          <Link href={slug || "#"}>
            <button
              className="absolute w-[250px] bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-[#5CCCDC] text-white py-2 px-4 rounded-sm hover:bg-[#EB92C0] hover:scale-105"
            >
              Detail
            </button>
          </Link>
        </div>
        <h1 className="font-bold text-start text-base leading-6 text-[#1C1D1D] py-2">
          {name}
        </h1>
      </div>
    </section>
  );
}

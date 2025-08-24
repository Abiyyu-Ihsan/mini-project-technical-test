"use client";

import CardListProduct from "@components/card/CardListProduct";
import React from "react";

interface Product {
  name: string;
  slug: string;
  price: number;
  rating: number;
  sold_count: number;
  discount_in_percentage?: number;
  discounted_price?: number;
  thumbnail?: string;
}

interface SectionListProductMobileProps {
  data: Product[];
  loading: boolean;
}

export default function SectionListProductMobile({
  data,
  loading,
}: SectionListProductMobileProps) {
  return (
    <section className="relative mx-auto max-w-7xl px-3">
      <div className="relative flex">
        <div className="w-full">
          <div className="relative group">
            <div className="mt-4">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : data.length === 0 ? (
                <p className="text-center text-gray-500">
                  Hasil tidak ditemukan
                </p>
              ) : (
                <ul className="grid grid-cols-2 gap-1 my-8 py-0">
                  {data.map((item, index) => (
                    <li key={index}>
                      <CardListProduct
                        name={item?.name}
                        slug={`/produk/${item.slug}`}
                        price={item?.price}
                        rating={item?.rating}
                        sold={item?.sold_count}
                        discountPercentage={item?.discount_in_percentage}
                        discountPrice={item?.discounted_price}
                        thumbnail={item?.thumbnail}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

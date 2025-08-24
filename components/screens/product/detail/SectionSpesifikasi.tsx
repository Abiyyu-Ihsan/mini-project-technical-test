import React from "react";

interface ProductCategory {
  name: string;
  slug: string;
  image: string;
}

interface Product {
  category: ProductCategory;
}

interface SectionSpesifikasiProps {
  data?: Product;
}

export default function SectionSpesifikasi({ data }: SectionSpesifikasiProps) {
  return (
    <section>
      <div className="max-w-7xl mx-auto md:mt-[38px] mt-1 md:px-5">
        <div className="bg-white border border-[#E2E8F0] md:rounded-2xl md:p-4 p-3">
          <h1 className="text-black md:text-2xl text-base font-semibold">
            Spesifikasi Produk
          </h1>
          <hr className="border border-[#E41A67] md:mt-3 mt-1" />
          <div className="flex md:mt-7 mt-3">
            <h1 className="text-[#747474] md:text-xl text-sm font-semibold">
              Kategori
            </h1>
            <p className="text-black md:text-xl text-sm font-medium md:ml-[114px] ml-8">
              {data?.category?.name ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

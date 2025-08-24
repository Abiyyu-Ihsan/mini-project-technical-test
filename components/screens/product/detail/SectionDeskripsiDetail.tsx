import React from "react";

interface SectionDeskripsiDetailProps {
  data?: {
    description?: string;
  };
}

export default function SectionDeskripsiDetail({ data }: SectionDeskripsiDetailProps) {
  return (
    <section>
      <div className="max-w-7xl mx-auto md:mt-4 mb-12 mt-3 md:px-5">
        <div className="bg-white border border-[#E2E8F0] md:rounded-2xl md:p-4 p-3">
          <h1 className="text-black md:text-2xl text-base font-semibold">
            Deskripsi Produk
          </h1>
          <hr className="border border-[#E41A67] md:mt-3 mt-1" />
          <div className="md:mt-7 mt-3 text-black md:text-base text-sm font-medium">
            <p dangerouslySetInnerHTML={{ __html: data?.description ?? "" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

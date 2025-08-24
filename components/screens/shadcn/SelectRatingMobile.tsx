import React from "react";

interface SelectRatingMobileProps {
  selectedRating: string | any;
  onChange: (value: string) => void;
}

export default function SelectRatingMobile({
  selectedRating,
  onChange,
}: SelectRatingMobileProps) {
  return (
    <section>
      <div className="mt-3 flex">
        <div
          className={`border p-2 rounded-[8px] flex cursor-pointer ${
            selectedRating
              ? "bg-[#FF88C6] text-white border-transparent"
              : "border-[#0000004D] bg-white"
          }`}
          onClick={() => onChange(selectedRating ? "" : "true")}
        >
          <img src="/icons/bintang.svg" className="w-5" alt="star" />
          <h1 className="flex items-center text-sm px-1 mt-0.5">
            Rating 4 ke Atas
          </h1>
        </div>
      </div>
    </section>
  );
}

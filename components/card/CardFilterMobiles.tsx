import SelectLastAddedMobile from "@components/screens/product/product-mobile/SelectLastAddedMobile";
import InputHargaMobile from "@components/screens/shadcn/InputHargaMobile";
import SelectRatingMobile from "@components/screens/shadcn/SelectRatingMobile";
import React, { useState } from "react";

interface CategoryFilterMobileProps {
  highestPrice: string | number;
  lowestPrice: string | number;
  lastAdded: string | null;
  ratingAbove: string | number;
  onPriceRangeChange: (low: string | any, high: string | any ) => void;
  onLastAddedChange: (lastAdded: string | any) => void;
  onRatingAboveChange: (rating: string | any) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function CategoryFilterMobile({
  highestPrice,
  lowestPrice,
  lastAdded,
  ratingAbove,
  onPriceRangeChange,
  onLastAddedChange,
  onRatingAboveChange,
  onClose,
  onReset,
}: CategoryFilterMobileProps) {
  const [tempLowestPrice, setTempLowestPrice] = useState<string | number>(lowestPrice);
  const [tempHighestPrice, setTempHighestPrice] = useState<string | number>(highestPrice);
  const [selectedLastAdded, setSelectedLastAdded] = useState<string | null>(lastAdded);
  const [selectedRating, setSelectedRating] = useState<string | number>(ratingAbove);

  const handleSave = () => {
    onPriceRangeChange(tempLowestPrice, tempHighestPrice);
    onLastAddedChange(selectedLastAdded);
    onRatingAboveChange(selectedRating);
    onClose();
  };

  const handleReset = () => {
    setTempLowestPrice("");
    setTempHighestPrice("");
    setSelectedRating("");
    setSelectedLastAdded(null);
    onReset();
  };

  return (
    <section>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-base font-semibold leading-[22px]">
            Filter Produk
          </h1>
          {(tempLowestPrice || tempHighestPrice || selectedLastAdded || selectedRating) && (
            <h1
              className="text-[#FF88C6] text-sm font-semibold leading-[22px] cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </h1>
          )}
        </div>

        {/* Filter Berdasarkan Harga */}
        <div className="mt-7">
          <h1 className="text-black text-sm font-semibold leading-[22px]">
            Harga
          </h1>
          <InputHargaMobile
            highestPrice={tempHighestPrice}
            lowestPrice={tempLowestPrice}
            onPriceRangeChange={(low: string | number, high: string | number) => {
              setTempLowestPrice(low);
              setTempHighestPrice(high);
            }}
          />
        </div>
        {/* Filter Berdasarkan Harga */}

        {/* Filter Berdasarkan Rating */}
        <div className="mt-5">
          <h1 className="text-black text-sm font-semibold leading-[22px]">
            Rating
          </h1>
          <SelectRatingMobile
            selectedRating={selectedRating}
            onChange={setSelectedRating}
          />
        </div>
        {/* Filter Berdasarkan Rating */}

        {/* Filter Berdasarkan Terakhir Ditambahkan */}
        <div className="mt-5">
          <h1 className="text-black text-sm font-semibold leading-[22px]">
            Terakhir Ditambahkan
          </h1>
          <SelectLastAddedMobile
            selectedLastAdded={selectedLastAdded}
            onChange={setSelectedLastAdded}
          />
        </div>
        {/* Filter Berdasarkan Terakhir Ditambahkan */}

        {(tempLowestPrice || tempHighestPrice || selectedLastAdded || selectedRating) && (
          <button
            className="bg-[#FF88C6] rounded-[6px] p-3 w-full mt-4"
            onClick={handleSave}
          >
            <h1 className="text-white">Simpan</h1>
          </button>
        )}
      </div>
    </section>
  );
}

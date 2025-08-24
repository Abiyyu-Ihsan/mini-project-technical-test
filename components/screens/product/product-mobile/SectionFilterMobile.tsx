"use client";

import CategoryDiscount from "@components/card/CardDiscount";
import CategoryFilterMobile from "@components/card/CardFilterMobiles";
import CategoryProductMobile from "@components/card/CardProductMobile";
import ModalDialog from "@components/widgets/ModalDialog";
import { ModalMobile } from "@libs/modal/ModalMobile";
import React, { useState } from "react";


interface SectionFilterMobileProps {
  highestPrice: number | any;
  lowestPrice: string | any;
  lastAdded: string | null;
  discount: string | any;
  ratingAbove: string | any;
  categorySlug: string | any;
  onPriceRangeChange: (min: string, max: string) => void;
  onLastAddedChange: (value: string) => void;
  onDiscountChange: (value: string) => void;
  onRatingAboveChange: (value: string) => void;
  onCategorySlugChange: (value: string[]) => void;
}

export default function SectionFilterMobile({
  highestPrice,
  lowestPrice,
  lastAdded,
  discount,
  ratingAbove,
  categorySlug,
  onPriceRangeChange,
  onLastAddedChange,
  onDiscountChange,
  onRatingAboveChange,
  onCategorySlugChange,
}: SectionFilterMobileProps) {
  // State untuk buka/tutup modal
  const [modalRangeFilter, setModalRangeFilter] = useState<boolean>(false);
  const [modalDiscountFilter, setModalDiscountFilter] = useState<boolean>(false);
  const [modalCategoryFilter, setModalCategoryFilter] = useState<boolean>(false);

  // Reset semua filter
  const handleResetFilter = () => {
    onPriceRangeChange("", "");
    onLastAddedChange("");
    onDiscountChange("");
    onRatingAboveChange("");
    onCategorySlugChange([]);
  };

  return (
    <section className="relative mx-auto max-w-7xl mt-24 px-3">
      <div className="relative flex">
        {/* Filter Berdasarkan Kategori Produk */}
        <div
          className="border border-[#0000004D] rounded-[8px] p-2"
          onClick={() => setModalCategoryFilter(true)}
        >
          <h1 className="text-[#747474] text-sm font-normal leading-[19px]">
            Kategori Produk
          </h1>
        </div>

        {/* Filter Berdasarkan Diskon */}
        <div
          className="border border-[#0000004D] rounded-[8px] p-2 ml-3"
          onClick={() => setModalDiscountFilter(true)}
        >
          <h1 className="text-[#747474] text-sm font-normal leading-[19px]">
            Penawaran
          </h1>
        </div>

        {/* All Filters */}
        <div
          className="border border-[#0000004D] rounded-[8px] p-2 ml-3 flex items-center"
          onClick={() => setModalRangeFilter(true)}
        >
          <img src="/icons/filter.svg" className="w-4" alt="filter" />
          <h1 className="text-[#747474] text-sm font-normal leading-[19px] ml-1">
            Filter Produk
          </h1>
        </div>

        {/* Modal Kategori Produk */}
        <ModalDialog
          isOpen={modalCategoryFilter}
          onClose={() => setModalCategoryFilter(false)}
        >
          <CategoryProductMobile
            onClose={() => setModalCategoryFilter(false)}
            selectedCategories={categorySlug}
            onCategoryChange={onCategorySlugChange}
            onReset={handleResetFilter}
          />
        </ModalDialog>

        {/* Modal Penawaran */}
        <ModalDialog
          isOpen={modalDiscountFilter}
          onClose={() => setModalDiscountFilter(false)}
          size="lg"

        >
          <CategoryDiscount
            onClose={() => setModalDiscountFilter(false)}
            onDiscountChange={onDiscountChange}
            onReset={handleResetFilter}
            discount={discount}
          />
        </ModalDialog>

        {/* Modal Filter */}
        <ModalDialog

          // title="Bantuan"
          isOpen={modalRangeFilter}
          onClose={() => setModalRangeFilter(false)}
          size="lg"
        >
          <CategoryFilterMobile
            onClose={() => setModalRangeFilter(false)}
            highestPrice={highestPrice}
            lowestPrice={lowestPrice}
            lastAdded={lastAdded}
            ratingAbove={ratingAbove}
            onPriceRangeChange={onPriceRangeChange}
            onLastAddedChange={onLastAddedChange}
            onRatingAboveChange={onRatingAboveChange}
            onReset={handleResetFilter}
          />
        </ModalDialog>
      </div>
    </section>
  );
}

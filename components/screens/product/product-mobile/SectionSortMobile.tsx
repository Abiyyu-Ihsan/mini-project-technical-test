"use client";

import Link from "next/link";
import React, { useState } from "react";
import { SearchMobile } from "@components/screens/shadcn/SearchMobile";
import CategoryMobile from "./SectionCategoryMobile";
import ModalDialog from "@components/widgets/ModalDialog";

interface SectionSortMobileProps {
  onSearch: (value: string) => void;
  onPriceFilter: (value: string) => void;
  onSortChange: (value: string) => void;
  selectedPriceFilter: string | any;
  selectedSortFilter: string | any;
}

export default function SectionSortMobile({
  onSearch,
  onPriceFilter,
  onSortChange,
  selectedPriceFilter,
  selectedSortFilter,
}: SectionSortMobileProps) {
  const [modalFilterPrice, setModalFilterPrice] = useState<boolean>(false);
  const [localPriceFilter, setLocalPriceFilter] = useState<string>(selectedPriceFilter);
  const [localSortBy, setLocalSortBy] = useState<string>(selectedSortFilter);

  const handleFilterChange = (value: string) => {
    setLocalPriceFilter(value);
    onPriceFilter(value);
    setLocalSortBy(value);
    onSortChange(value);
    setModalFilterPrice(false);
  };

  const handleFilterSortChange = (value: string) => {
    setLocalSortBy(value);
    onSortChange(value);
    setModalFilterPrice(false);
  };

  const handleResetFilter = () => {
    setLocalPriceFilter("");
    onPriceFilter("");
    onSortChange("");
  };



  return (
    <section>
      <div className="bg-white shadow-lg fixed top-0 left-0 w-full z-[60] p-3 md:p-4 transition duration-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/icons/left-arrow.svg" alt="Back" />
          </Link>
          <div className="border-[#747474] border rounded">
            <SearchMobile onSearch={onSearch} />
          </div>
          <div
            className={`ml-3 border p-2 rounded-[8px] ${
              localPriceFilter ? "border-[#FF88C6]" : "border-[#747474]"
            }`}
            onClick={() => setModalFilterPrice(true)}
          >
            <img src="/icons/urutkan.svg" className="w-5 h-5" alt="Sort" />
          </div>
        </div>
        <ModalDialog
          isOpen={modalFilterPrice}
          onClose={() => setModalFilterPrice(false)}
        >
          <CategoryMobile
            onPriceFilter={handleFilterChange}
            onSortFilter={handleFilterSortChange}
            selectedPriceFilter={localPriceFilter}
            selectedSortFilter={localSortBy}
            onReset={handleResetFilter}
          />
        </ModalDialog>
      </div>
    </section>
  );
}

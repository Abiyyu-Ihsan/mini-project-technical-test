"use client";

import React, { useState } from "react";
import SectionSortMobile from "./SectionSortMobile";
import SectionListProductMobile from "./SectionListProductMobile";
import SectionFilterMobile from "./SectionFilterMobile";
import { ProductsFilterParams, useProductsFilter } from "@libs/services/ProductService";
import { PaginationMobile } from "./PaginationProductMobile";
import LayoutDashboardView from "@components/layouts/LayoutMain";


export default function ProductPageMobile() {
  const [filters, setFilters] = useState<ProductsFilterParams>({
    size: "",
    discount: "",
    search: "",
    last_added: null,
    sort_by: "",
    highest_price: "",
    lowest_price: "",
    page: 1,
    categories: [],
    price_filter: "",
    rating_above_4: "",
    category_slug: [],
  });

  // 🚀 Fetch data pakai TanStack
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useProductsFilter(filters);

  const data = productsResponse?.data || [];
  const meta = productsResponse?.meta || null;

  // Handlers
  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  };

  const handlePriceFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, price_filter: value }));
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sort_by: value }));
  };

  const handlePriceRange = (min: string, max: string) => {
    setFilters((prev) => ({ ...prev, lowest_price: min, highest_price: max }));
  };

  const handleLastAddedChange = (value: string | null) => {
    setFilters((prev) => ({ ...prev, last_added: value }));
  };

  const handleDiscountChange = (value: string) => {
    setFilters((prev) => ({ ...prev, discount: value }));
  };

  const handleRatingAbove4Change = (value: string) => {
    setFilters((prev) => ({ ...prev, rating_above_4: value }));
  };

  const handleCategorySlugChange = (value: string[]) => {
    setFilters((prev) => ({ ...prev, category_slug: value }));
  };

const handlePageChange = (page: number) => {
  setFilters((prev) => ({ ...prev, page }));
};

  if (isError) {
    return (
      <LayoutDashboardView>
        <div className="p-4 text-center text-red-500">
          Gagal memuat produk. Silakan coba lagi.
        </div>
      </LayoutDashboardView>
    );
  }

  return (
    <LayoutDashboardView>
      <SectionSortMobile
        onSearch={handleSearch}
        onPriceFilter={handlePriceFilter}
        onSortChange={handleSortChange}
        selectedPriceFilter={filters.price_filter}
        selectedSortFilter={filters.sort_by}
      />
      <SectionFilterMobile
        highestPrice={filters.highest_price}
        lowestPrice={filters.lowest_price}
        lastAdded={filters.last_added}
        discount={filters.discount}
        ratingAbove={filters.rating_above_4}
        categorySlug={filters.category_slug}
        onPriceRangeChange={handlePriceRange}
        onLastAddedChange={handleLastAddedChange}
        onDiscountChange={handleDiscountChange}
        onRatingAboveChange={handleRatingAbove4Change}
        onCategorySlugChange={handleCategorySlugChange}
      />
      <SectionListProductMobile data={data} loading={isLoading} />
      <PaginationMobile meta={meta} onPageChange={handlePageChange} />
    </LayoutDashboardView>
  );
}

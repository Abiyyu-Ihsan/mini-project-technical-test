"use client";

import React, { useState, useEffect } from "react";

import { Product, ProductsFilterParams, useProductsFilter } from "@libs/services/ProductService";
import { PaginationDesktop } from "../shadcn/PaginationDesktop";
import CardListProduct from "@components/card/CardListProduct";
import { Search } from "../shadcn/Search";
import { SelectDemo } from "../shadcn/InputSelect";

interface SectionListProductProps {
  selectedCategories?: string[];
  highestPrice?: string;
  lowestPrice?: string;
  lastAdded?: string;
  discount?: string;
  ratingAbove?: string;
  categorySlug?: string[];
}

interface Pagination {
  current_page: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

type SortType = "newest" | "most_sold";

export default function SectionListProduct({
  selectedCategories = [],
  highestPrice = "",
  lowestPrice = "",
  lastAdded = "",
  discount = "",
  ratingAbove = "",
  categorySlug = [],
}: SectionListProductProps) {
  const [selectedSort, setSelectedSort] = useState<SortType>("most_sold");
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    last_page: 1,
    links: [],
  });

  const [filters, setFilters] = useState<ProductsFilterParams>({
    size: "",
    discount: "",
    search: "",
    last_added: "",
    sort_by: "most_sold",
    highest_price: "",
    category_slug: [],
    lowest_price: "",
    page: 1,
    categories: [],
    rating_above_4: "",
    price_filter: "",
  });

  // TanStack Query with Custom Hook
  const {
    data: productsData,
    isLoading,
    error,
    refetch,
    isFetching
  } = useProductsFilter(filters);

  useEffect(() => {
    if (productsData?.meta) {
      setPagination({
        current_page: productsData.meta.current_page,
        last_page: productsData.meta.last_page,
        links: productsData.meta.links,
      });
    }
  }, [productsData]);

  const handlePageChange = (page: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: Number(page),
    }));
  };

  useEffect(() => {
    setFilters((prev) => {
      const next = {
        ...prev,
        categories: selectedCategories,
        highest_price: highestPrice,
        lowest_price: lowestPrice,
        last_added: lastAdded,
        discount: discount,
        rating_above_4: ratingAbove,
        category_slug: categorySlug,
      };

      if (JSON.stringify(prev) === JSON.stringify(next)) {
        return prev;
      }
      return next;
    });
  }, [
    selectedCategories,
    highestPrice,
    lowestPrice,
    lastAdded,
    discount,
    ratingAbove,
    categorySlug,
  ]);

  const handleSortChange = (sortType: SortType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort_by: sortType,
    }));
    setSelectedSort(sortType);
  };

  const handlePriceFilterChange = (priceFilter: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price_filter: priceFilter,
    }));
  };

  const handleSearchChange = (query: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: query,
      page: 1, // Reset to first page when searching
    }));
  };

  if (error) {
    return (
      <section className="relative mx-auto max-w-7xl pt-10">
        <div className="text-center text-red-500">
          <p>Error loading products. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl pt-10">
      <div className="relative flex">
        <div className="w-full">
          <div className="relative group">
            {/* Sorting and Search Bar */}
            <div className="md:flex hidden bg-[#00000017] items-center rounded-[4px] py-[14px] px-2">
              <h1 className="text-[#000000B2] text-base font-normal leading-[19px]">
                Urutkan
              </h1>

              <div className="flex items-center ml-[9px] w-full">
                <div
                  className={`rounded p-2 cursor-pointer transition-colors ${selectedSort === "newest"
                    ? "bg-pink-500 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                    }`}
                  onClick={() => handleSortChange("newest")}
                >
                  <h1 className="text-base font-normal leading-[19px]">
                    Terbaru
                  </h1>
                </div>
                <div
                  className={`rounded ml-[9px] p-2 cursor-pointer transition-colors ${selectedSort === "most_sold"
                    ? "bg-pink-500 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                    }`}
                  onClick={() => handleSortChange("most_sold")}
                >
                  <h1 className="text-base font-normal leading-[19px]">
                    Terlaris
                  </h1>
                </div>
              </div>

              <div className="w-[230px]">
                <SelectDemo
                  onFilterChange={(priceFilter) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      price_filter: priceFilter,
                    }))
                  }
                />
              </div>

              <div className="ml-[9px] w-full p-2 rounded cursor-pointer">
                <Search
                  onSearch={(query) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      search: query,
                    }))
                  }
                />
              </div>
            </div>

            {/* Produk List */}
            <div className="mt-4">
              {isLoading || isFetching ? (
                <div className="text-center text-gray-500 py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
                  <p className="mt-2">
                    {isLoading ? 'Loading products...' : 'Updating products...'}
                  </p>
                </div>
              ) : !productsData?.data || productsData.data.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Hasil tidak ditemukan
                </p>
              ) : (
                <ul className="grid grid-cols-4 md:px-0 px-6 md:gap-6 gap-2 my-6 py-0">
                  {productsData.data.map((item: Product, index: number) => (
                    <li key={`${item.slug}-${index}`}>
                      <CardListProduct
                        name={item?.name}
                        slug={`/product/${item.slug}`}
                        thumbnail={item?.thumbnail}
                        price={item?.price}
                        sold={item?.sold_count}
                        rating={item?.rating}
                        discountPercentage={item?.discount_in_percentage}
                        discountPrice={item?.discounted_price}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {/* Pagination */}
              {productsData?.data && productsData.data.length > 0 && (
                <div className="mt-6">
                  <PaginationDesktop
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import CategorySelect from "@components/card/CardSelect";
import { useCategories } from "@libs/services/ProductHomeService";
import React, { useState } from "react";
import { InputHarga } from "../shadcn/InputHarga";
import { CheckboxDiscount } from "../shadcn/CheckboxDiscount";
import { CheckboxComponent } from "../shadcn/CheckboxCategory";

interface SectionSortScreenProps {
  onFilterChange: (value: string | any) => void;
  onHighestPriceChange: (value: string) => void;
  onLowestPriceChange: (value: string) => void;
  onLastAddedChange: (value: string) => void;
  onDiscountChange: (value: string) => void;
  onRatingAboveChange: (value: string) => void;
  onCategorySlugChange: (value: string[] | any) => void;
}

export default function SectionSortScreen({
  onFilterChange,
  onHighestPriceChange,
  onLowestPriceChange,
  onLastAddedChange,
  onDiscountChange,
  onRatingAboveChange,
  onCategorySlugChange,
}: SectionSortScreenProps) {
  const [products, setProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [lastAdded, setLastAdded] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [discountChecked, setDiscountChecked] = useState<boolean>(false);
  const [ratingAbove, setRatingAbove] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const { data: categories, isLoading, isError } = useCategories();

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    onLowestPriceChange(value);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    onHighestPriceChange(value);
  };

  const handleLastAddedChange = (value: string) => {
    setLastAdded(value);
    onLastAddedChange(value);
  };

  const handleDiscountChange = (value: string) => {
    setDiscount(value);
    setDiscountChecked(value === "true");
    onDiscountChange(value);
  };

  const handleRatingChange = () => {
    const newValue = !ratingAbove;
    setRatingAbove(newValue);
    onRatingAboveChange(newValue ? "true" : "");
  };

  const handleCategoryChange = (slug: string) => {
    let updatedCategories;

    if (selectedCategories.includes(slug)) {
      updatedCategories = selectedCategories.filter((c) => c !== slug);
    } else {
      updatedCategories = [...selectedCategories, slug];
    }

    console.log("Before filtering:", updatedCategories);

    updatedCategories = updatedCategories.filter((c) => c.trim() !== "");

    console.log("After filtering:", updatedCategories);

    setSelectedCategories(updatedCategories);
    onCategorySlugChange(updatedCategories.length > 0 ? updatedCategories : null);
  };

  return (
    <section>
      <div className="relative shadow-[#00000040] shadow border-[#E2E8F0] bg-white mx-auto max-w-7xl rounded-[8px] p-3">
        <div className="relative flex">
          <div className="w-full">
            {/* Filter Berdasarkan Kategori Produk */}
            <div>
              <h1 className="text-black text-base font-medium leading-[14px]">
                Kategori Produk
              </h1>
              
              {categories?.slice(0, 6).map((category) => (
                <CheckboxComponent
                  key={category.slug}
                  name={category.name}
                  checked={selectedCategories.includes(category.slug)}
                  onChange={() => handleCategoryChange(category.slug)}
                />
              ))} 
             
            </div>

            {/* Filter Berdasarkan Disc */}
            <div className="my-4">
              <h1 className="text-black text-base font-medium leading-[14px]">
                Penawaran
              </h1>
              
              <CheckboxDiscount
                checked={discountChecked}
                onDiscountChange={handleDiscountChange}
              /> 
             
            </div>

            {/* Filter Berdasarkan Harga */}
            <div className="my-4">
              <h1 className="text-black text-base font-medium leading-[14px]">
                Harga
              </h1>
              
              <InputHarga
                minValue={minPrice}
                maxValue={maxPrice}
                onMinChange={handleMinPriceChange}
                onMaxChange={handleMaxPriceChange}
              /> 
             
            </div>

            {/* Filter Berdasarkan Rating */}
            <div className="my-4">
              <h1 className="text-black text-base font-medium leading-[14px]">
                Rating
              </h1>
              
              <div
                className={`border p-1 mt-3 rounded-[8px] inline-flex items-center cursor-pointer border-[#0000004D] ${
                  ratingAbove ? "bg-pink-500 text-white" : "bg-white text-black"
                }`}
                onClick={handleRatingChange}
              >
                <img src="/icons/bintang.svg" className="w-5" />
                <p className="flex items-center text-base px-1 mt-0.5">
                  Rating 4 ke Atas
                </p>
              </div> 
             
            </div>

            {/* Filter Berdasarkan Last Added */}
            <div className="my-4">
              <h1 className="text-black text-base font-medium leading-[14px]">
                Terakhir Ditambahkan
              </h1>
              <CategorySelect
                lastAdded={lastAdded}
                onLastAddedChange={handleLastAddedChange}
              />
            </div>

            <button
              className="bg-[#FF88C6] rounded-[6px] w-full p-3"
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setLastAdded("");
                setDiscount("");
                setDiscountChecked(false);
                setRatingAbove(false);
                setSelectedCategories([]);
                onLowestPriceChange("");
                onHighestPriceChange("");
                onLastAddedChange("");
                onDiscountChange("");
                onRatingAboveChange("");
                onCategorySlugChange([]);
              }}
            >
              <p className="text-white text-base font-semibold leading-[19px]">
                Reset Filter
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

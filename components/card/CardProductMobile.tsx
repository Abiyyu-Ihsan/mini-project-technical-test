import React, { useEffect, useState } from "react";
import { useCategories } from "@libs/services/SortService";
import { Checkbox } from "@shadcn/components/ui/checkbox";

interface Category {
  slug: string;
  name: string;
}

interface CategoryProductMobileProps {
  selectedCategories?: string[];
  onCategoryChange: (categories: string[]) => void;
  onClose: () => void;
  onReset: () => void;
}

export default function CategoryProductMobile({
  selectedCategories = [],
  onCategoryChange,
  onClose,
  onReset,
}: CategoryProductMobileProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedCategories);

   const { data: categories, isLoading, isError } = useCategories();


  // Handle perubahan kategori
  const handleCategoryToggle = (slug: string) => {
    let updatedCategories: string[];
    if (localSelected.includes(slug)) {
      updatedCategories = localSelected.filter((item) => item !== slug);
    } else {
      updatedCategories = [...localSelected, slug];
    }
    setLocalSelected(updatedCategories);
  };

  const handleSave = () => {
    onCategoryChange(localSelected);
    onClose();
  };

  const handleReset = () => {
    setLocalSelected([]);
    onReset();
  };

  return (
    <section>
      <div className="p-4">
        <div className="flex justify-between items-center mb-7">
          <h1 className="text-black text-base font-semibold leading-[22px]">
            Filter Kategori Produk
          </h1>
          {localSelected.length > 0 && (
            <h1
              className="text-[#FF88C6] text-sm font-semibold leading-[22px] cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </h1>
          )}
        </div>
        {categories?.slice(0, 6).map((product, i) => {
          const isChecked = localSelected.includes(product.slug);
          return (
            <div
              key={product.slug}
              className="flex items-center border-b pb-3 justify-between mt-3"
            >
              <label
                htmlFor={`category-${i}`}
                className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {product.name}
              </label>
              <Checkbox
                id={`category-${i}`}
                checked={isChecked}
                onCheckedChange={() => handleCategoryToggle(product.slug)}
              />
            </div>
          );
        })}
        {localSelected.length > 0 && (
          <button
            className="w-full mt-3 bg-[#FF88C6] text-white p-2 rounded-md"
            onClick={handleSave}
          >
            Simpan
          </button>
        )}
      </div>
    </section>
  );
}

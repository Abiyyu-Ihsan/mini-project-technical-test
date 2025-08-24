import React, { useEffect, useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import {
  useCategories,
  useProductsByCategory,
} from "@libs/services/ProductHomeService";
import CardTopProduct from "@components/card/CardTopProduct";

export default function SectionProductScreen() {
  const { data: categories, isLoading, error } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].slug);
    }
  }, [categories, selectedCategory]);

  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useProductsByCategory(selectedCategory);

  return (
    <section>
      <div className="relative pt-12 px-5">
        <div className="flex justify-center mb-3 ">
          <h1 className="text-black md:text-lg text-base font-semibold inline-flex bg-[#5CCCDC] rounded-[50px] px-3 py-1">
            PRODUCT
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading categories...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            Failed to load categories
          </div>
        ) : (
          <TabGroup>
            <div className="w-full flex pt-3 justify-center">
              <TabList
                style={{ scrollbarWidth: "auto" }}
                className="md:flex gap-5 md:justify-center scrollbar-hidden flex whitespace-nowrap overflow-x-auto rounded"
              >
                {categories?.slice(0, 6).map((cat) => (
                  <Tab
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={({ selected }) =>
                      selected
                        ? "text-[#EB92C0] text-sm md:text-base font-semibold leading-5 underline underline-offset-8 p-2"
                        : "text-black hover:text-[#EB92C0] text-sm md:text-base font-semibold leading-5 p-2"
                    }
                  >
                    {cat.name}
                  </Tab>
                ))}
              </TabList>
            </div>

            {/* Komponen Produk */}
            {loadingProducts ? (
              <div className="text-center py-10">Loading products...</div>
            ) : errorProducts ? (
              <div className="text-center py-10 text-red-500">
                Failed to load products
              </div>
            ) : (
              <div className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:px-10 mt-6">
                {products?.map((product) => (
                  <CardTopProduct
                    key={product.id}
                    images={product?.thumbnail}
                    name={product?.name}
                    slug={`product/${product?.slug}`}
                  />
                ))}
              </div>
            )}
          </TabGroup>
        )}
      </div>
    </section>
  );
}

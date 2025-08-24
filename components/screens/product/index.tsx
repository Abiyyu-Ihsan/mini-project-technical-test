import LayoutDashboardView from '@components/layouts/LayoutMain'
import React, { useState } from 'react'
import SectionListProduct from './SectionListProduct'
import SectionSortScreen from './SectionSortScreen'

export default function ProductView() {
    const [selectedCategories, setSelectedCategories] = useState<[]>([]);
    const [highestPrice, setHighestPrice] = useState<string>("");
    const [lowestPrice, setLowestPrice] = useState<string>("");
    const [lastAdded, setLastAdded] = useState<string>("");
    const [discount, setDiscount] = useState<string>("");
    const [ratingAbove, setRatingAbove] = useState<string>("");
    const [categorySlug, setCategorySlug] = useState<[]>([]);
    return (
        <LayoutDashboardView>
            <section className="pt-0 lg:pt-10">
                <div className="relative pt-6 pb-12 gap-3 mx-auto max-w-7xl">
                    <div className="relative flex">
                        <div className="w-[319px] pt-10">
                            <div className="flex mb-3">
                                <img src="/icons/filter.svg" />
                                <h1 className="text-black text-2xl font-medium leading-[29px] pl-3">
                                    Filter
                                </h1>
                            </div>

                            {/* Kirim setter ke SectionSort */}
                            <SectionSortScreen
                            onFilterChange={setSelectedCategories}
                            onHighestPriceChange={setHighestPrice}
                            onLowestPriceChange={setLowestPrice}
                            onLastAddedChange={setLastAdded}
                            onDiscountChange={setDiscount}
                            onRatingAboveChange={setRatingAbove}
                            onCategorySlugChange={setCategorySlug}
                            />
                            {/* Kirim setter ke SectionSort */}
                        </div>
                        <div className="w-full mx-auto md:w-4/5 pl-[37px] md:pr-0">
                            {/* Kirim kategori terpilih ke SectionListProduct */}
                            {/* <SectionListProduct
                selectedCategories={selectedCategories}
                highestPrice={highestPrice}
                lowestPrice={lowestPrice}
                lastAdded={lastAdded}
                discount={discount}
                ratingAbove={ratingAbove}
                categorySlug={categorySlug}
              /> */}
                            <SectionListProduct
                                selectedCategories={selectedCategories}
                                highestPrice={highestPrice}
                                lowestPrice={lowestPrice}
                                lastAdded={lastAdded}
                                discount={discount}
                                ratingAbove={ratingAbove}
                                categorySlug={categorySlug} />
                        </div>
                    </div>
                </div>
            </section>
        </LayoutDashboardView>
    )
}

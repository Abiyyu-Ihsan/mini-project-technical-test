import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@shadcn/components/ui/radio-group";

interface CategoryMobileProps {
  onPriceFilter: (value: string) => void;
  onSortFilter: (value: string) => void;
  selectedPriceFilter?: string;
  selectedSortFilter?: string;
  onReset: () => void;
}

export default function CategoryMobile({
  onPriceFilter,
  onSortFilter,
  selectedPriceFilter,
  selectedSortFilter,
  onReset,
}: CategoryMobileProps) {
  const [tempPriceFilter, setTempPriceFilter] = useState<string>(
    selectedPriceFilter || ""
  );
  const [tempSortFilter, setTempSortFilter] = useState<string>(
    selectedSortFilter || ""
  );

  const handleReset = () => {
    setTempPriceFilter("");
    setTempSortFilter("");
    onReset();
  };

  const handleSave = () => {
    onPriceFilter(tempPriceFilter);
    onSortFilter(tempSortFilter);
  };

  const handleFilterChange = (value: string) => {
    if (value === "newest" || value === "most_sold") {
      setTempSortFilter(value);
      setTempPriceFilter("");
    } else {
      setTempPriceFilter(value);
      setTempSortFilter("");
    }
  };

  return (
    <section>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-base font-semibold leading-[22px]">
            Urutkan
          </h1>
          {(tempPriceFilter || tempSortFilter) && (
            <h1
              className="text-[#FF88C6] text-sm font-semibold leading-[22px] cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </h1>
          )}
        </div>

        <div className="mt-7">
          <RadioGroup
            value={tempSortFilter || tempPriceFilter}
            onValueChange={handleFilterChange}
          >
            <div className="flex items-center justify-between border-b mt-3 pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Terbaru</p>
              <RadioGroupItem value="newest" id="r1" />
            </div>
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Terlaris</p>
              <RadioGroupItem value="most_sold" id="r2" />
            </div>
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Rendah ke Tinggi</p>
              <RadioGroupItem value="asc" id="r3" />
            </div>
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Tinggi ke Rendah</p>
              <RadioGroupItem value="desc" id="r4" />
            </div>
          </RadioGroup>
        </div>

        {(tempPriceFilter || tempSortFilter) && (
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

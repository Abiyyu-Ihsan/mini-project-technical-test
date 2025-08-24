import { RadioGroup, RadioGroupItem } from "@shadcn/components/ui/radio-group";
import React, { useState } from "react";

interface CategoryDiscountProps {
  discount: boolean | any;
  onDiscountChange: (value: boolean | any) => void;
  onClose: () => void;
  onReset: () => void;

}

export default function CategoryDiscount({
  discount,
  onDiscountChange,
  onClose,
}: CategoryDiscountProps) {
  const [selectedDiscount, setSelectedDiscount] = useState<boolean | null>(discount);
  const [hasSelection, setHasSelection] = useState<boolean>(discount !== null);

  const handleDiscountChange = (value: string) => {
    const newValue = value === "true";
    setSelectedDiscount(newValue);
    setHasSelection(true);
  };

  const handleReset = () => {
    setSelectedDiscount(null);
    setHasSelection(false);
    onDiscountChange(null);
  };

  const handleSave = () => {
    onDiscountChange(selectedDiscount);
    onClose();
  };

  return (
    <section>
      <div className="p-4 max-w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-base font-semibold leading-[22px]">
            Filter Penawaran
          </h1>
          {selectedDiscount && (
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
            value={selectedDiscount !== null ? String(selectedDiscount) : ""}
            onValueChange={handleDiscountChange}
          >
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Diskon</p>
              <RadioGroupItem value="true" id="r1" />
            </div>
          </RadioGroup>
        </div>
        <div className="mt-7">
          <RadioGroup
            value={selectedDiscount !== null ? String(selectedDiscount) : ""}
            onValueChange={handleDiscountChange}
          >
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Diskon</p>
              <RadioGroupItem value="true" id="r1" />
            </div>
          </RadioGroup>
        </div>
        <div className="mt-7">
          <RadioGroup
            value={selectedDiscount !== null ? String(selectedDiscount) : ""}
            onValueChange={handleDiscountChange}
          >
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Diskon</p>
              <RadioGroupItem value="true" id="r1" />
            </div>
          </RadioGroup>
        </div>
        <div className="mt-7">
          <RadioGroup
            value={selectedDiscount !== null ? String(selectedDiscount) : ""}
            onValueChange={handleDiscountChange}
          >
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Diskon</p>
              <RadioGroupItem value="true" id="r1" />
            </div>
          </RadioGroup>
        </div>
        <div className="mt-7">
          <RadioGroup
            value={selectedDiscount !== null ? String(selectedDiscount) : ""}
            onValueChange={handleDiscountChange}
          >
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Diskon</p>
              <RadioGroupItem value="true" id="r1" />
            </div>
          </RadioGroup>
        </div>
        <div className="mt-7">
          <RadioGroup
            value={selectedDiscount !== null ? String(selectedDiscount) : ""}
            onValueChange={handleDiscountChange}
          >
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Diskon</p>
              <RadioGroupItem value="true" id="r1" />
            </div>
          </RadioGroup>
        </div>
        <div className="mt-7">
          <RadioGroup
            value={selectedDiscount !== null ? String(selectedDiscount) : ""}
            onValueChange={handleDiscountChange}
          >
            <div className="flex items-center justify-between border-b pb-3 border-b-[#E2E8F0] space-x-2">
              <p>Harga Diskon</p>
              <RadioGroupItem value="true" id="r1" />
            </div>
          </RadioGroup>
        </div>

        {selectedDiscount && (
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

"use client";

import { Checkbox } from "@shadcn/components/ui/checkbox";
import { useState, useEffect } from "react";

interface CheckboxDiscountProps {
  checked: boolean;
  onDiscountChange: (value: string) => void;
}

export function CheckboxDiscount({ checked, onDiscountChange }: CheckboxDiscountProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onDiscountChange(newChecked ? "true" : "");
  };

  return (
    <div className="items-top flex items-center space-x-2 mt-3">
      <Checkbox
        id="discount-checkbox"
        checked={isChecked}
        onCheckedChange={handleChange}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="discount-checkbox"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Harga Diskon
        </label>
      </div>
    </div>
  );
}

import { Input } from "@shadcn/components/ui/input";
import React from "react";

interface InputHargaProps {
  minValue: string | number;
  maxValue: string | number;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

export function InputHarga({ minValue, maxValue, onMinChange, onMaxChange }: InputHargaProps) {
  const formatRupiah = (value: string | number): string => {
    if (!value) return "";
    const numericValue = parseInt(value.toString(), 10);
    if (isNaN(numericValue)) return "";
    return `Rp ${numericValue.toLocaleString("id-ID")}`;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    onMinChange(rawValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    onMaxChange(rawValue);
  };

  return (
    <section>
      <div className="mt-3">
        <Input
          type="text"
          placeholder="Harga Minimum"
          value={formatRupiah(minValue)}
          onChange={handleMinChange}
        />
      </div>
      <div className="mt-3">
        <Input
          type="text"
          placeholder="Harga Maksimum"
          value={formatRupiah(maxValue)}
          onChange={handleMaxChange}
        />
      </div>
    </section>
  );
}

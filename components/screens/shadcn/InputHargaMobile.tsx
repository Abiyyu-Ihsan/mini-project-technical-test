import { Input } from "@shadcn/components/ui/input";
import React from "react";

interface InputHargaMobileProps {
  highestPrice: string | number | null;
  lowestPrice: string | number | null;
  onPriceRangeChange: (lowest: string, highest: string) => void;
}

export default function InputHargaMobile({
  highestPrice,
  lowestPrice,
  onPriceRangeChange,
}: InputHargaMobileProps) {
  const formatRupiah = (value: string | number | null): string => {
    if (!value) return "";
    return `Rp ${parseInt(value as string, 10).toLocaleString("id-ID")}`;
  };

  const parseRupiah = (value: string): string => {
    return value.replace(/\D/g, "");
  };

  return (
    <section>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div>
          <Input
            type="text"
            placeholder="Harga Minimum"
            value={lowestPrice ? formatRupiah(lowestPrice) : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onPriceRangeChange(parseRupiah(e.target.value), highestPrice ? String(highestPrice) : "")
            }
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Harga Maksimum"
            value={highestPrice ? formatRupiah(highestPrice) : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onPriceRangeChange(lowestPrice ? String(lowestPrice) : "", parseRupiah(e.target.value))
            }
          />
        </div>
      </div>
    </section>
  );
}

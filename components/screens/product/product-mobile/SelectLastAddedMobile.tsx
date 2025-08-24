import React from "react";

interface SelectLastAddedMobileProps {
  selectedLastAdded: number | any;
  onChange: (value: number | any) => void;
}

export default function SelectLastAddedMobile({
  selectedLastAdded,
  onChange,
}: SelectLastAddedMobileProps) {
  const options: number[] = [7, 14, 30];

  const handleSelect = (value: number) => {
    onChange(value);
  };

  return (
    <section>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {options.map((option) => (
          <div key={option} onClick={() => handleSelect(option)}>
            <div
              className={`border p-2 rounded-[8px] ${
                selectedLastAdded === option
                  ? "bg-[#FF88C6] text-white"
                  : "border-[#0000004D]"
              }`}
            >
              <h1 className="text-center text-base font-normal leading-[19px]">
                {option} Hari
              </h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

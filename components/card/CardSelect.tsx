import { options } from "@libs/models";
import React from "react";

interface Option {
  value: string;
  label: string;
}

interface CategorySelectProps {
  lastAdded: string;
  onLastAddedChange: (value: string) => void;
}

export default function CategorySelect({
  lastAdded,
  onLastAddedChange,
}: CategorySelectProps) {
  const handleSelect = (value: string) => {
    onLastAddedChange(value);
  };

  return (
    <section>
      <div className="mt-3">
        <div className="grid grid-cols-3 gap-2 cursor-pointer">
          {options?.map((option: Option) => (
            <div
              key={option.value}
              className={`border-[#0000004D] border rounded-[8px] p-2 ${
                lastAdded === option.value ? "bg-[#FF88C6] text-white" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <h1
                className={`text-center text-base font-normal leading-[19px] ${
                  lastAdded === option.value ? "text-white" : "text-[#747474]"
                }`}
              >
                {option.label}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

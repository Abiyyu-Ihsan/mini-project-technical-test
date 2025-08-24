"use client";

import * as React from "react";
import {
    Select, SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@shadcn/components/ui/select";

interface SelectDemoProps {
    onFilterChange: (value: string) => void;
}

export function SelectDemo({ onFilterChange }: SelectDemoProps) {
    return (
        <Select
            onValueChange={(value) =>
                onFilterChange(value === "harga rendah ke tinggi" ? "asc" : "desc")
            }
        >
            <SelectTrigger className="w-[230px] bg-white ml-[9px] text-base font-normal leading-[19px]">
                <SelectValue placeholder="Harga" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem
                        value="harga rendah ke tinggi"
                        className="cursor-pointer text-base font-normal leading-[19px]"
                    >
                        Harga Rendah ke Tinggi
                    </SelectItem>
                    <SelectItem
                        value="harga tinggi ke rendah"
                        className="cursor-pointer text-base font-normal leading-[19px]"
                    >
                        Harga Tinggi ke Rendah
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

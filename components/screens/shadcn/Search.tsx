"use client";

import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@shadcn/components/ui/command";

interface SearchProps {
  onSearch: (query: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <Command className="rounded-lg md:min-w-[500px]">
      <CommandInput
        placeholder="Cari Produk"
        value={query}
        onValueChange={handleSearch}
      />
      <CommandList>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}

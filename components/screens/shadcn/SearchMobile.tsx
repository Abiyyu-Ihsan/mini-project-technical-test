import React, { useState, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@shadcn/components/ui/command";

interface SearchMobileProps {
  onSearch: (query: string) => void;
}

export function SearchMobile({ onSearch }: SearchMobileProps) {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <Command className="rounded-lg w-[270px]">
      <CommandInput
        placeholder="Cari Produk"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}

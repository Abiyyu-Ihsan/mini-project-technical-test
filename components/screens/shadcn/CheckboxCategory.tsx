"use client";

import { Checkbox } from "@shadcn/components/ui/checkbox";

interface CheckboxComponentProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxComponent({
  name,
  checked,
  onChange,
}: CheckboxComponentProps) {
  return (
    <div className="items-top flex items-center space-x-2 mt-3">
      <Checkbox id={name} checked={checked} onCheckedChange={onChange} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {name}
        </label>
      </div>
    </div>
  );
}

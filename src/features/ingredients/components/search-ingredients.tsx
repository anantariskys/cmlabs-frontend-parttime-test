"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type SearchIngredientsProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchIngredients({ value, onChange }: SearchIngredientsProps) {
  return (
    <div className="group relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-all duration-200 ease-in-out group-focus-within:text-primary" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari ingredient berdasarkan nama..."
        className="h-11 rounded-2xl border-border/80 bg-background pl-11 text-sm shadow-sm transition-all duration-200 ease-in-out focus-visible:border-primary/30"
      />
    </div>
  );
}

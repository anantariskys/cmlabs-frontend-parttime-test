"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Sparkles } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { PaginationControls } from "@/components/layout/pagination-controls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useIngredientsQuery } from "../hooks";
import { IngredientsGrid } from "./ingredients-grid";
import { SearchIngredients } from "./search-ingredients";

export function IngredientsPageContent() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ingredientsQuery = useIngredientsQuery();
  const deferredSearch = useDeferredValue(search);
  const pageSize = 12;

  const filteredIngredients = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    if (!ingredientsQuery.data) {
      return [];
    }

    return ingredientsQuery.data.filter((ingredient) => {
      const matchesSearch = normalizedSearch
        ? ingredient.strIngredient.toLowerCase().includes(normalizedSearch)
        : true;
      const matchesType =
        activeType === "All" ? true : ingredient.strType === activeType;

      return matchesSearch && matchesType;
    });
  }, [activeType, deferredSearch, ingredientsQuery.data]);

  const ingredientTypes = useMemo(() => {
    const values = new Set<string>();

    ingredientsQuery.data?.forEach((ingredient) => {
      if (ingredient.strType) {
        values.add(ingredient.strType);
      }
    });

    return ["All", ...Array.from(values).slice(0, 6)];
  }, [ingredientsQuery.data]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredIngredients.length / pageSize),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedIngredients = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredIngredients.slice(start, start + pageSize);
  }, [filteredIngredients, safeCurrentPage]);

  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [activeType, deferredSearch]);

  return (
    <AppShell
      eyebrow="Food Directory"
      title="Browse Ingredients"
      subtitle="Search and explore ingredients to inspire your next masterpiece."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Food" },
        { label: "Ingredients" },
      ]}
      headerActions={
        <div className="hidden items-center gap-2 rounded-2xl border border-border/80 bg-background px-3 py-2 text-xs text-muted-foreground md:inline-flex">
          <Sparkles className="size-4 text-primary" />
          Powered by live ingredient data
        </div>
      }
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="border border-primary/10 bg-primary/10 text-[11px] text-primary"
                >
                  Popular
                </Badge>
                <Badge variant="outline" className="text-[11px]">
                  Frontend search
                </Badge>
                <Badge variant="outline" className="text-[11px]">
                  {filteredIngredients.length} visible
                </Badge>
              </div>

              <SearchIngredients value={search} onChange={setSearch} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {ingredientTypes.map((type) => (
                <Button
                  key={type}
                  variant={activeType === type ? "default" : "outline"}
                  size="xs"
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Ingredients
            </span>
            <div className="h-px w-12 bg-border" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-[11px]">
              Total: {ingredientsQuery.data?.length ?? 0}
            </Badge>
            <Badge variant="outline" className="text-[11px]">
              Showing: {filteredIngredients.length}
            </Badge>
          </div>
        </div>

        {ingredientsQuery.isError ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Gagal memuat daftar ingredient. Silakan coba lagi.
          </div>
        ) : null}

        <IngredientsGrid
          ingredients={paginatedIngredients}
          isLoading={ingredientsQuery.isLoading}
        />
        <PaginationControls
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          totalItems={filteredIngredients.length}
          pageSize={pageSize}
          onPageChange={(page) =>
            setCurrentPage(Math.min(Math.max(page, 1), totalPages))
          }
          itemLabel="ingredients"
        />
      </div>
    </AppShell>
  );
}

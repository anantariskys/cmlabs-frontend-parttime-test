"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AppShell } from "@/components/layout/app-shell";
import { PaginationControls } from "@/components/layout/pagination-controls";
import { Badge } from "@/components/ui/badge";

import { useMealsByIngredientQuery } from "../hooks";
import { MealsGrid } from "./meals-grid";
import { SearchMeals } from "./search-meals";

type IngredientDetailContentProps = {
  ingredient: string;
};

export function IngredientDetailContent({
  ingredient,
}: IngredientDetailContentProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const mealsQuery = useMealsByIngredientQuery(ingredient);
  const deferredSearch = useDeferredValue(search);
  const pageSize = 8;

  const filteredMeals = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    if (!mealsQuery.data) {
      return [];
    }

    if (!normalizedSearch) {
      return mealsQuery.data;
    }

    return mealsQuery.data.filter((meal) =>
      meal.strMeal.toLowerCase().includes(normalizedSearch),
    );
  }, [deferredSearch, mealsQuery.data]);

  const totalPages = Math.max(1, Math.ceil(filteredMeals.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedMeals = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredMeals.slice(start, start + pageSize);
  }, [filteredMeals, safeCurrentPage]);

  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [deferredSearch, ingredient]);

  return (
    <AppShell
      eyebrow="Food Collection"
      title={`Meals with ${ingredient}`}
      subtitle="Explore a curated collection of dishes built around this ingredient."
      backHref="/ingredients"
      backLabel="Kembali ke Ingredients"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Food" },
        { label: "Ingredients", href: "/ingredients" },
        { label: ingredient },
      ]}
      headerActions={
        <div className="w-full sm:w-[320px]">
          <SearchMeals value={search} onChange={setSearch} />
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/10 bg-primary/10 text-[11px] text-primary"
          >
            Curated recipes
          </Badge>
          <Badge variant="outline" className="text-[11px]">
            Total meal: {mealsQuery.data?.length ?? 0}
          </Badge>
          <Badge variant="outline" className="text-[11px]">
            Showing: {filteredMeals.length}
          </Badge>
        </div>
        {mealsQuery.isError ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Gagal memuat list meal. Silakan coba lagi.
          </div>
        ) : null}
        <MealsGrid meals={paginatedMeals} isLoading={mealsQuery.isLoading} />
        <PaginationControls
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          totalItems={filteredMeals.length}
          pageSize={pageSize}
          onPageChange={(page) =>
            setCurrentPage(Math.min(Math.max(page, 1), totalPages))
          }
          itemLabel="meals"
        />
      </div>
    </AppShell>
  );
}

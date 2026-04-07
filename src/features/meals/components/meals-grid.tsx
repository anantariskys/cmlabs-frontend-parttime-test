import { Skeleton } from "@/components/ui/skeleton";

import type { MealSummary } from "../types";
import { MealCard } from "./meal-card";

type MealsGridProps = {
  meals: MealSummary[];
  isLoading: boolean;
};

export function MealsGrid({ meals, isLoading }: MealsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} className="h-72 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!meals.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center text-sm text-muted-foreground">
        Meal tidak ditemukan untuk ingredient ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}

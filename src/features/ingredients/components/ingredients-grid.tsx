import { Skeleton } from "@/components/ui/skeleton";

import type { Ingredient } from "../types";
import { IngredientCard } from "./ingredient-card";

type IngredientsGridProps = {
  ingredients: Ingredient[];
  isLoading: boolean;
};

export function IngredientsGrid({
  ingredients,
  isLoading,
}: IngredientsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} className="h-64 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!ingredients.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center text-sm text-muted-foreground">
        Ingredient tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient.idIngredient} ingredient={ingredient} />
      ))}
    </div>
  );
}

import { apiClient } from "@/lib/api-client";

import type { MealDetail, MealSummary } from "./types";

type MealsResponse = {
  meals: MealSummary[] | null;
};

type MealDetailResponse = {
  meals: MealDetail[] | null;
};

export async function getMealsByIngredient(ingredient: string) {
  const { data } = await apiClient.get<MealsResponse>(
    `/filter.php?i=${encodeURIComponent(ingredient)}`,
  );

  return data.meals ?? [];
}

export async function getMealDetail(mealId: string) {
  const { data } = await apiClient.get<MealDetailResponse>(
    `/lookup.php?i=${mealId}`,
  );
  return data.meals?.[0] ?? null;
}

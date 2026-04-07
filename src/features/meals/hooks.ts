"use client";

import { useQuery } from "@tanstack/react-query";

import { getMealDetail, getMealsByIngredient } from "./api";

export function useMealsByIngredientQuery(ingredient: string) {
  return useQuery({
    queryKey: ["meals", "ingredient", ingredient],
    queryFn: () => getMealsByIngredient(ingredient),
    enabled: Boolean(ingredient),
  });
}

export function useMealDetailQuery(mealId: string) {
  return useQuery({
    queryKey: ["meal", mealId],
    queryFn: () => getMealDetail(mealId),
    enabled: Boolean(mealId),
  });
}

import { apiClient } from "@/lib/api-client";

import type { Ingredient } from "./types";

type IngredientResponse = {
  meals: Ingredient[] | null;
};

export async function getIngredients() {
  const { data } = await apiClient.get<IngredientResponse>("/list.php?i=list");
  return data.meals ?? [];
}

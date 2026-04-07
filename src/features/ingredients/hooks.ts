"use client";

import { useQuery } from "@tanstack/react-query";

import { getIngredients } from "./api";

export function useIngredientsQuery() {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
  });
}

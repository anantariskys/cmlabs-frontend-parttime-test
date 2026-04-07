import type { Metadata } from "next";

import { IngredientDetailContent } from "@/features/meals/components/ingredient-detail-content";

type IngredientDetailPageProps = {
  params: Promise<{
    ingredient: string;
  }>;
};

export async function generateMetadata({
  params,
}: IngredientDetailPageProps): Promise<Metadata> {
  const { ingredient } = await params;
  const decodedIngredient = decodeURIComponent(ingredient);

  return {
    title: decodedIngredient,
  };
}

export default async function IngredientDetailPage({
  params,
}: IngredientDetailPageProps) {
  const { ingredient } = await params;

  return (
    <IngredientDetailContent ingredient={decodeURIComponent(ingredient)} />
  );
}

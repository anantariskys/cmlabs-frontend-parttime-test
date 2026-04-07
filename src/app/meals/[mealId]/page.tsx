import type { Metadata } from "next";

import { getMealDetail } from "@/features/meals/api";
import { MealDetailContent } from "@/features/meals/components/meal-detail-content";

type MealDetailPageProps = {
  params: Promise<{
    mealId: string;
  }>;
};

export async function generateMetadata({
  params,
}: MealDetailPageProps): Promise<Metadata> {
  const { mealId } = await params;
  const meal = await getMealDetail(mealId);

  return {
    title: meal?.strMeal ?? "Meal Detail",
  };
}

export default async function MealDetailPage({ params }: MealDetailPageProps) {
  const { mealId } = await params;

  return <MealDetailContent mealId={mealId} />;
}

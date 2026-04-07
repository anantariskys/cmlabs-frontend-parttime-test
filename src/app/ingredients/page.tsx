import type { Metadata } from "next";

import { IngredientsPageContent } from "@/features/ingredients/components/ingredients-page-content";

export const metadata: Metadata = {
  title: "Ingredients",
};

export default function IngredientsPage() {
  return <IngredientsPageContent />;
}

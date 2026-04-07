import { AppShell } from "@/components/layout/app-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingIngredientMealsPage() {
  return (
    <AppShell
      title="Loading meals..."
      backHref="/ingredients"
      backLabel="Kembali ke Ingredients"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} className="h-80 rounded-xl" />
        ))}
      </div>
    </AppShell>
  );
}

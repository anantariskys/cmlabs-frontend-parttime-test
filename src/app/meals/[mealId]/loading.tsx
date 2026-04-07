import { AppShell } from "@/components/layout/app-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMealDetailPage() {
  return (
    <AppShell
      title="Loading meal detail..."
      backHref="/ingredients"
      backLabel="Kembali ke Ingredients"
    >
      <div className="space-y-4">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-48" />
      </div>
    </AppShell>
  );
}

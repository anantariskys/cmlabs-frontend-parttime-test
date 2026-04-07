"use client";

import Image from "next/image";
import { BookOpenText, Clock3, PlayCircle, Sparkles } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { SectionCard } from "@/components/layout/section-card";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { useMealDetailQuery } from "../hooks";
import { getMealMeta, getRecipeItems, getYoutubeEmbedUrl } from "../utils";

type MealDetailContentProps = {
  mealId: string;
};

export function MealDetailContent({ mealId }: MealDetailContentProps) {
  const mealDetailQuery = useMealDetailQuery(mealId);

  if (mealDetailQuery.isLoading) {
    return (
      <AppShell
        eyebrow="Food Detail"
        title="Loading meal..."
        backHref="/ingredients"
        backLabel="Kembali ke Ingredients"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Food" },
          { label: "Ingredients", href: "/ingredients" },
          { label: "Loading" },
        ]}
      >
        <div className="space-y-3">
          <Skeleton className="h-52 w-full rounded-lg" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      </AppShell>
    );
  }

  if (mealDetailQuery.isError || !mealDetailQuery.data) {
    return (
      <AppShell
        eyebrow="Food Detail"
        title="Meal tidak ditemukan"
        backHref="/ingredients"
        backLabel="Kembali ke Ingredients"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Food" },
          { label: "Ingredients", href: "/ingredients" },
          { label: "Missing meal" },
        ]}
      >
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Data meal gagal dimuat atau tidak tersedia.
        </div>
      </AppShell>
    );
  }

  const meal = mealDetailQuery.data;
  const recipeItems = getRecipeItems(meal);
  const youtubeEmbedUrl = getYoutubeEmbedUrl(meal.strYoutube);
  const meta = getMealMeta(meal.idMeal);

  return (
    <AppShell
      eyebrow="Food Detail"
      title={meal.strMeal}
      subtitle={`A signature ${meal.strCategory ?? "recipe"} with ${meal.strArea ?? "global"} inspiration and a polished presentation.`}
      backHref="/ingredients"
      backLabel="Kembali ke Ingredients"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Food" },
        { label: "Ingredients", href: "/ingredients" },
        { label: meal.strMeal },
      ]}
    >
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-muted/20 shadow-sm">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={1200}
                height={675}
                className="h-72 w-full object-cover transition-all duration-200 ease-in-out hover:scale-[1.02] md:h-[360px]"
                priority
              />
            </div>

            <SectionCard
              title="Instructions"
              className="border-border/80"
              contentClassName="space-y-3 p-4 sm:p-6"
            >
              <div className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                <BookOpenText className="size-4" />
                Instructions
              </div>
              <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {meal.strInstructions || "Tutorial belum tersedia."}
              </p>
            </SectionCard>

            {youtubeEmbedUrl ? (
              <SectionCard
                className="border-border/80"
                contentClassName="p-4 sm:p-6"
                title="Watch the Masterclass"
                description="A quick visual walkthrough for the meal."
              >
                <div
                  id="video-section"
                  className="overflow-hidden rounded-2xl border border-border bg-background"
                >
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`Tutorial ${meal.strMeal}`}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </SectionCard>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <SectionCard
              title="Ingredients"
              description="Everything you need for this dish."
              className="border-border/80"
              contentClassName="space-y-3 p-4 sm:p-5"
            >
              <div className="space-y-2">
                {recipeItems.length ? (
                  recipeItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-xl border border-border/70 bg-background px-3 py-2 text-sm"
                    >
                      <span className="text-foreground">
                        {item.split(" (")[0]}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.includes("(")
                          ? item.split("(")[1]?.replace(")", "")
                          : "Ready"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Daftar bahan belum tersedia.
                  </p>
                )}
              </div>

              {youtubeEmbedUrl ? (
                <button
                  type="button"
                  className={cn(buttonVariants({ size: "default" }), "w-full")}
                  onClick={() => {
                    const videoSection =
                      document.getElementById("video-section");
                    videoSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <PlayCircle className="size-4" />
                  Watch tutorial
                </button>
              ) : null}
            </SectionCard>

            <SectionCard
              className="border-border/80"
              contentClassName="space-y-3 p-4 sm:p-5"
            >
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background px-3 py-2">
                <span className="text-xs text-muted-foreground">
                  Estimated time
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  <Clock3 className="size-4 text-primary" />
                  {meta.duration}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background px-3 py-2">
                <span className="text-xs text-muted-foreground">
                  Skill level
                </span>
                <span className="text-sm font-medium text-foreground">
                  {meta.level}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background px-3 py-2">
                <span className="text-xs text-muted-foreground">
                  Flavor profile
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  <Sparkles className="size-4 text-primary" />
                  {meal.strCategory ?? "Signature"}
                </span>
              </div>
            </SectionCard>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

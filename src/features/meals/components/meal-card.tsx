import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Heart } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { MealSummary } from "../types";
import { getMealMeta } from "../utils";

type MealCardProps = {
  meal: MealSummary;
};

export function MealCard({ meal }: MealCardProps) {
  const meta = getMealMeta(meal.idMeal);

  return (
    <Card
      size="sm"
      className="h-full overflow-hidden border border-border/80 bg-card pt-0 shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-md"
    >
      <div className="overflow-hidden">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={400}
          height={280}
          className="h-40 w-full object-cover transition-all duration-200 ease-in-out hover:scale-[1.04]"
        />
      </div>
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-2 text-base font-semibold leading-6 tracking-[-0.02em]">
            {meal.strMeal}
          </CardTitle>
          <Heart className="mt-0.5 size-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-3.5" />
            {meta.duration}
          </span>
          <span># {meta.level}</span>
        </div>
        <div className="h-px w-full bg-border/70" />
      </CardContent>
      <CardFooter className="justify-between py-3">
        <span className="text-[11px] text-muted-foreground">
          Open detail view
        </span>
        <Link
          href={`/meals/${meal.idMeal}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all duration-200 ease-in-out hover:gap-2"
        >
          View recipe <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

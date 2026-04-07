import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Ingredient } from "../types";
import { getIngredientImageUrl } from "../utils";

type IngredientCardProps = {
  ingredient: Ingredient;
};

export function IngredientCard({ ingredient }: IngredientCardProps) {
  const description =
    ingredient.strDescription?.trim() || "Deskripsi belum tersedia.";

  return (
    <Card
      size="sm"
      className="h-full border border-border/80 bg-card pt-0 shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-md"
    >
      <div className="flex items-center justify-center rounded-t-2xl bg-muted/50 px-6 py-6">
        <Image
          src={getIngredientImageUrl(ingredient.strIngredient)}
          alt={ingredient.strIngredient}
          width={160}
          height={160}
          className="size-28 object-contain transition-all duration-200 ease-in-out group-hover/card:scale-105"
        />
      </div>
      <CardHeader className="pb-0 pt-4">
        <CardTitle className="line-clamp-1 text-base font-semibold tracking-[-0.02em]">
          {ingredient.strIngredient}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ingredient.strType ? (
          <Badge variant="outline" className="rounded-lg text-[10px]">
            {ingredient.strType}
          </Badge>
        ) : null}
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
      <CardFooter className="justify-between py-3">
        <span className="text-[11px] text-muted-foreground">View recipes</span>
        <Link
          href={`/ingredients/${encodeURIComponent(ingredient.strIngredient)}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all duration-200 ease-in-out hover:gap-2"
        >
          View Details <ArrowRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}

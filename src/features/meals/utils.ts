import type { MealDetail } from "./types";

export function getYoutubeEmbedUrl(youtubeUrl: string | null) {
  if (!youtubeUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(youtubeUrl);
    const videoId = parsedUrl.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export function getRecipeItems(meal: MealDetail) {
  const ingredients: string[] = [];

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = meal[`strIngredient${index}`]?.trim();
    const measure = meal[`strMeasure${index}`]?.trim();

    if (!ingredient) {
      continue;
    }

    ingredients.push(measure ? `${ingredient} (${measure})` : ingredient);
  }

  return ingredients;
}

export function getMealMeta(mealId: string) {
  const numericId = Number(mealId.slice(-2));
  const durations = ["25 min", "35 min", "45 min", "55 min"];
  const levels = ["Easy", "Beginner", "Medium", "Pro"];

  return {
    duration: durations[numericId % durations.length],
    level: levels[numericId % levels.length],
  };
}

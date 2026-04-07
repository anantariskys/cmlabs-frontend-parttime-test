export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strInstructions: string | null;
  strMealThumb: string;
  strYoutube: string | null;
  strCategory?: string | null;
  strArea?: string | null;
  strTags?: string | null;
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string | undefined;
};

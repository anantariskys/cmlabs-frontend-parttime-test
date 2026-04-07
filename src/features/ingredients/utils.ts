export function getIngredientImageUrl(ingredientName: string) {
  return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredientName)}.png`;
}

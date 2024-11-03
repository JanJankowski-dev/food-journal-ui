export enum Unit {
  GR= " GR",
  KG = "KR",
  L = "L",
  ML = "ML",
  PIECE = "PIECE"
}

export interface IngredientDto {
  id: number;
  quantity: number;
  unit: Unit;
  name: string;
}

export interface MealDto {
  id: number;
  description: string;
  time: string;
  name: string;
  ingredients: IngredientDto[];
}

export interface DailyPlanDto {
  id: number;
  date: string;
  meals: MealDto[];
}

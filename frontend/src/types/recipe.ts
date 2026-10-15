export type MealType = 'desayuno' | 'merienda' | 'cena';
export type FitnessGoal = 'perder_peso' | 'ganar_musculo' | 'mantener';

export interface Nutrition {
  calories: number; 
  protein: number; 
  carbs: number; 
  fat: number; 
  fiber?: number;
}



export interface Ingredient {
  item: string; 
  quantity: string; 
  unit: string; 
  calories?: number;
}



export interface MissingIngredient {
  item: string; 
  suggestion: string; 
  is_essential: boolean;
}



export interface Recipe {
  recipe_name: string; 
  description: string; 
  meal_type: MealType; 
  fitness_goal: FitnessGoal;
  prep_time_minutes: number; 
  cook_time_minutes: number; 
  difficulty: string; 
  servings: number;
  nutrition: Nutrition; 
  ingredients_used: Ingredient[]; 
  missing_ingredients?: MissingIngredient[];
  steps: string[]; 
  chef_tip?: string; 
  fitness_benefits: string[]; 
  image_prompt: string;
  image_url?: string;
}



export interface RecipeResponse { 
    success: boolean; 
    data: Recipe; 
    cached: boolean; 
}
import axios from 'axios';
import { RecipeResponse, MealType, FitnessGoal } from '../types/recipe';

const api = axios.create({ 
    baseURL: '/api/v1', 
    timeout: 60000 
});

export const recipeApi = {
  async generateRecipe(
    ingredients: string[], 
    mealType: MealType, 
    fitnessGoal: FitnessGoal, 
    restrictions?: string
  ): Promise<RecipeResponse> {
    const { data } = await api.post<RecipeResponse>('/recipes/generate', {
      ingredients, 
      meal_type: mealType, 
      fitness_goal: fitnessGoal, 
      dietary_restrictions: restrictions
    });
    return data;
  }
};
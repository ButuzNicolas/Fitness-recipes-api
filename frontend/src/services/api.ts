import axios from "axios";
import { RecipeResponse, MealType, FitnessGoal } from "../types/recipe";

const api = axios.create({
    baseURL: '/api/v1',
    timeout: 60000,
});


export const recipeApi = {
    async generateRecipe(
        ingredients: string[],
        mealType: MealType,
        fitnessGoal: FitnessGoal = 'mantener',
        dietary_restrictions: string,
        language: string = 'es'
    ): Promise<RecipeResponse> {
        const response = await api.post<RecipeResponse>('/recipe/generate', {
            ingredients,
            meal_type: mealType,
            fitness_goal: fitnessGoal,
            dietary_restrictions,
            language
        });
            return response.data;
    }
};

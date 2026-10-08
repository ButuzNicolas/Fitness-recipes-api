import {z} from 'zod';

export const MealTypeSchema = z.enum(['desayuno', 'merienda', 'cena']);
export const FitnessGoalSchema = z.enum(['perder_peso', 'ganar_musculo', 'mantener']);

export const NutritionSchema = z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
    fiber: z.number().optional()
});

export const RecipeSchema = z.object({
    recipe_name: z.string(),
    description: z.string(),
    meal_type: MealTypeSchema,
    fitness_goal: FitnessGoalSchema,
    prep_time_minutes: z.number(),
    cook_time_minutes: z.number(),
    difficulty: z.enum(['Facil', 'Medio', 'Dificil']),
    servings: z.number(),
    nutrition: NutritionSchema,
    ingredients_used: z.array(z.object({
        item: z.string(),
        quantity: z.string(),
        unit: z.string(),
        calories: z.number().optional()
    })),


    missing_ingredients: z.array(z.object({
        item: z.string(),
        suggestion: z.string(),
        is_essential: z.boolean()
    })).optional(),
    steps: z.array(z.string()).min(1),
    chef_tip: z.string().optional(),
    fitness_benefits: z.array(z.string()),
    image_prompt: z.string()
});


export const RequestSchema = z.object({
    ingredients: z.array(z.string()).min(1, "Debes proporcional al menos un ingrediente para poder ayudarte"),
    meal_type: MealTypeSchema,
    fitness_goal: FitnessGoalSchema.optional().default('mantener'),
    dietary_restrictions: z.string().optional(),
    lenguage: z.string().optional().default('es')
});



export type Recipe = z.infer<typeof RecipeSchema>;
export type RecipeRequest = z.infer<typeof RequestSchema>;
export type MealType = z.infer<typeof MealTypeSchema>;
export type FitnessGoal = z.infer<typeof FitnessGoalSchema>;
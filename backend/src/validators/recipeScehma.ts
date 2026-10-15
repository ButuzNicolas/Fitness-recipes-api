import {z} from 'zod';


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
    meal_type: z.enum(['desayuno', 'merienda', 'cena']),
    fitness_goal: z.enum(['perder_peso', 'ganar_musculo', 'mantener']),
    prep_time_minutes: z.number(),
    cook_time_minutes: z.number(),
    difficulty: z.enum(['Fácil', 'Medio', 'Difícil']),
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
    ingredients: z.array(z.string()).min(1, "Debes colocar al menos un ingrediente"),
    meal_type: z.enum(['desayuno', 'merienda', 'cena']),
    fitness_goal: z.enum(['perder_peso', 'ganar_musculo', 'mantener']).optional().default('mantener'),
    dietary_restrictions: z.string().optional(),
    language: z.string().optional().default('es')
});

export type Recipe = z.infer<typeof RecipeSchema>;



import { openai } from '../config/openai.ts';
import { RecipeSchema, Recipe, MealType, FitnessGoal } from '../validators/recipeScehma.ts';


// prompt con ayuda de la IA para utilizar - v.1.0

const SYSTEM_PROMPT = `Eres un Nutricionista Deportivo y Chef Fitness experto.
Tu tarea es crear recetas fitness basadas en los ingredientes disponibles del usuario.

REGLAS ESTRICTAS:
1. Devuelve SOLO un objeto JSON válido. No incluyas texto antes ni después.
2. Las recetas deben ser saludables y apropiadas para el objetivo fitness indicado.
3. Calcula los macros (calorías, proteínas, carbohidratos, grasas) de forma realista.
4. Prioriza ingredientes altos en proteína si el objetivo es "ganar_musculo".
5. Prioriza ingredientes bajos en calorías si el objetivo es "perder_peso".
6. Genera un "image_prompt" descriptivo en inglés para DALL-E que muestre el plato terminado de forma apetitosa.
7. Los pasos deben ser claros y prácticos.

FORMATO JSON OBLIGATORIO:
{
  "recipe_name": "string",
  "description": "string",
  "meal_type": "desayuno" | "merienda" | "cena",
  "fitness_goal": "perder_peso" | "ganar_musculo" | "mantener",
  "prep_time_minutes": number,
  "cook_time_minutes": number,
  "difficulty": "Fácil" | "Medio" | "Difícil",
  "servings": number,
  "nutrition": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
    "fiber": number
  },
  "ingredients_used": [
    { "item": "string", "quantity": "string", "unit": "string", "calories": number }
  ],
  "missing_ingredients": [
    { "item": "string", "suggestion": "string", "is_essential": boolean }
  ],
  "steps": ["string", "string"],
  "chef_tip": "string",
  "fitness_benefits": ["string", "string"],
  "image_prompt": "string en inglés descriptivo para generar imagen del plato"
}`;


export const aiService = {
    async generateRecipe(
        ingredients: string[],
        mealType: MealType,
        fitnessGoal: FitnessGoal = 'mantener',
        restrictions?: string,
        language: string = 'es'
    ): Promise<Recipe> {
        const userPrompt = `
        Ingredientes disponibles: ${ingredients.join(', ')}.
        Tipo de comida: ${mealType}.
        Objetivo fitness: ${fitnessGoal}.
        Restricciones dieteticas: ${restrictions || 'Ninguna'}.
        Idioma de salida: ${language}.
        
        Genera la receta fitnesss siguiendo estrictamente el formato JSON solicitado.
        Asegurarse de que el "image_prompt" sea descriptivo y en ingles para generar una imagen del plato.`;



        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object"},
            messages: [
                { role: "system", content: SYSTEM_PROMPT},
                { role: "user", content: userPrompt}
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });



        const responseContent = completion.choices[0].message.content;

        if (!responseContent){
            throw new Error('La IA no devolvio contenido');
        }

        const parsedJson = JSON.parse(responseContent);
        const validatedRecipe = RecipeSchema.parse(parsedJson);

        return validatedRecipe;
    }
}
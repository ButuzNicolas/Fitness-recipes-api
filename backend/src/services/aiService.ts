import { RecipeSchema } from '../validators/recipeScehma';

const SYSTEM_PROMPT = `Eres un Nutricionista Deportivo experto. 
Tu única tarea es crear recetas fitness basadas en los ingredientes disponibles.
Devuelve SOLO un objeto JSON válido. Sin texto antes ni después, sin markdown.

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
  "nutrition": { "calories": number, "protein": number, "carbs": number, "fat": number, "fiber": number },
  "ingredients_used": [{ "item": "string", "quantity": "string", "unit": "string", "calories": number }],
  "missing_ingredients": [{ "item": "string", "suggestion": "string", "is_essential": boolean }],
  "steps": ["string", "string"],
  "chef_tip": "string",
  "fitness_benefits": ["string", "string"],
  "image_prompt": "string en inglés"
}`;

export const aiService = {
  async generateRecipe(
    ingredients: string[], 
    mealType: string, 
    fitnessGoal: string, 
    restrictions?: string,
    language?: string  // ✅ Parámetro agregado
  ) {
    const userPrompt = `
      Ingredientes: ${ingredients.join(', ')}.
      Comida: ${mealType}. 
      Objetivo: ${fitnessGoal}. 
      Restricciones: ${restrictions || 'Ninguna'}.
      Idioma: ${language || 'es'}.
      Genera la receta siguiendo estrictamente el formato JSON.
    `;

    // Llamada directa a Ollama en tu máquina local
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: `${SYSTEM_PROMPT}\n\n${userPrompt}`,
        stream: false,
        format: { type: 'object' }
      })
    });

    if (!response.ok) {
      throw new Error(`Error al conectar con Ollama: ${response.statusText}`);
    }

    const data = await response.json();
    
    const cleanText = data.response.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return RecipeSchema.parse(JSON.parse(cleanText));
  }
};
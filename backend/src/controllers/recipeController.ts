import { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/aiService.js';
import { imageService } from '../services/imageService.js';
import { cacheService } from '../services/cacheService.js';
import { generateHash } from '../utils/hashGenerator.js';
import { RequestSchema, Recipe } from '../validators/recipeScehma.js';

export const generateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Validar request
    const validation = RequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: 'INVALID_REQUEST',
        message: validation.error.errors,
      });
    }

    const { ingredients, 
        meal_type, 
        fitness_goal, 
        dietary_restrictions, 
        language } =
      validation.data;

    // 2. Generar hash para caché
    const hash = generateHash(ingredients, 
        meal_type, 
        fitness_goal, 
        dietary_restrictions,
    );

    // 3. Buscar en caché
    const cachedRecipe = await cacheService.get(hash);
    if (cachedRecipe) {
      return res.status(200).json({
        success: true,
        data: cachedRecipe,
        cached: true,
      });
    }

    // 4. Llamar a la IA para generar receta
    console.log(`🤖 Generando receta ${meal_type} para: ${ingredients.join(', ')}`);
    const recipe = await aiService.generateRecipe(
      ingredients,
      meal_type,
      fitness_goal,
      dietary_restrictions,
      language
    );

    // 5. Buscar imagen real de la receta en Unsplash
    console.log(`📸 Buscando imagen para: ${recipe.recipe_name}`);
    const imageUrl = await imageService.searchRecipeImage(
      recipe.recipe_name,
      recipe.image_prompt
    );
    (recipe as any).image_url = imageUrl;

    // 6. Guardar en caché
    await cacheService.set(hash, recipe);

    // 7. Responder
    res.status(200).json({
      success: true,
      data: recipe,
      cached: false,
    });
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/aiService.ts';
import { imageService } from '../services/imageService.ts';
import { cacheService } from '../services/cacheService.ts';
import { generateHash } from '../utils/hashGenerator.ts';
import { RequestSchema } from '../validators/recipeScehma';


export const generateRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validation = RequestSchema.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({
                error: "INVALID_REQUEST",
                message: validation.error.errors
            });
        }


    const { ingredients, meal_type, fitness_goal, dietary_restrictions, lenguage } = validation.data;

    const hash = generateHash(ingredients, meal_type, fitness_goal, dietary_restrictions);

    const cachedRecipe = await cacheService.get(hash);
    if(cachedRecipe){
        return res.status(200).json({
            success: true,
            data: cachedRecipe,
            cached: true
        });
    }

                 //// se encarga de llamar a la IA para comenzar a generar la receta
    const recipe = await aiService.generateRecipe(
        ingredients,
        meal_type,
        fitness_goal,
        dietary_restrictions,
        lenguage
    );
                   //// aqui comienza la generacion de imagen
    try {
        const imageUrl = await imageService.generateImage(recipe.image_prompt);
        (recipe as any).image_url = imageUrl;
    } catch(error){
        console.warn ('no ha podido generar la imagen'); // auqnue no la genere a la imagen el programa seguira :)
        (recipe as any).image_url = null;
    }

    await cacheService.set(hash, recipe); // se encarga de guardar en la cache

    res.status(200).json({
        success: true, 
        data: recipe,
        cached: false
    });


    } catch (error){
        next(error);
    }




};
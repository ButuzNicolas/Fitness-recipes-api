import { redisClient } from '../config/rendis';
import { Recipe } from '../validators/recipeScehma';


export const cacheService = {
    async get(hash: string): Promise<Recipe | null> {
        try {
            const cached = await redisClient.get(hash);
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (error) {
            console.warn('Error leyendo cache:', error);
        }
        return null;

    },

    async set(hash: string, recipe: Recipe): Promise<void> {
        try{
            await redisClient.setEx(hash, 604800, JSON.stringify(recipe));
        } catch (error){
            console.warn('Error al guardar en cache:', error);
        }
    }
};
import { redisClient } from '../config/rendis.ts'
import { Recipe } from '../validators/recipeScehma.ts'


export const cacheService = {
    async get(hash: string): Promise<Recipe | null> {
        try {
            const cached = await redisClient.get(hash);
            if (cached) {
                console.log(`Cache hit: ${hash.substring(0, 8)}...`);
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
            console.log(`Cache guardado: ${hash.substring(0,8)}...`);
        } catch (error){
            console.warn('Error al guardar en cache:', error);
        }
    }
};
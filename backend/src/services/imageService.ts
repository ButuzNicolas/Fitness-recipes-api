import { openai } from '../config/openai.ts';
import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();

const IMAGE_PROVIDER = process.env.IMAGE_PROVIDER || 'dalle';


export const imageService = {
    async generateImage(prompt: string): Promise<string> {
        if (IMAGE_PROVIDER === 'dalle'){
            return await this.generateWithDalle(prompt);
        }else {
            return await this.searchWithUnsplash(prompt);
        }
    },

    async generateWithDalle(prompt: string): Promise<string>{
        try {
            const enhancedPrompt = `${prompt}, professional food photography, appetizing, well-lit, high quality, 4k`;

            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: enhancedPrompt,
                n: 1,
                size: "1024x1024",
                quality: "standard"
        });

            const imageUrl = response.data[0]?.url;
            
            if(!imageUrl){
                throw new Error('No se ha podido generar la imaggen');
            }
            console.log('Imagen generada con DALL-E 3');
            return imageUrl;

        } catch (error){
            console.error('Se ha generado un error al intentanr generar la imagen con DALL-E', error);
            throw new Error('Se genero un error al generar la imagen de la receta');

        }
    },

    async searchWithUnsplash(query: string): Promise<string> {
        try {
            const accessKey = process.env.UNSPLASH_ACCESS_KEY;

            if (!accessKey) {
                throw new Error('UNSPLASH_ACCESS_KEY no ha sido condigurada');

            }

            // extraccion de palabras claves del prompt

            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: keywords + 'food',
                    per_page: 1,
                    orientation: 'squarish'
                },
                headers: {
                    Authorization: `Client-ID ${accessKey}`
                }
            });


            const imageUrl = response.data.results[0]?.urls?.regular;

            if(!imageUrl) {
                throw new Error('no se encontro la imagen en Unsplash');

            }

            console.log('Imagen extraida de Unsplash');
            return imageUrl;
        } catch (error) {
            console.error('ha ahbido un error buscando la imagen en Unsplash', error);
            throw new Error('error imagen receta');
        }

    }
};
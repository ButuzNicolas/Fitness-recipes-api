import axios from 'axios';

export const imageService = {
  /**
   * Busca una imagen real de la receta en Unsplash
   * Usa el nombre de la receta + "food" para encontrar imágenes profesionales
   */
  async searchRecipeImage(recipeName: string, imagePrompt?: string): Promise<string | null> {
    try {
      const accessKey = process.env.UNSPLASH_ACCESS_KEY;
      
      if (!accessKey) {
        console.warn('⚠️ UNSPLASH_ACCESS_KEY no configurada, usando imagen por defecto');
        return this.getDefaultImage(recipeName);
      }

      // Extraer palabras clave del nombre de la receta
      const keywords = recipeName
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Eliminar caracteres especiales
        .split(' ')
        .filter(word => word.length > 3) // Solo palabras de más de 3 letras
        .slice(0, 3) // Máximo 3 palabras clave
        .join('+');

      // Buscar en Unsplash
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: `${keywords}+food+fitness+healthy`,
          per_page: 1,
          orientation: 'squarish',
          order_by: 'relevant'
        },
        headers: {
          Authorization: `Client-ID ${accessKey}`
        },
        timeout: 5000 // Timeout de 5 segundos
      });

      const imageUrl = response.data.results[0]?.urls?.regular;
      
      if (imageUrl) {
        console.log('📸 Imagen encontrada en Unsplash:', recipeName);
        return imageUrl;
      }

      // Si no encontró, usar imagen por defecto
      console.log('⚠️ No se encontró imagen, usando por defecto');
      return this.getDefaultImage(recipeName);

    } catch (error) {
      console.error('❌ Error buscando imagen en Unsplash:', error);
      return this.getDefaultImage(recipeName);
    }
  },

  /**
   * Imagen por defecto usando Unsplash Source (sin API key)
   * Busca imágenes genéricas de comida fitness
   */
  getDefaultImage(recipeName: string): string {
    const keywords = encodeURIComponent(recipeName.split(' ').slice(0, 2).join(' '));
    return `https://source.unsplash.com/1024x1024/?${keywords},food,fitness,healthy`;
  }
};
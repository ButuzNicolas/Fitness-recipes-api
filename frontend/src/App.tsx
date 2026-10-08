import { useState } from 'react';
import { recipeApi } from './services/api';
import { Recipe, MealType, FitnessGoal } from './types/recipe';


function App() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ error, setError ] = useState<string | null>(null);
    const [cached, setCached ] = useState(false);



    const handleGenerateRecipe = async (
        ingredients: string[],
        mealType: MealType,
        fitnessGoal: FitnessGoal,
        restrictions?: string
    ) => {
        setIsLoading(true);
        setError(null);
        setRecipe(null);


        try {
            const response = await recipeApi.generateRecipe(
                ingredients,
                mealType,
                fitnessGoal,
                restrictions,
                'es'
            );
            setRecipe(response.data);
            setCached(response.cached);
        } catch (err: any) {
            setError(
                err.response?.data?.message || 'ha habido un error al generar la receta, vuelva a intertar'
            );
        } finally{
            setIsLoading(false);
        }
    };







}
import { useState } from 'react';
import { IngredientInput } from './components/IngredientInput';
import { RecipeDisplay } from './components/RecipeDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { recipeApi } from './services/api';
import { Recipe, MealType, FitnessGoal } from './types/recipe';
import './css/style.css'

function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cached, setCached] = useState(false);

  const handleGenerate = async (
    ingredients: string[], 
    mealType: MealType, 
    fitnessGoal: FitnessGoal, 
    restrictions?: string) => {
    setIsLoading(true); setError(null); setRecipe(null);
    try {
      const res = await recipeApi.generateRecipe(ingredients, mealType, fitnessGoal, restrictions);
      setRecipe(res.data); setCached(res.cached);
    } catch (err: any) { setError(err.response?.data?.error || 'se ha generado un error al generar'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="app">
      <header><h1>Fitness Recetas</h1><p>Recetas fitness con IA</p></header>
      <main>
        <IngredientInput onSubmit={handleGenerate} isLoading={isLoading} />
        {error && <div className="error-message">{error}</div>}
        {isLoading && <LoadingSpinner />}
        {recipe && <RecipeDisplay recipe={recipe} cached={cached} />}
      </main>
    </div>
  );
}
export default App;
import { Recipe } from '../types/recipe';
import { NutritionCard } from '../components/NutritionCard';


export const RecipeDisplay = ({ recipe, cached }: { recipe: Recipe; cached: boolean }) => (
  <div className="recipe-display">
    {cached && <div className="cache-badge"> En cache.. </div>}
    {recipe.image_url && <div className="recipe-image-container"><img src={recipe.image_url} alt={recipe.recipe_name} className="recipe-image" loading="lazy" /></div>}



    <h2>{recipe.recipe_name}</h2>
    <p className="description">{recipe.description}</p>


    <div className="recipe-meta">
      <div className="meta-item"><span>⏱️</span><div><strong>Preparacion:</strong><p>{recipe.prep_time_minutes} min</p></div></div>
      <div className="meta-item"><span>🔥</span><div><strong>Coccion:</strong><p>{recipe.cook_time_minutes} min</p></div></div>
      <div className="meta-item"><span>📊</span><div><strong>Dificultad:</strong><p>{recipe.difficulty}</p></div></div>
    </div>


    <NutritionCard nutrition={recipe.nutrition}/>


    <h3>Ingredientes</h3>
    <ul>{recipe.ingredients_used.map((ing, i) => <li key={i}><strong>{ing.quantity} {ing.unit}</strong> de {ing.item}</li>)}</ul>


    <h3>Pasos a seguir:</h3>
    <ol>{recipe.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>


        {recipe.chef_tip && <div className="tip-section"><h3>Consejos a base de chefcito 🐭</h3><p>{recipe.chef_tip}</p></div>}
  </div>
);
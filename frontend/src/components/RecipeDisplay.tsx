import { Recipe } from '../types/recipe';
import { NutritionCard } from '../components/NutritionCard';


interface Props {
    recipe: Recipe;
    cached: boolean;
}


export const RecipeDisplay = ({ recipe, cached}: Props) => {
    const getMealTypeEmoji = (type: string) => {
        switch (type) {
            case 'desayuno': return '🌅';
            case 'merienda': return '🕡';
            case 'cena': return '🌙';
            default: return '🍽️';
        }
    }




    const getFitnessGoalEmoji = (goal: string) => {
        switch (goal) {
            case 'perder_peso': return '🔥';
            case 'ganar_musculo': return '💪';
            case 'mantener': return '⚖️';
            default: return '🎯';
            
        }
    };


    return (
    <div className="recipe-display">
      {cached && <div className="cache-badge">Resultado en la cache</div>}
      
      {recipe.image_url && (
        <div className="recipe-image-container">
          <img src={recipe.image_url} alt={recipe.recipe_name} className="recipe-image" />
        </div>
      )}

      <div className="recipe-header">
        <h2>{recipe.recipe_name}</h2>
        <div className="recipe-tags">
          <span className="tag meal-type">
            {getMealTypeEmoji(recipe.meal_type)} {recipe.meal_type}
          </span>
          <span className="tag fitness-goal">
            {getFitnessGoalEmoji(recipe.fitness_goal)} {recipe.fitness_goal.replace('_', ' ')}
          </span>
        </div>
      </div>

      <p className="description">{recipe.description}</p>

      <div className="recipe-meta">
        <div className="meta-item">
          <span className="icon">⏱️</span>
          <div>
            <strong>Preparación</strong>
            <p>{recipe.prep_time_minutes} min</p>
          </div>
        </div>
        <div className="meta-item">
          <span className="icon">🔥</span>
          <div>
            <strong>Tiempo de cocción</strong>
            <p>{recipe.cook_time_minutes} min</p>
          </div>
        </div>
        <div className="meta-item">
          <span className="icon">📊</span>
          <div>
            <strong>Nivel de dificultad</strong>
            <p>{recipe.difficulty}</p>
          </div>
        </div>
        <div className="meta-item">
          <span className="icon">🍽️</span>
          <div>
            <strong>CAntidad de porciones</strong>
            <p>{recipe.servings}</p>
          </div>
        </div>
      </div>

      <NutritionCard nutrition={recipe.nutrition} />


      <div className="ingredients-section">
        <h3>Ingredientes:</h3>
        <ul>
          {recipe.ingredients_used.map((ing, index) => (
            <li key={index}>
              <strong>{ing.quantity} {ing.unit}</strong> de {ing.item}
              {ing.calories && <span className="calories">({ing.calories} cal)</span>}
            </li>
          ))}
        </ul>
      </div>

      {recipe.missing_ingredients && recipe.missing_ingredients.length > 0 && (
        <div className="missing-section">
          <h3>Ingredientes opcionales:</h3>
          <ul>
            {recipe.missing_ingredients.map((ing, index) => (
              <li key={index}>
                <strong>{ing.item}</strong>: {ing.suggestion}
                {ing.is_essential && <span className="essential-badge">Esencial</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="steps-section">
        <h3>Pasos a seguir:</h3>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {recipe.fitness_benefits.length > 0 && (
        <div className="benefits-section">
          <h3>Beneficios Fitness:</h3>
          <ul>
            {recipe.fitness_benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}


      {recipe.chef_tip && (
        <div className="tip-section">
          <h3>Consejo del apartado Chef</h3>
          <p>{recipe.chef_tip}</p>
        </div>
      )}
    </div>



);
};






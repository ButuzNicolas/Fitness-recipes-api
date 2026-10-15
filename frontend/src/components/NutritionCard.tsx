import { Nutrition } from '../types/recipe';
export const NutritionCard = ({ nutrition }: { nutrition: Nutrition }) => (
  <div className="nutrition-card">
    <h3> Información Nutricional</h3>
    <div className="nutrition-grid">
      <div className="nutrition-item">
        <span className="nutrition-value">{nutrition.calories}</span>
        <span className="nutrition-label">Calorias</span>
        </div>

      <div className="nutrition-item">
        <span className="nutrition-value">{nutrition.protein}g</span>
        <span className="nutrition-label">Proteinas</span>
        </div>

      <div className="nutrition-item">
        <span className="nutrition-value">{nutrition.carbs}g</span>
        <span className="nutrition-label">Carbohidratos</span>
        </div>

      <div className="nutrition-item">
        <span className="nutrition-value">{nutrition.fat}g</span>
        <span className="nutrition-label">Grasas</span>
        </div>
    </div>
  </div>
);
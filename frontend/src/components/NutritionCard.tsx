import { Nutrition } from '../types/recipe'

interface Props{
    nutrition : Nutrition;
}

export const NutritionCard = ({ nutrition }: Props) =>{
    return (
        <div className="nutrition-card">
            <h3>Informacion nutricional</h3>
            <div className="nutrition-grid">
                <div className="nutrition-item calories">
                    <span className = "nutrition-value">{nutrition.calories}</span>
                    <span className = "nutrition-label">Calorias</span>
                </div>



                <div className="nutrition-item protein">
                    <span className= "nutrition-value">{nutrition.protein}g</span>
                    <span className="nutrition-label">Proteinas</span>
                </div>

                <div className= "nutrition-item carbs">
                    <span className=" nutrition-value">{nutrition.carbs}g</span>
                    <span className="nutrition-label">Carbohidratos</span>
                </div>

                <div className="nutrition-item fat">
                    <span className=" nutrition-value">{nutrition.fat}g</span>
                    <span className ="nutrition-label">Grasas</span>
                </div>

                {nutrition.fiber && (
                    <div className = "nutrition-item fiber">
                        <span className="nutrition-value">{nutrition.fiber}g</span>
                        <span className="nutrition-label">Fibra</span>
                    </div>
                )}
            </div>
        </div>
    );
};
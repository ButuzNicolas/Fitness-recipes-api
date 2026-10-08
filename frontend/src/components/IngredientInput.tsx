import { useState } from "react";
import { MealType, FitnessGoal } from "../types/recipe";

interface Props {
    onSubmit: (
        ingredients: string[],
        mealType: MealType,
        fitnessGoal: FitnessGoal,
        restrictions: string

    ) => void;
    isLoading: boolean;
}



export const IngredientInput = ({ onSubmit, isLoading }: Props) => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [mealType, setMealType] = useState<MealType>('desayuno');
    const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>('mantener');
    const [restrictions, setRestrictions] = useState('');



    const addIngredient = () => {
        if (currentIngredient.trim()) {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient('');
        }
    };



    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (ingredients.length > 0) {
            onSubmit(ingredients, mealType, fitnessGoal, restrictions || undefined);
        }
    };




    const handleKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            addIngredient();
        }
    };



    return (
        <form onSubmit={handleSubmit} className="ingredient-form">
            <div className="form-section">
                <label>Tipo de comida</label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type = "radio"
                            value = "desayuno"
                            checked = {mealType === 'desayuno'}
                            onChange = {(e) => setMealType(e.target.value as MealType)}
                            disabled = {isLoading}
                        />
                        Desayuno
                    </label>
                    <label className="radio-label">
                        <input
                            type = "radio"
                            value = "merienda"
                            checked = {mealType === 'merienda'}
                            onChange = {(e) => setMealType(e.target.value as MealType)}
                            disabled = {isLoading}
                            />
                            Merienda
                    </label>
                    <label className="radio-label">
                            <input
                                type = "radio"
                                value = "cena"
                                checked = {mealType === 'cena'}
                                onChange =  {(e) => setMealType(e.target.value as MealType)}
                                disabled= {isLoading}
                                />
                                Cena
                
                    </label>
                </div>
            </div>

            <div className="form-section">
                <label>Objetivo Fitness</label>
                    <div className="radio-group">
                        <label className="radio-lavel">
                            <input
                            type="radio"
                            value="perder_peso"
                            checked={(e) => setFitnessGoal(e.target.value as FitnessGoal)}
                            disabled= {isLoading}
                            />
                            Perder Peso
                        </label>
                        <label className="radio-label">
                            <input
                            type = "radio"
                            value=" ganar_musculo"
                            checked={fitnessGoal === 'ganar_musculo'}
                            onChange={(e) => setFitnessGoal(e.target.value as FitnessGoal)}
                            disabled = {isLoading}
                            />
                            Ganar Musculo
                        </label>
                        <label className="radio-label">
                            <input
                            type="radio"
                            value="mantener"
                            checked={fitnessGoal === 'mantener'}
                            onChange={(e) => setFitnessGoal(e.target.value as FitnessGoal)}
                            disabled = {isLoading}
                            />
                            Mantener
                        </label>
                </div>
            </div>


            <div className="form-section">
                <label>Ingredientes disponibles</label>
                <div className="input-group">
                    <input type="text" value="{currentIngredient}" onChange={(e)=> setCurrentIngredient(e.target.value)} onKeyPress = {handleKeyPress} placeholder="Ejemplo: pollo, arroz, palta..." disabled = {isLoading} />
                    <button type="button" onClick={addIngredient} disabled={isLoading}>
                        + Agregar
                    </button>
                </div>

                {ingredients.length > 0 && (
                <div className="ingredients-list">
                    {ingredients.map((ing, index) => (
                    <span key={index} className="ingredient-tag">
                                {ing}
                                <button type="button" onClick={() => removeIngredient(index)}>
                                    x
                                </button>
                            </span> ))}
                </div>
                )}
            </div>



            <div className="form-section">
                <label>Restricciones (opcional)</label>
                <input value="text" onChange={ (e)=> setRestrictions(e.target.value)} placeholder= "Ejemplo: vegetariano, sin gluten, deslactozado..." disabled = {isLoading} />

            </div>


            <button type="submit" disabled={ ingredients.length===0 || isLoading} className="submit-btn">
            {isLoading ? 'Se esta generando la receta...' : "Generar receta"}

            </button>
        </form>

    );

    
};
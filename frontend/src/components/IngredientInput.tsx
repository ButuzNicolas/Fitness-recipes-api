import { useState } from 'react';
import { MealType, FitnessGoal } from '../types/recipe';

interface Props { onSubmit: (
    ing: string[], 
    meal: MealType, 
    goal: FitnessGoal, 
    res?: string
) => void; 
isLoading: boolean; 
}

export const IngredientInput = ({ onSubmit, isLoading }: Props) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [mealType, setMealType] = useState<MealType>('desayuno');
  const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>('mantener');
  const [restrictions, setRestrictions] = useState('');

  const add = () => { if (current.trim()) { setIngredients([...ingredients, current.trim()]); setCurrent(''); } };

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (ingredients.length) onSubmit(ingredients, mealType, fitnessGoal, restrictions || undefined); }} className="ingredient-form">
      <div className="form-section">
        <label>Tipo de comida</label>
        <div className="radio-group">
          {(['desayuno', 'merienda', 'cena'] as MealType[]).map(m => (
            <label key={m} className="radio-label">
              <input type="radio" value={m} checked={mealType === m} onChange={e => setMealType(e.target.value as MealType)} disabled={isLoading} />
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div className="form-section">
        <label>Objetivo</label>
        <div className="radio-group">
          {(['perder_peso', 'ganar_musculo', 'mantener'] as FitnessGoal[]).map(g => (
            <label key={g} className="radio-label">
              <input type="radio" value={g} checked={fitnessGoal === g} onChange={e => setFitnessGoal(e.target.value as FitnessGoal)} disabled={isLoading} />
              {g.replace('_', ' ')}
            </label>
          ))}
        </div>
      </div>
      <div className="form-section">
        <label>Ingredientes</label>
        <div className="input-group">
          <input type="text" value={current} onChange={e => setCurrent(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())} placeholder="Ejemplo: pollo, arroz, aguacate..." disabled={isLoading} />
          <button type="button" onClick={add} disabled={isLoading}>+</button>
        </div>
        <div className="ingredients-list">
          {ingredients.map((ing, i) => (
            <span key={i} className="ingredient-tag">{ing} <button type="button" onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== i))}>x</button></span>
          ))}
        </div>
      </div>
      <div className="form-section">
        <label>Restricciones (opcional)</label>
        <input type="text" value={restrictions} onChange={e => setRestrictions(e.target.value)} placeholder="Ejemplo: sin gluten, deslactozado, etc..." disabled={isLoading} />
      </div>
      <button type="submit" disabled={ingredients.length === 0 || isLoading} className="submit-btn">
        {isLoading ? 'Generando...' : 'Generar Receta'}
      </button>
    </form>
  );
};
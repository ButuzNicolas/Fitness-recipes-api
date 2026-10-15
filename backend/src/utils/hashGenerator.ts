import crypto from 'crypto';

export const generateHash = (
    ingredients: string[],
    mealType: string,
    fitnessGoal?: string,
    restrictions?: string
): string => {
  const sorted = [...ingredients].sort().join(',');
  const key = `${sorted}|${mealType}|${fitnessGoal || 'mantener'}|${restrictions || 'none'}`;
  return crypto.createHash('sha256').update(key).digest('hex');
};

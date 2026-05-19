import type { DailyLog, FoodPreference, UserGoals } from '../types';

const foodNames = (foods: FoodPreference[], category: FoodPreference['category']) =>
  foods.filter((food) => food.category === category || food.category === 'meal').slice(0, 4).map((food) => food.name);

export const generateCoachMessage = (log: DailyLog, goals: UserGoals, foods: FoodPreference[]) => {
  const proteinGap = goals.proteinTarget - log.protein;
  const caloriesOver = log.calories - goals.dailyCalorieTarget;
  const proteinIdeas = foodNames(foods, 'protein');

  if (log.workoutDurationMinutes > 0 && log.protein >= goals.proteinTarget && log.calories <= goals.dailyCalorieTarget) {
    return 'Big green-light day: movement logged, protein handled, calories in range. Cash in the win and keep dinner boring in the best way.';
  }

  if (proteinGap > 25) {
    return `Protein is the easiest lever today. A simple plate with ${proteinIdeas.slice(0, 2).join(' and ')} could close the gap without turning dinner into homework.`;
  }

  if (log.sleepHours < goals.sleepTargetHours - 1) {
    return 'Sleep is running low, so keep tomorrow flexible. A walk, mobility, or lighter strength session still counts and protects momentum.';
  }

  if (caloriesOver > 150 && log.protein >= goals.proteinTarget * 0.9) {
    return 'Calories are a bit high, but protein quality is solid. No drama: tighten one snack or sauce tomorrow and keep the main meals steady.';
  }

  if (log.workoutDurationMinutes === 0 && log.cardioDistanceMiles < goals.walkingTargetMiles) {
    return 'Today needs one tiny movement win. Ten focused minutes after a meal is enough to keep the streak alive.';
  }

  return 'You are building the boring magic: logged data, useful signal, next small move. Stay kind, stay consistent.';
};

export const styleCoachMessage = (message: string, style: UserGoals['coachingStyle']) => {
  switch (style) {
    case 'Straightforward':
      return message.replace('Big green-light day: ', '').replace('No drama: ', '');
    case 'Science-based':
      return `${message} Focus on repeatable inputs: protein, energy balance, sleep, and low-friction activity.`;
    case 'Funny gym bro':
      return `${message} Respectfully, your future self is already flexing.`;
    case 'Doctor mode':
      return `${message} Wellness note: this is lifestyle coaching, not medical guidance.`;
    default:
      return message;
  }
};

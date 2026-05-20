import type { Achievement, DailyLog, FoodPreference, Quest, UserGoals, UserProfile, WellnessState } from '../types';

export const todayKey = () => new Date().toISOString().slice(0, 10);

export const coachingStyles = ['Supportive', 'Straightforward', 'Science-based', 'Funny gym bro', 'Doctor mode'] as const;

export const suggestedFoods: FoodPreference[] = [
  { id: 'rotisserie-chicken', name: 'rotisserie chicken', category: 'protein', notes: 'Simple protein anchor.' },
  { id: 'eggs', name: 'eggs', category: 'protein' },
  { id: 'rice', name: 'rice', category: 'carb' },
  { id: 'pasta', name: 'pasta', category: 'carb' },
  { id: 'corn-tortillas', name: 'corn tortillas', category: 'carb' },
  { id: 'sourdough-bread', name: 'sourdough bread', category: 'carb' },
  { id: 'avocado-toast', name: 'avocado toast', category: 'meal' },
  { id: 'spinach', name: 'spinach', category: 'vegetable' },
  { id: 'arugula', name: 'arugula', category: 'vegetable' },
  { id: 'lettuce', name: 'lettuce', category: 'vegetable' },
  { id: 'tomatoes', name: 'tomatoes', category: 'vegetable' },
  { id: 'monterey-jack', name: 'Monterey Jack cheese', category: 'fat' },
  { id: 'light-mayo', name: 'light mayo', category: 'condiment' },
  { id: 'mustard', name: 'mustard', category: 'condiment' },
  { id: 'pork-chops', name: 'pork chops', category: 'protein' },
  { id: 'bagels', name: 'bagels', category: 'carb' },
  { id: 'beef', name: 'beef', category: 'protein' },
  { id: 'mexican-style-meals', name: 'Mexican-style meals', category: 'meal' },
];

export const achievementTemplates: Achievement[] = [
  { id: 'first-workout', title: 'First workout logged', description: 'Log your first movement session.', unlocked: false },
  { id: 'seven-day-streak', title: '7-day streak', description: 'Log activity seven days in a row.', unlocked: false },
  { id: 'protein-goal', title: 'Protein goal hit', description: 'Reach your daily protein target.', unlocked: false },
  { id: 'three-workouts', title: '3 workouts in one week', description: 'Complete three workouts in a week.', unlocked: false },
  { id: 'sleep-goal', title: 'Sleep goal hit', description: 'Meet your sleep target for a day.', unlocked: false },
  { id: 'calorie-goal', title: 'Calorie goal hit', description: 'Stay within your calorie target.', unlocked: false },
  { id: 'ten-miles', title: 'Walked 10 total miles', description: 'Log ten miles of walking or cardio.', unlocked: false },
  { id: 'meals-seven-days', title: 'Logged meals for 7 days', description: 'Track meals for seven days.', unlocked: false },
];

export const buildEmptyDailyLog = (date = todayKey()): DailyLog => ({
  date,
  weight: 0,
  meals: [],
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  waterOz: 0,
  workoutType: '',
  workoutDurationMinutes: 0,
  cardioDistanceMiles: 0,
  steps: 0,
  sleepHours: 0,
  sleepQuality: 'Okay',
  moodEnergy: 'Steady',
  notes: '',
});

export const createInitialState = (profile: UserProfile, goals: UserGoals): WellnessState => ({
  profile,
  goals,
  foods: [],
  logs: [],
  achievements: achievementTemplates,
  xp: 0,
});

export const buildQuests = (state: WellnessState): Quest[] => {
  const today = state.logs.find((log) => log.date === todayKey());
  const weeklyWorkouts = state.logs.filter((log) => log.workoutDurationMinutes > 0).length;
  const weeklyMiles = state.logs.reduce((sum, log) => sum + log.cardioDistanceMiles, 0);

  return [
    {
      id: 'daily-protein',
      title: 'Protein power',
      description: 'Reach your protein target today.',
      progress: Math.min(today?.protein ?? 0, state.goals.proteinTarget),
      target: state.goals.proteinTarget,
      xp: 35,
      cadence: 'daily',
    },
    {
      id: 'daily-walk',
      title: 'Move the meter',
      description: 'Hit your walking or cardio target.',
      progress: Math.min(today?.cardioDistanceMiles ?? 0, state.goals.walkingTargetMiles),
      target: state.goals.walkingTargetMiles,
      xp: 25,
      cadence: 'daily',
    },
    {
      id: 'weekly-workouts',
      title: 'Training rhythm',
      description: 'Complete your weekly workout target.',
      progress: Math.min(weeklyWorkouts, state.goals.workoutTargetPerWeek),
      target: state.goals.workoutTargetPerWeek,
      xp: 100,
      cadence: 'weekly',
    },
    {
      id: 'weekly-cardio',
      title: 'Miles banked',
      description: 'Stack ten miles this week.',
      progress: Math.min(weeklyMiles, 10),
      target: 10,
      xp: 90,
      cadence: 'weekly',
    },
  ];
};

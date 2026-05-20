export type CoachingStyle =
  | 'Supportive'
  | 'Straightforward'
  | 'Science-based'
  | 'Funny gym bro'
  | 'Doctor mode';

export type SleepQuality = 'Poor' | 'Okay' | 'Good' | 'Great';
export type MoodEnergy = 'Low' | 'Steady' | 'Good' | 'High';

export interface UserProfile {
  nickname: string;
  onboardedAt: string;
}

export interface UserGoals {
  startingWeight: number;
  goalWeight: number;
  dailyCalorieTarget: number;
  proteinTarget: number;
  workoutTargetPerWeek: number;
  walkingTargetMiles: number;
  sleepTargetHours: number;
  coachingStyle: CoachingStyle;
  startDate: string;
}

export interface FoodPreference {
  id: string;
  name: string;
  category: 'protein' | 'carb' | 'fat' | 'vegetable' | 'meal' | 'condiment';
  notes?: string;
}

export interface MealLog {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface DailyLog {
  date: string;
  weight: number;
  meals: MealLog[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  waterOz: number;
  workoutType: string;
  workoutDurationMinutes: number;
  cardioDistanceMiles: number;
  steps: number;
  sleepHours: number;
  sleepQuality: SleepQuality;
  moodEnergy: MoodEnergy;
  notes: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  xp: number;
  cadence: 'daily' | 'weekly';
}

export interface WellnessState {
  profile: UserProfile;
  goals: UserGoals;
  foods: FoodPreference[];
  logs: DailyLog[];
  achievements: Achievement[];
  xp: number;
}

export type StoredWellnessState = WellnessState | null;

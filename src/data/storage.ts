import { initialState } from './seedData';
import type { DailyLog, FoodPreference, UserGoals, WellnessState } from '../types';

const STORAGE_KEY = 'momentum-coach-state-v1';

const sortLogs = (logs: DailyLog[]) => [...logs].sort((a, b) => a.date.localeCompare(b.date));

export const loadState = (): WellnessState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as WellnessState;
    return { ...initialState, ...parsed, logs: sortLogs(parsed.logs ?? initialState.logs) };
  } catch {
    return initialState;
  }
};

export const saveState = (state: WellnessState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, logs: sortLogs(state.logs) }));
};

export const resetState = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const upsertLog = (state: WellnessState, log: DailyLog): WellnessState => {
  const nextLogs = sortLogs([...state.logs.filter((entry) => entry.date !== log.date), log]);
  return { ...state, logs: nextLogs };
};

export const updateGoals = (state: WellnessState, goals: UserGoals): WellnessState => ({
  ...state,
  goals,
});

export const addFoodPreference = (state: WellnessState, food: FoodPreference): WellnessState => ({
  ...state,
  foods: [...state.foods, food],
});

// Future backend adapter boundary:
// Replace these localStorage helpers with repository methods that call Supabase,
// Firebase, or a server API while keeping the WellnessState shape stable.

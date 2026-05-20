import type { DailyLog, FoodPreference, StoredWellnessState, UserGoals, WellnessState } from '../types';

const STORAGE_KEY = 'momentum-state-v2';
const LEGACY_STORAGE_KEY = 'momentum-coach-state-v1';

const sortLogs = (logs: DailyLog[]) => [...logs].sort((a, b) => a.date.localeCompare(b.date));

export const loadState = (): StoredWellnessState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WellnessState;
    return {
      ...parsed,
      profile: {
        nickname: parsed.profile?.nickname ?? 'friend',
        age: parsed.profile?.age,
        mainGoals: parsed.profile?.mainGoals?.length ? parsed.profile.mainGoals : ['Just exploring'],
        onboardedAt: parsed.profile?.onboardedAt ?? new Date().toISOString(),
      },
      logs: sortLogs(parsed.logs ?? []),
      foods: parsed.foods ?? [],
    };
  } catch {
    return null;
  }
};

export const saveState = (state: StoredWellnessState) => {
  if (!state) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, logs: sortLogs(state.logs) }));
};

export const resetState = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
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
  foods: state.foods.some((entry) => entry.id === food.id) ? state.foods : [...state.foods, food],
});

// Future backend adapter boundary:
// Replace these localStorage helpers with repository methods that call Supabase,
// Firebase, or a server API while keeping the WellnessState shape stable.

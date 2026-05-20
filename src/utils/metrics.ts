import type { DailyLog, UserGoals, WellnessState } from '../types';

export const getLatestLog = (logs: DailyLog[]) => logs[logs.length - 1];

export const getJourneyDay = (startDate: string) => {
  const start = new Date(`${startDate}T00:00:00`);
  const today = new Date();
  const diff = today.getTime() - start.getTime();
  return Math.max(1, Math.floor(diff / 86_400_000) + 1);
};

export const calculateStreak = (logs: DailyLog[]) => {
  const loggedDates = new Set(logs.map((log) => log.date));
  const cursor = new Date();
  let streak = 0;

  while (loggedDates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

export const calculateDailyScore = (log: DailyLog, goals: UserGoals) => {
  const calorieScore = log.calories <= goals.dailyCalorieTarget ? 25 : Math.max(0, 25 - (log.calories - goals.dailyCalorieTarget) / 40);
  const proteinScore = goals.proteinTarget > 0 ? Math.min(25, (log.protein / goals.proteinTarget) * 25) : 0;
  const workoutScore = log.workoutDurationMinutes > 0 ? 15 : 0;
  const walkingScore = goals.walkingTargetMiles > 0 ? Math.min(15, (log.cardioDistanceMiles / goals.walkingTargetMiles) * 15) : 0;
  const sleepScore = goals.sleepTargetHours > 0 ? Math.min(20, (log.sleepHours / goals.sleepTargetHours) * 20) : 0;

  return Math.round(Math.min(100, calorieScore + proteinScore + workoutScore + walkingScore + sleepScore));
};

export const getLevel = (xp: number) => {
  const level = Math.floor(xp / 500) + 1;
  const progress = xp % 500;
  return { level, progress, nextLevelXp: 500 };
};

export const getWeightDelta = (state: WellnessState) => {
  const current = getLatestLog(state.logs)?.weight ?? state.goals.startingWeight;
  return Number((state.goals.startingWeight - current).toFixed(1));
};

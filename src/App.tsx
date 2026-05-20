import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { buildEmptyDailyLog, todayKey } from './data/seedData';
import { Dashboard } from './screens/Dashboard';
import { DailyLogScreen } from './screens/DailyLogScreen';
import { FoodPreferencesScreen } from './screens/FoodPreferencesScreen';
import { GoalsScreen } from './screens/GoalsScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { useWellnessState } from './hooks/useWellnessState';

export type Screen = 'dashboard' | 'log' | 'foods' | 'goals' | 'progress' | 'rewards';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const { state, setState, quests, completeOnboarding, resetAppData } = useWellnessState();

  if (!state) {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  const activeLog = state.logs.find((log) => log.date === todayKey()) ?? buildEmptyDailyLog();

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-ink dark:bg-[#101715] dark:text-white">
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-5 sm:px-6">
        {screen === 'dashboard' && <Dashboard state={state} quests={quests} onNavigate={setScreen} />}
        {screen === 'log' && <DailyLogScreen state={state} setState={setState} activeLog={activeLog} />}
        {screen === 'foods' && <FoodPreferencesScreen state={state} setState={setState} />}
        {screen === 'goals' && <GoalsScreen state={state} setState={setState} onReset={resetAppData} />}
        {screen === 'progress' && <ProgressScreen state={state} />}
        {screen === 'rewards' && <RewardsScreen state={state} quests={quests} />}
      </main>
      <BottomNav active={screen} onChange={setScreen} />
    </div>
  );
}

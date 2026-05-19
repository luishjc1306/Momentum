import { useMemo, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './screens/Dashboard';
import { DailyLogScreen } from './screens/DailyLogScreen';
import { FoodPreferencesScreen } from './screens/FoodPreferencesScreen';
import { GoalsScreen } from './screens/GoalsScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { useWellnessState } from './hooks/useWellnessState';
import { getLatestLog } from './utils/metrics';

export type Screen = 'dashboard' | 'log' | 'foods' | 'goals' | 'progress' | 'rewards';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const { state, setState, quests } = useWellnessState();
  const latestLog = useMemo(() => getLatestLog(state.logs), [state.logs]);

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-ink">
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-5 sm:px-6">
        {screen === 'dashboard' && <Dashboard state={state} quests={quests} onNavigate={setScreen} />}
        {screen === 'log' && <DailyLogScreen state={state} setState={setState} activeLog={latestLog} />}
        {screen === 'foods' && <FoodPreferencesScreen state={state} setState={setState} />}
        {screen === 'goals' && <GoalsScreen state={state} setState={setState} />}
        {screen === 'progress' && <ProgressScreen state={state} />}
        {screen === 'rewards' && <RewardsScreen state={state} quests={quests} />}
      </main>
      <BottomNav active={screen} onChange={setScreen} />
    </div>
  );
}

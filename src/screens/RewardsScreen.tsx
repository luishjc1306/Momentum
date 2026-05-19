import { CheckCircle2, Circle, Flame, Trophy } from 'lucide-react';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import type { Quest, WellnessState } from '../types';
import { getLevel } from '../utils/metrics';

interface RewardsScreenProps {
  state: WellnessState;
  quests: Quest[];
}

export function RewardsScreen({ state, quests }: RewardsScreenProps) {
  const level = getLevel(state.xp);

  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm font-bold uppercase tracking-wide text-lagoon">Gamification</p>
        <h1 className="text-3xl font-black">Rewards board</h1>
        <p className="mt-1 text-sm text-stone-600">Achievements are built around consistency, not punishment.</p>
      </header>

      <Card className="bg-ink text-white">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-lg bg-sun text-ink">
            <Flame size={26} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white/70">Level {level.level}</p>
            <h2 className="text-2xl font-black">{state.xp} XP</h2>
            <div className="mt-3">
              <ProgressBar value={level.progress} max={level.nextLevelXp} color="bg-mint" />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-xl font-black">Quests</h2>
        <div className="space-y-4">
          {quests.map((quest) => (
            <div key={quest.id} className="rounded-lg border border-stone-200 p-3">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <p className="font-black">{quest.title}</p>
                  <p className="text-sm text-stone-600">{quest.description}</p>
                </div>
                <span className="rounded-full bg-cream px-2 py-1 text-xs font-black uppercase text-lagoon">{quest.cadence}</span>
              </div>
              <ProgressBar value={quest.progress} max={quest.target} color={quest.progress >= quest.target ? 'bg-mint' : 'bg-lagoon'} label={`${quest.progress.toFixed(quest.target % 1 ? 1 : 0)} / ${quest.target}`} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-xl font-black">Achievements</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {state.achievements.map((achievement) => (
            <div key={achievement.id} className={`rounded-lg border p-3 ${achievement.unlocked ? 'border-mint bg-mint/10' : 'border-stone-200 bg-stone-50'}`}>
              <div className="flex items-start gap-3">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${achievement.unlocked ? 'bg-mint text-white' : 'bg-stone-200 text-stone-500'}`}>
                  {achievement.unlocked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </div>
                <div>
                  <p className="font-black">{achievement.title}</p>
                  <p className="mt-1 text-sm text-stone-600">{achievement.description}</p>
                  {achievement.unlockedDate && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-lagoon">
                      <Trophy size={14} /> Unlocked {achievement.unlockedDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

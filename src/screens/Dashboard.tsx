import { Award, Bed, CalendarDays, Dumbbell, Flame, Footprints, MessageCircle, Scale, Target, Utensils } from 'lucide-react';
import { Card } from '../components/Card';
import { MetricCard } from '../components/MetricCard';
import { ProgressBar } from '../components/ProgressBar';
import type { Quest, WellnessState } from '../types';
import type { Screen } from '../App';
import { generateCoachMessage, styleCoachMessage } from '../utils/coach';
import { calculateDailyScore, calculateStreak, getJourneyDay, getLatestLog, getLevel, getWeightDelta } from '../utils/metrics';

interface DashboardProps {
  state: WellnessState;
  quests: Quest[];
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ state, quests, onNavigate }: DashboardProps) {
  const log = getLatestLog(state.logs);
  const score = calculateDailyScore(log, state.goals);
  const streak = calculateStreak(state.logs);
  const level = getLevel(state.xp);
  const coach = styleCoachMessage(generateCoachMessage(log, state.goals, state.foods), state.goals.coachingStyle);
  const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date());

  return (
    <div className="space-y-4">
      <header className="rounded-lg bg-ink p-5 text-white shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm text-white/75">
              <CalendarDays size={16} /> {formattedDate} · Journey day {getJourneyDay(state.goals.startDate)}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight">Momentum Coach</h1>
            <p className="mt-2 max-w-xl text-sm text-white/75">Wellness habits, nutrition, movement, sleep, and progress. No diagnosis, no shame spiral.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('log')}
            className="rounded-lg bg-mint px-4 py-3 text-sm font-bold text-ink shadow-sm"
          >
            Log
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard icon={Flame} label="Streak" value={`${streak} days`} />
        <MetricCard icon={Target} label="Daily score" value={`${score}/100`} progress={score} max={100} accent="bg-coral" />
        <MetricCard icon={Award} label="Level" value={`${level.level}`} target={`${level.progress}/${level.nextLevelXp} XP`} progress={level.progress} max={level.nextLevelXp} accent="bg-sun" />
        <MetricCard icon={Scale} label="Weight trend" value={`${getWeightDelta(state)} lb`} target={`${log.weight} lb today`} />
      </div>

      <Card className="bg-white">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-lagoon text-white">
            <MessageCircle size={20} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-lagoon">Coach message</p>
            <p className="mt-1 text-base leading-7 text-ink">{coach}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <MetricCard icon={Utensils} label="Calories" value={`${log.calories}`} target={`goal ${state.goals.dailyCalorieTarget}`} progress={log.calories} max={state.goals.dailyCalorieTarget} accent="bg-lagoon" />
        <MetricCard icon={Dumbbell} label="Protein" value={`${log.protein}g`} target={`goal ${state.goals.proteinTarget}g`} progress={log.protein} max={state.goals.proteinTarget} />
        <MetricCard icon={Footprints} label="Walk/cardio" value={`${log.cardioDistanceMiles} mi`} target={`${log.steps.toLocaleString()} steps`} progress={log.cardioDistanceMiles} max={state.goals.walkingTargetMiles} accent="bg-coral" />
        <MetricCard icon={Bed} label="Sleep" value={`${log.sleepHours}h`} target={`${log.sleepQuality} quality`} progress={log.sleepHours} max={state.goals.sleepTargetHours} accent="bg-sun" />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-stone-500">Daily quests</p>
            <h2 className="text-xl font-black text-ink">Earn your tiny wins</h2>
          </div>
          <button type="button" onClick={() => onNavigate('rewards')} className="rounded-lg border border-stone-200 px-3 py-2 text-sm font-bold">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {quests.slice(0, 2).map((quest) => (
            <div key={quest.id}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-bold">{quest.title}</span>
                <span className="text-sm text-stone-500">+{quest.xp} XP</span>
              </div>
              <ProgressBar value={quest.progress} max={quest.target} color={quest.progress >= quest.target ? 'bg-mint' : 'bg-lagoon'} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

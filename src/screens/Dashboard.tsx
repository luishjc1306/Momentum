import { Award, CalendarDays, CheckCircle2, Flame, Footprints, MessageCircle, Plus, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { buildEmptyDailyLog, todayKey } from '../data/seedData';
import type { Quest, WellnessState } from '../types';
import type { Screen } from '../App';
import { generateCoachMessage, styleCoachMessage } from '../utils/coach';
import { calculateDailyScore, calculateStreak, getJourneyDay, getLevel } from '../utils/metrics';

interface DashboardProps {
  state: WellnessState;
  quests: Quest[];
  onNavigate: (screen: Screen) => void;
}

function ProgressRing({ value, label, detail }: { value: number; label: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10">
      <div
        className="mx-auto grid h-24 w-24 place-items-center rounded-full"
        style={{ background: `conic-gradient(#2bbf8a ${value * 3.6}deg, rgba(22, 33, 31, 0.1) 0deg)` }}
      >
        <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center dark:bg-ink">
          <span className="text-2xl font-black">{value}%</span>
        </div>
      </div>
      <p className="mt-3 text-center text-sm font-black">{label}</p>
      <p className="mt-1 text-center text-xs leading-5 text-stone-500 dark:text-white/60">{detail}</p>
    </div>
  );
}

export function Dashboard({ state, quests, onNavigate }: DashboardProps) {
  const todayLog = state.logs.find((entry) => entry.date === todayKey());
  const log = todayLog ?? buildEmptyDailyLog();
  const hasLogs = state.logs.length > 0;
  const score = hasLogs ? calculateDailyScore(log, state.goals) : 12;
  const streak = calculateStreak(state.logs);
  const level = getLevel(state.xp);
  const coach = hasLogs
    ? styleCoachMessage(generateCoachMessage(log, state.goals, state.foods), state.goals.coachingStyle)
    : 'Small actions build momentum. Start with one tiny check-in today and Momentum will adapt around what you actually do.';
  const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(new Date());
  const primaryGoal = state.profile.mainGoals[0] ?? 'Stay consistent';

  return (
    <div className="space-y-4">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_top_right,rgba(43,191,138,0.42),transparent_38%),linear-gradient(145deg,#16211f,#21312d)] p-5 text-white shadow-soft"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm text-white/70">
              <CalendarDays size={16} /> {formattedDate} · Day {getJourneyDay(state.goals.startDate)}
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight">You’re in, {state.profile.nickname}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/72">{primaryGoal} starts with one calm action.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('log')}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint text-ink shadow-sm transition active:scale-95"
            aria-label="Log today"
          >
            <Plus size={22} />
          </button>
        </div>
      </motion.header>

      <Card className="border-white/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lagoon text-white">
            <MessageCircle size={20} />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-lagoon dark:text-mint">Momentum coach</p>
            <p className="mt-1 text-base leading-7">{coach}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <ProgressRing value={hasLogs ? score : 12} label="Today" detail={hasLogs ? 'Logged signal' : 'Ready to start'} />
        <ProgressRing value={Math.min(100, streak * 14)} label="Streak" detail={`${streak} day${streak === 1 ? '' : 's'}`} />
        <ProgressRing value={Math.round((level.progress / level.nextLevelXp) * 100)} label="Level" detail={`Level ${level.level}`} />
      </div>

      {!hasLogs && (
        <Card className="bg-cream shadow-none dark:bg-white/10 dark:text-white">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-sun text-ink">
              <Sparkles size={19} />
            </div>
            <div>
              <h2 className="text-lg font-black">Your first win is simple</h2>
              <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-white/65">
                Log one meal, a short walk, sleep, or a note. No targets required yet.
              </p>
              <button type="button" onClick={() => onNavigate('log')} className="mt-3 rounded-2xl bg-ink px-4 py-3 text-sm font-black text-white dark:bg-mint dark:text-ink">
                Log one thing
              </button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="shadow-none dark:bg-white/10 dark:text-white">
          <Flame className="text-coral" size={22} />
          <p className="mt-3 text-2xl font-black">{streak}</p>
          <p className="text-sm text-stone-500 dark:text-white/60">day streak</p>
        </Card>
        <Card className="shadow-none dark:bg-white/10 dark:text-white">
          <Award className="text-sun" size={22} />
          <p className="mt-3 text-2xl font-black">{state.xp}</p>
          <p className="text-sm text-stone-500 dark:text-white/60">XP earned</p>
        </Card>
        <Card className="shadow-none dark:bg-white/10 dark:text-white">
          <Footprints className="text-lagoon dark:text-mint" size={22} />
          <p className="mt-3 text-2xl font-black">{todayLog ? log.steps.toLocaleString() : '—'}</p>
          <p className="text-sm text-stone-500 dark:text-white/60">steps today</p>
        </Card>
      </div>

      <Card className="dark:bg-white/10 dark:text-white">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-stone-500 dark:text-white/50">Gentle quests</p>
            <h2 className="text-xl font-black">Tiny actions</h2>
          </div>
          <button type="button" onClick={() => onNavigate('rewards')} className="rounded-2xl border border-stone-200 px-3 py-2 text-sm font-bold dark:border-white/10">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {quests.slice(0, 2).map((quest) => (
            <div key={quest.id}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-bold">
                  <CheckCircle2 size={17} className="text-mint" /> {quest.title}
                </span>
                <span className="text-sm text-stone-500 dark:text-white/55">+{quest.xp} XP</span>
              </div>
              <ProgressBar value={quest.progress} max={Math.max(1, quest.target)} color={quest.progress >= quest.target && quest.target > 0 ? 'bg-mint' : 'bg-lagoon'} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/Card';
import { Field, SelectField } from '../components/forms';
import { coachingStyles, todayKey } from '../data/seedData';
import type { CoachingStyle, UserGoals, UserProfile } from '../types';

interface OnboardingScreenProps {
  onComplete: (profile: UserProfile, goals: UserGoals) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [nickname, setNickname] = useState('');
  const [startingWeight, setStartingWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState('');
  const [proteinTarget, setProteinTarget] = useState('');
  const [workoutTargetPerWeek, setWorkoutTargetPerWeek] = useState('');
  const [sleepTargetHours, setSleepTargetHours] = useState('');
  const [coachingStyle, setCoachingStyle] = useState<CoachingStyle>('Supportive');

  const canContinue =
    nickname.trim() &&
    Number(startingWeight) > 0 &&
    Number(goalWeight) > 0 &&
    Number(dailyCalorieTarget) > 0 &&
    Number(proteinTarget) > 0 &&
    Number(workoutTargetPerWeek) >= 0 &&
    Number(sleepTargetHours) > 0;

  const submit = () => {
    if (!canContinue) return;

    onComplete(
      { nickname: nickname.trim(), onboardedAt: new Date().toISOString() },
      {
        startingWeight: Number(startingWeight),
        goalWeight: Number(goalWeight),
        dailyCalorieTarget: Number(dailyCalorieTarget),
        proteinTarget: Number(proteinTarget),
        workoutTargetPerWeek: Number(workoutTargetPerWeek),
        walkingTargetMiles: 0,
        sleepTargetHours: Number(sleepTargetHours),
        coachingStyle,
        startDate: todayKey(),
      },
    );
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-6 text-ink">
      <div className="w-full space-y-4">
        <header className="rounded-lg bg-ink p-5 text-white shadow-soft">
          <p className="text-sm font-bold uppercase tracking-wide text-mint">Welcome to Momentum</p>
          <h1 className="mt-3 text-3xl font-black leading-tight">Set your baseline</h1>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Momentum starts empty. Add your goals once, then your dashboard fills in only from data you log.
          </p>
        </header>

        <Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name or nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder="Luis" autoComplete="nickname" />
            <Field label="Starting weight" type="number" step="0.1" value={startingWeight} onChange={(event) => setStartingWeight(event.target.value)} placeholder="0" />
            <Field label="Goal weight" type="number" step="0.1" value={goalWeight} onChange={(event) => setGoalWeight(event.target.value)} placeholder="0" />
            <Field label="Calorie goal" type="number" value={dailyCalorieTarget} onChange={(event) => setDailyCalorieTarget(event.target.value)} placeholder="0" />
            <Field label="Protein goal (g)" type="number" value={proteinTarget} onChange={(event) => setProteinTarget(event.target.value)} placeholder="0" />
            <Field label="Workout goal per week" type="number" value={workoutTargetPerWeek} onChange={(event) => setWorkoutTargetPerWeek(event.target.value)} placeholder="0" />
            <Field label="Sleep goal (hours)" type="number" step="0.1" value={sleepTargetHours} onChange={(event) => setSleepTargetHours(event.target.value)} placeholder="0" />
            <SelectField label="Preferred coaching style" value={coachingStyle} onChange={(event) => setCoachingStyle(event.target.value as CoachingStyle)}>
              {coachingStyles.map((style) => (
                <option key={style}>{style}</option>
              ))}
            </SelectField>
          </div>
        </Card>

        <button
          type="button"
          onClick={submit}
          disabled={!canContinue}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 py-4 text-base font-black text-white shadow-soft transition disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
        >
          Start empty dashboard <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

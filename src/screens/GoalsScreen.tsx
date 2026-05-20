import { RotateCcw, Save } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/Card';
import { Field, SelectField } from '../components/forms';
import { coachingStyles } from '../data/seedData';
import { updateGoals } from '../data/storage';
import type { CoachingStyle, UserGoals, WellnessState } from '../types';

interface GoalsScreenProps {
  state: WellnessState;
  setState: (state: WellnessState) => void;
  onReset: () => void;
}

export function GoalsScreen({ state, setState, onReset }: GoalsScreenProps) {
  const [goals, setGoals] = useState<UserGoals>(state.goals);
  const update = <K extends keyof UserGoals>(key: K, value: UserGoals[K]) => setGoals((current) => ({ ...current, [key]: value }));
  const numberValue = (value: string) => Number(value || 0);

  const save = () => setState(updateGoals(state, goals));
  const reset = () => {
    if (window.confirm('Reset Momentum and delete all local app data?')) {
      onReset();
    }
  };

  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm font-bold uppercase tracking-wide text-lagoon">Personalized goals</p>
        <h1 className="text-3xl font-black">Settings</h1>
        <p className="mt-1 text-sm text-stone-600">Lifestyle targets only. Future clinical or disease-specific guidance should go through proper review.</p>
      </header>

      <Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Start date" type="date" value={goals.startDate} onChange={(event) => update('startDate', event.target.value)} />
          <Field label="Starting weight" type="number" step="0.1" value={goals.startingWeight} onChange={(event) => update('startingWeight', numberValue(event.target.value))} />
          <Field label="Goal weight" type="number" step="0.1" value={goals.goalWeight} onChange={(event) => update('goalWeight', numberValue(event.target.value))} />
          <Field label="Daily calorie target" type="number" value={goals.dailyCalorieTarget} onChange={(event) => update('dailyCalorieTarget', numberValue(event.target.value))} />
          <Field label="Protein target (g)" type="number" value={goals.proteinTarget} onChange={(event) => update('proteinTarget', numberValue(event.target.value))} />
          <Field label="Workout target per week" type="number" value={goals.workoutTargetPerWeek} onChange={(event) => update('workoutTargetPerWeek', numberValue(event.target.value))} />
          <Field label="Walking/cardio target (mi)" type="number" step="0.1" value={goals.walkingTargetMiles} onChange={(event) => update('walkingTargetMiles', numberValue(event.target.value))} />
          <Field label="Sleep target (hours)" type="number" step="0.1" value={goals.sleepTargetHours} onChange={(event) => update('sleepTargetHours', numberValue(event.target.value))} />
          <SelectField label="Preferred coaching style" value={goals.coachingStyle} onChange={(event) => update('coachingStyle', event.target.value as CoachingStyle)}>
            {coachingStyles.map((style) => (
              <option key={style}>{style}</option>
            ))}
          </SelectField>
        </div>
      </Card>

      <Card className="bg-cream shadow-none">
        <p className="text-sm font-bold uppercase tracking-wide text-lagoon">Future integrations</p>
        <p className="mt-2 text-sm leading-6 text-stone-700">
          Authentication, backend sync, Apple Health, Oura, WHOOP, barcode scanning, photo food logging, voice logging, and paid subscription gates can attach around the storage and logging modules without changing the core screens.
        </p>
      </Card>

      <button type="button" onClick={save} className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 py-4 text-base font-black text-white shadow-soft">
        <Save size={18} /> Save goals
      </button>

      <Card className="border-coral/20 bg-white shadow-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-coral">Reset app data</p>
            <p className="mt-1 text-sm text-stone-600">Deletes onboarding, goals, logs, foods, XP, and achievements from localStorage.</p>
          </div>
          <button type="button" onClick={reset} className="flex items-center justify-center gap-2 rounded-lg border border-coral px-4 py-3 font-black text-coral">
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </Card>
    </div>
  );
}

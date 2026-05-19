import { Save } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/Card';
import { Field, SelectField } from '../components/forms';
import { updateGoals } from '../data/storage';
import type { CoachingStyle, UserGoals, WellnessState } from '../types';

interface GoalsScreenProps {
  state: WellnessState;
  setState: (state: WellnessState) => void;
}

const coachingStyles: CoachingStyle[] = ['Supportive', 'Straightforward', 'Science-based', 'Funny gym bro', 'Doctor mode'];

export function GoalsScreen({ state, setState }: GoalsScreenProps) {
  const [goals, setGoals] = useState<UserGoals>(state.goals);
  const update = <K extends keyof UserGoals>(key: K, value: UserGoals[K]) => setGoals((current) => ({ ...current, [key]: value }));
  const numberValue = (value: string) => Number(value || 0);

  const save = () => setState(updateGoals(state, goals));

  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm font-bold uppercase tracking-wide text-lagoon">Personalized goals</p>
        <h1 className="text-3xl font-black">Tune the plan</h1>
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
    </div>
  );
}

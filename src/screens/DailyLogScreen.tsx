import { Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/Card';
import { Field, SelectField, TextAreaField } from '../components/forms';
import { upsertLog } from '../data/storage';
import type { DailyLog, MealLog, MoodEnergy, SleepQuality, WellnessState } from '../types';

interface DailyLogScreenProps {
  state: WellnessState;
  setState: (state: WellnessState) => void;
  activeLog: DailyLog;
}

export function DailyLogScreen({ state, setState, activeLog }: DailyLogScreenProps) {
  const [log, setLog] = useState<DailyLog>(activeLog);
  const [meal, setMeal] = useState<Omit<MealLog, 'id'>>({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  const update = <K extends keyof DailyLog>(key: K, value: DailyLog[K]) => setLog((current) => ({ ...current, [key]: value }));
  const updateMeal = <K extends keyof Omit<MealLog, 'id'>>(key: K, value: Omit<MealLog, 'id'>[K]) => setMeal((current) => ({ ...current, [key]: value }));
  const numberValue = (value: string) => Number(value || 0);
  const visibleNumber = (value: number) => (value === 0 ? '' : value);

  const save = () => {
    setState(upsertLog(state, log));
  };

  const addMeal = () => {
    if (!meal.name.trim()) return;
    const nextMeal: MealLog = { ...meal, id: crypto.randomUUID(), name: meal.name.trim() };
    setLog((current) => ({
      ...current,
      meals: [...current.meals, nextMeal],
      calories: current.calories + nextMeal.calories,
      protein: current.protein + nextMeal.protein,
      carbs: current.carbs + nextMeal.carbs,
      fat: current.fat + nextMeal.fat,
      fiber: current.fiber + nextMeal.fiber,
    }));
    setMeal({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  };

  const removeMeal = (mealToRemove: MealLog) => {
    setLog((current) => ({
      ...current,
      meals: current.meals.filter((entry) => entry.id !== mealToRemove.id),
      calories: Math.max(0, current.calories - mealToRemove.calories),
      protein: Math.max(0, current.protein - mealToRemove.protein),
      carbs: Math.max(0, current.carbs - mealToRemove.carbs),
      fat: Math.max(0, current.fat - mealToRemove.fat),
      fiber: Math.max(0, current.fiber - mealToRemove.fiber),
    }));
  };

  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm font-bold uppercase tracking-wide text-lagoon">Daily logging</p>
        <h1 className="text-3xl font-black">Today’s check-in</h1>
        <p className="mt-1 text-sm text-stone-600">Capture the signal. The coach uses this data to nudge one small next step.</p>
      </header>

      <Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Date" type="date" value={log.date} onChange={(event) => update('date', event.target.value)} />
          <Field label="Weight" type="number" step="0.1" value={visibleNumber(log.weight)} onChange={(event) => update('weight', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Calories" type="number" value={visibleNumber(log.calories)} onChange={(event) => update('calories', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Protein (g)" type="number" value={visibleNumber(log.protein)} onChange={(event) => update('protein', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Carbs (g)" type="number" value={visibleNumber(log.carbs)} onChange={(event) => update('carbs', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Fat (g)" type="number" value={visibleNumber(log.fat)} onChange={(event) => update('fat', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Fiber (g)" type="number" value={visibleNumber(log.fiber)} onChange={(event) => update('fiber', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Water (oz)" type="number" value={visibleNumber(log.waterOz)} onChange={(event) => update('waterOz', numberValue(event.target.value))} placeholder="Not logged" />
        </div>
      </Card>

      <Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Workout type" value={log.workoutType} onChange={(event) => update('workoutType', event.target.value)} />
          <Field label="Workout duration (min)" type="number" value={visibleNumber(log.workoutDurationMinutes)} onChange={(event) => update('workoutDurationMinutes', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Cardio/walking distance (mi)" type="number" step="0.1" value={visibleNumber(log.cardioDistanceMiles)} onChange={(event) => update('cardioDistanceMiles', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Steps" type="number" value={visibleNumber(log.steps)} onChange={(event) => update('steps', numberValue(event.target.value))} placeholder="Not logged" />
          <Field label="Sleep hours" type="number" step="0.1" value={visibleNumber(log.sleepHours)} onChange={(event) => update('sleepHours', numberValue(event.target.value))} placeholder="Not logged" />
          <SelectField label="Sleep quality" value={log.sleepQuality} onChange={(event) => update('sleepQuality', event.target.value as SleepQuality)}>
            <option>Poor</option>
            <option>Okay</option>
            <option>Good</option>
            <option>Great</option>
          </SelectField>
          <SelectField label="Mood/energy" value={log.moodEnergy} onChange={(event) => update('moodEnergy', event.target.value as MoodEnergy)}>
            <option>Low</option>
            <option>Steady</option>
            <option>Good</option>
            <option>High</option>
          </SelectField>
        </div>
        <div className="mt-3">
          <TextAreaField label="Notes" value={log.notes} onChange={(event) => update('notes', event.target.value)} />
        </div>
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-stone-500">Meals</p>
            <h2 className="text-xl font-black">Meals today</h2>
          </div>
          <span className="rounded-full bg-cream px-3 py-1 text-sm font-bold text-lagoon">{log.meals.length} logged</span>
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Field label="Meal name" value={meal.name} onChange={(event) => updateMeal('name', event.target.value)} placeholder="Chicken rice bowl" />
          <Field label="Meal calories" type="number" value={visibleNumber(meal.calories)} onChange={(event) => updateMeal('calories', numberValue(event.target.value))} placeholder="0" />
          <Field label="Meal protein (g)" type="number" value={visibleNumber(meal.protein)} onChange={(event) => updateMeal('protein', numberValue(event.target.value))} placeholder="0" />
          <Field label="Meal carbs (g)" type="number" value={visibleNumber(meal.carbs)} onChange={(event) => updateMeal('carbs', numberValue(event.target.value))} placeholder="0" />
          <Field label="Meal fat (g)" type="number" value={visibleNumber(meal.fat)} onChange={(event) => updateMeal('fat', numberValue(event.target.value))} placeholder="0" />
          <Field label="Meal fiber (g)" type="number" value={visibleNumber(meal.fiber)} onChange={(event) => updateMeal('fiber', numberValue(event.target.value))} placeholder="0" />
          <button type="button" onClick={addMeal} className="flex items-center justify-center gap-2 rounded-lg bg-lagoon px-4 py-3 font-black text-white sm:col-span-2">
            <Plus size={18} /> Add meal to totals
          </button>
        </div>
        <div className="space-y-2">
          {log.meals.map((meal) => (
            <div key={meal.id} className="rounded-lg border border-stone-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold">{meal.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-stone-500">{meal.calories} cal</p>
                  <button type="button" onClick={() => removeMeal(meal)} className="grid h-8 w-8 place-items-center rounded-lg text-stone-500 hover:bg-stone-100" aria-label={`Remove ${meal.name}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-stone-500">
                {meal.protein}g protein · {meal.carbs}g carbs · {meal.fat}g fat · {meal.fiber}g fiber
              </p>
            </div>
          ))}
        </div>
      </Card>

      <button
        type="button"
        onClick={save}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-5 py-4 text-base font-black text-white shadow-soft"
      >
        <Save size={18} /> Save daily log
      </button>
    </div>
  );
}

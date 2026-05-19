import { Plus, Salad } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/Card';
import { Field, SelectField } from '../components/forms';
import { addFoodPreference } from '../data/storage';
import type { FoodPreference, WellnessState } from '../types';
import { makeId } from '../utils/id';

interface FoodPreferencesScreenProps {
  state: WellnessState;
  setState: (state: WellnessState) => void;
}

export function FoodPreferencesScreen({ state, setState }: FoodPreferencesScreenProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodPreference['category']>('protein');

  const addFood = () => {
    if (!name.trim()) return;
    setState(addFoodPreference(state, { id: makeId(name), name: name.trim(), category }));
    setName('');
  };

  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm font-bold uppercase tracking-wide text-lagoon">Food preferences</p>
        <h1 className="text-3xl font-black">Your easy foods</h1>
        <p className="mt-1 text-sm text-stone-600">The mock coach favors these when suggesting practical meals.</p>
      </header>

      <Card>
        <div className="grid gap-3 sm:grid-cols-[1fr_180px_auto] sm:items-end">
          <Field label="Food or meal" value={name} onChange={(event) => setName(event.target.value)} placeholder="Greek yogurt bowl" />
          <SelectField label="Category" value={category} onChange={(event) => setCategory(event.target.value as FoodPreference['category'])}>
            <option value="protein">Protein</option>
            <option value="carb">Carb</option>
            <option value="fat">Fat</option>
            <option value="vegetable">Vegetable</option>
            <option value="meal">Meal</option>
            <option value="condiment">Condiment</option>
          </SelectField>
          <button type="button" onClick={addFood} className="flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 font-black text-white">
            <Plus size={18} /> Add
          </button>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {state.foods.map((food) => (
          <Card key={food.id} className="shadow-none">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cream text-lagoon">
                <Salad size={18} />
              </div>
              <div>
                <p className="font-black capitalize">{food.name}</p>
                <p className="mt-1 text-sm font-semibold capitalize text-stone-500">{food.category}</p>
                {food.notes && <p className="mt-2 text-sm text-stone-600">{food.notes}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { BarChart3, Dumbbell, Home, Salad, Settings, Trophy } from 'lucide-react';
import type { Screen } from '../App';

const items: Array<{ id: Screen; label: string; icon: typeof Home }> = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'log', label: 'Log', icon: Dumbbell },
  { id: 'foods', label: 'Foods', icon: Salad },
  { id: 'progress', label: 'Charts', icon: BarChart3 },
  { id: 'rewards', label: 'Rewards', icon: Trophy },
  { id: 'goals', label: 'Goals', icon: Settings },
];

interface BottomNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/95 px-2 pb-safe pt-2 backdrop-blur md:left-1/2 md:max-w-3xl md:-translate-x-1/2 md:rounded-t-lg md:border-x">
      <div className="grid grid-cols-6 gap-1">
        {items.map(({ id, label, icon: Icon }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-semibold transition ${
                selected ? 'bg-ink text-white' : 'text-stone-500 hover:bg-stone-100'
              }`}
              aria-label={label}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

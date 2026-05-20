import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ChoiceCardProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function ChoiceCard({ icon: Icon, label, selected, onClick }: ChoiceCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`relative flex min-h-24 flex-col items-start justify-between rounded-2xl border p-4 text-left shadow-sm transition ${
        selected
          ? 'border-ink bg-ink text-white dark:border-mint dark:bg-mint dark:text-ink'
          : 'border-white/70 bg-white/72 text-ink backdrop-blur-xl hover:border-ink/30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-mint/50'
      }`}
    >
      <Icon size={24} />
      <span className="pr-6 text-base font-black">{label}</span>
      {selected && (
        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white text-ink dark:bg-ink dark:text-mint">
          <Check size={14} strokeWidth={3} />
        </span>
      )}
    </motion.button>
  );
}

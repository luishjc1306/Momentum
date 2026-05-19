import type { LucideIcon } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  target?: string;
  progress?: number;
  max?: number;
  accent?: string;
}

export function MetricCard({ icon: Icon, label, value, target, progress, max, accent = 'bg-mint' }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
          <p className="mt-1 text-xl font-bold text-ink">{value}</p>
          {target && <p className="text-xs text-stone-500">{target}</p>}
        </div>
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream text-lagoon">
          <Icon size={18} />
        </div>
      </div>
      {progress !== undefined && max !== undefined && (
        <div className="mt-3">
          <ProgressBar value={progress} max={max} color={accent} />
        </div>
      )}
    </div>
  );
}

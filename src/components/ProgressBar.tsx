interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  label?: string;
}

export function ProgressBar({ value, max, color = 'bg-mint', label }: ProgressBarProps) {
  const percentage = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm font-medium text-ink">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-stone-200">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

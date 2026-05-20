import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

interface OnboardingShellProps extends PropsWithChildren {
  step: number;
  totalSteps: number;
}

export function OnboardingShell({ step, totalSteps, children }: OnboardingShellProps) {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#d8f8e8_0%,transparent_34%),linear-gradient(145deg,#fff9ef_0%,#edf8f4_48%,#f6f2ea_100%)] px-4 py-6 text-ink dark:bg-[radial-gradient(circle_at_top_left,rgba(43,191,138,0.22)_0%,transparent_34%),linear-gradient(145deg,#111917_0%,#16211f_55%,#0d1211_100%)] dark:text-white">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/55 dark:bg-white/15">
              <motion.div
                className="h-full rounded-full bg-ink dark:bg-mint"
                initial={false}
                animate={{ width: index <= step ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-center py-6">{children}</div>
      </div>
    </div>
  );
}

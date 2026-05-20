import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export function OnboardingButton({ children, className = '', ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`flex min-h-14 w-full items-center justify-center rounded-2xl bg-ink px-5 py-4 text-base font-black text-white shadow-soft transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 dark:bg-mint dark:text-ink ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

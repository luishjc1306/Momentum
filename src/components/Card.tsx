import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return <section className={`rounded-lg border border-black/5 bg-white p-4 shadow-soft ${className}`}>{children}</section>;
}

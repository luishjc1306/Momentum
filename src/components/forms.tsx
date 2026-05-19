import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

export function Field({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="space-y-1 text-sm font-semibold text-ink">
      <span>{label}</span>
      <input
        className="w-full rounded-lg border border-stone-200 bg-white px-3 py-3 text-base outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
        {...props}
      />
    </label>
  );
}

export function SelectField({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="space-y-1 text-sm font-semibold text-ink">
      <span>{label}</span>
      <select
        className="w-full rounded-lg border border-stone-200 bg-white px-3 py-3 text-base outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

export function TextAreaField({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="space-y-1 text-sm font-semibold text-ink">
      <span>{label}</span>
      <textarea
        className="min-h-24 w-full rounded-lg border border-stone-200 bg-white px-3 py-3 text-base outline-none transition focus:border-lagoon focus:ring-2 focus:ring-lagoon/20"
        {...props}
      />
    </label>
  );
}

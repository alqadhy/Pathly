import type { ReactNode } from "react";

interface FieldWrapperProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  htmlFor,
  error,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block text-body-lg font-medium  mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-[var(--danger)]">{error}</p>
      )}
    </div>
  );
}
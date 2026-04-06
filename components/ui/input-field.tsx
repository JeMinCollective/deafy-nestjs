"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export type InputFieldProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
  hint?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      error,
      hint,
      id: idProp,
      className,
      required,
      ...rest
    },
    ref,
  ) {
  const uid = useId();
  const inputId = idProp ?? `field-${uid}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="text-foreground text-sm font-medium leading-none"
      >
        {label}
        {required ? (
          <span className="text-muted-foreground ml-1 font-normal">(required)</span>
        ) : null}
      </label>
      <input
        ref={ref}
        id={inputId}
        required={required}
        className={cn(
          "border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-colors",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error &&
            "border-destructive focus-visible:ring-destructive/40 aria-invalid",
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={
          error ? errorId : hint ? hintId : undefined
        }
        {...rest}
      />
      {hint && !error ? (
        <p id={hintId} className="text-muted-foreground text-xs">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
},
);

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FieldProps {
  id: string;
  label: string;
  hint?: ReactNode | undefined;
  error?: string | undefined;
  optional?: boolean | undefined;
  children: ReactNode;
}

export function Field({ id, label, hint, error, optional, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id} className="text-sm font-semibold">
          {label}
          {optional && <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span>}
        </Label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="animate-fade-up text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  current: number;
  onSelect: (index: number) => void;
}

export function StepIndicator({ steps, current, onSelect }: StepIndicatorProps) {
  return (
    <ol className="flex items-center gap-2" aria-label="Progress">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "group flex items-center gap-2 rounded-full text-left text-xs font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full border text-xs transition-all duration-300",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary bg-secondary text-foreground shadow-glow",
                  !done && !active && "border-border bg-card",
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className="hidden md:inline">{label}</span>
            </button>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1 transition-colors duration-500",
                  done ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

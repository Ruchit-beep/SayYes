import { Check } from "lucide-react";
import { PROPOSAL_THEMES, type ProposalThemeId } from "@/lib/proposal";
import { cn } from "@/lib/utils";

interface ThemePickerProps {
  value: ProposalThemeId;
  onChange: (value: ProposalThemeId) => void;
}

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  return (
    <div role="radiogroup" aria-label="Proposal theme" className="grid grid-cols-2 gap-3">
      {PROPOSAL_THEMES.map((theme) => {
        const selected = theme.id === value;
        return (
          <button
            key={theme.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(theme.id)}
            className={cn(
              "relative rounded-2xl border-2 p-1 text-left transition-all duration-300",
              selected ? "border-primary shadow-glow" : "border-transparent hover:-translate-y-0.5",
            )}
          >
            <div data-theme={theme.id} className="bg-proposal rounded-xl border border-border p-4 text-foreground">
              <div className="flex gap-1.5">
                <span className="size-4 rounded-full bg-primary" />
                <span className="size-4 rounded-full bg-secondary" />
                <span className="size-4 rounded-full border border-border bg-background" />
              </div>
              <p className="mt-6 font-display text-xl leading-none">{theme.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{theme.description}</p>
            </div>
            {selected && (
              <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3.5" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

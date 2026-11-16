import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { EMPTY_DRAFT, type ProposalDraft } from "@/lib/proposal";

const SESSION_KEY = "sayyes:draft";

interface DraftContextValue {
  draft: ProposalDraft;
  update: (patch: Partial<ProposalDraft>) => void;
  reset: () => void;
  step: number;
  setStep: (step: number) => void;
  /** True once the saved draft has been read from this browser session. */
  hydrated: boolean;
}

const DraftContext = createContext<DraftContextValue | null>(null);

export function ProposalDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ProposalDraft>(EMPTY_DRAFT);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      if (raw) setDraft({ ...EMPTY_DRAFT, ...(JSON.parse(raw) as Partial<ProposalDraft>) });
    } catch {
      /* ignore unreadable drafts */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(draft));
    } catch {
      /* storage full: keep working from memory */
    }
  }, [draft, hydrated]);

  const update = useCallback((patch: Partial<ProposalDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setDraft(EMPTY_DRAFT);
    setStep(0);
  }, []);

  const value = useMemo(
    () => ({ draft, update, reset, step, setStep, hydrated }),
    [draft, update, reset, step, hydrated],
  );

  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>;
}

export function useProposalDraft() {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error("useProposalDraft must be used inside ProposalDraftProvider");
  return ctx;
}

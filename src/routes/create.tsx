import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Eye, Wand2 } from "lucide-react";
import { Field } from "@/components/create/Field";
import { PhotoUpload } from "@/components/create/PhotoUpload";
import { StepIndicator } from "@/components/create/StepIndicator";
import { ThemePicker } from "@/components/create/ThemePicker";
import { ProposalView } from "@/components/proposal/ProposalView";
import { Navbar } from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProposalDraft } from "@/context/proposal-draft";
import {
  firstInvalidStep,
  LIMITS,
  QUESTION_SUGGESTIONS,
  SAMPLE_MESSAGE,
  STEP_FIELDS,
  validateProposal,
  validateStep,
  type ProposalDraft,
  type ProposalErrors,
} from "@/lib/proposal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create your proposal · SayYes" },
      { name: "description", content: "Add your names, a photo, a love message and your question — step by step." },
      { property: "og:title", content: "Create your proposal · SayYes" },
      { property: "og:description", content: "Build a romantic proposal page in a few gentle steps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreatePage,
});

const STEPS = [
  { label: "You two", title: "Let's start with the two of you", text: "Who is asking, and who is the lucky one?" },
  { label: "Photo", title: "Add a photo you both love", text: "A favourite moment together makes it unforgettable." },
  { label: "Message", title: "Say what's in your heart", text: "Write it the way you'd whisper it to them." },
  { label: "The question", title: "Set the mood & ask", text: "Choose a theme, then write your question." },
];

const inputClass = "h-12 rounded-xl bg-card px-4 text-base";

function CreatePage() {
  const { draft, update, step, setStep } = useProposalDraft();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ProposalErrors>({});
  const isLast = step === STEPS.length - 1;

  function change<K extends keyof ProposalDraft>(key: K, value: ProposalDraft[K]) {
    update({ [key]: value } as Partial<ProposalDraft>);
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function goTo(target: number) {
    if (target <= step) {
      setErrors({});
      setStep(target);
      return;
    }
    // Moving forward: every step before the target must be valid.
    for (let s = step; s < target; s++) {
      const stepErrors = validateStep(draft, s);
      if (Object.keys(stepErrors).length) {
        setStep(s);
        setErrors(stepErrors);
        return;
      }
    }
    setErrors({});
    setStep(target);
  }

  function preview() {
    const all = validateProposal(draft);
    const bad = firstInvalidStep(draft);
    if (bad >= 0) {
      setStep(bad);
      const stepErrors: ProposalErrors = {};
      for (const f of STEP_FIELDS[bad] ?? []) if (all[f]) stepErrors[f] = all[f];
      setErrors(stepErrors);
      return;
    }
    navigate({ to: "/preview" });
  }

  const current = STEPS[step] ?? STEPS[0]!;

  return (
    <div className="bg-romance min-h-screen">
      <Navbar />
      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:py-14">
        <section className="rounded-[2rem] border border-border bg-card/80 p-6 shadow-soft sm:p-10">
          <StepIndicator steps={STEPS.map((s) => s.label)} current={step} onSelect={goTo} />

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (isLast) preview();
              else goTo(step + 1);
            }}
          >
            <div key={step} className="animate-fade-up mt-10 space-y-7">
              <header>
                <p className="eyebrow">
                  Step {step + 1} of {STEPS.length}
                </p>
                <h1 className="mt-3 text-4xl sm:text-5xl">{current.title}</h1>
                <p className="mt-2 text-muted-foreground">{current.text}</p>
              </header>

              {step === 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="yourName" label="Your name" error={errors.yourName}>
                    <Input
                      id="yourName"
                      autoFocus
                      value={draft.yourName}
                      maxLength={LIMITS.nameMax}
                      placeholder="e.g. Daniel"
                      aria-invalid={!!errors.yourName}
                      aria-describedby={errors.yourName ? "yourName-error" : undefined}
                      onChange={(e) => change("yourName", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field id="partnerName" label="Partner's name" error={errors.partnerName}>
                    <Input
                      id="partnerName"
                      value={draft.partnerName}
                      maxLength={LIMITS.nameMax}
                      placeholder="e.g. Emma"
                      aria-invalid={!!errors.partnerName}
                      aria-describedby={errors.partnerName ? "partnerName-error" : undefined}
                      onChange={(e) => change("partnerName", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <Field id="photo" label="Couple photo" optional>
                  <PhotoUpload value={draft.photo} onChange={(v) => change("photo", v)} />
                </Field>
              )}

              {step === 2 && (
                <Field
                  id="message"
                  label="Your love message"
                  error={errors.message}
                  hint={`${draft.message.trim().length} / ${LIMITS.messageMax}`}
                >
                  <Textarea
                    id="message"
                    autoFocus
                    rows={8}
                    value={draft.message}
                    maxLength={LIMITS.messageMax}
                    placeholder="From the first moment I met you…"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    onChange={(e) => change("message", e.target.value)}
                    className="rounded-xl bg-card px-4 py-3 text-base leading-relaxed"
                  />
                  {!draft.message && (
                    <Button
                      type="button"
                      variant="soft"
                      size="sm"
                      onClick={() => change("message", SAMPLE_MESSAGE)}
                    >
                      <Wand2 /> Need inspiration? Use a sample
                    </Button>
                  )}
                </Field>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <Field id="theme" label="Proposal theme" error={errors.theme}>
                    <ThemePicker value={draft.theme} onChange={(v) => change("theme", v)} />
                  </Field>
                  <Field
                    id="question"
                    label="Your main question"
                    error={errors.question}
                    hint={`${draft.question.trim().length} / ${LIMITS.questionMax}`}
                  >
                    <Input
                      id="question"
                      value={draft.question}
                      maxLength={LIMITS.questionMax}
                      aria-invalid={!!errors.question}
                      aria-describedby={errors.question ? "question-error" : undefined}
                      onChange={(e) => change("question", e.target.value)}
                      className={cn(inputClass, "font-display text-xl")}
                    />
                    <div className="flex flex-wrap gap-2 pt-1">
                      {QUESTION_SUGGESTIONS.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => change("question", q)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-sm transition-colors",
                            draft.question === q
                              ? "border-primary bg-secondary text-foreground"
                              : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                          )}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              )}
            </div>

            <div className="mt-12 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <Button type="button" variant="quiet" size="lg" onClick={() => goTo(step - 1)}>
                  <ArrowLeft /> Back
                </Button>
              ) : (
                <Button asChild variant="ghost" size="lg" className="rounded-full">
                  <Link to="/">
                    <ArrowLeft /> Home
                  </Link>
                </Button>
              )}
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                {!isLast && (
                  <Button type="button" variant="quiet" size="lg" onClick={preview}>
                    <Eye /> Preview proposal
                  </Button>
                )}
                <Button type="submit" variant="hero" size="xl">
                  {isLast ? (
                    <>
                      <Eye /> Preview proposal
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </section>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="eyebrow">Live preview</p>
            <span className="text-xs text-muted-foreground">Updates as you type</span>
          </div>
          <ProposalView proposal={draft} compact interactive={false} />
        </aside>
      </main>
    </div>
  );
}

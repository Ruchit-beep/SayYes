import { useState } from "react";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { celebrate } from "@/lib/celebrate";
import type { ProposalDraft } from "@/lib/proposal";
import { cn } from "@/lib/utils";
import { AnswerButtons } from "./AnswerButtons";
import { HeartRain } from "./HeartRain";

interface ProposalViewProps {
  proposal: ProposalDraft;
  /** Smaller card version used for the live preview beside the form. */
  compact?: boolean;
  interactive?: boolean;
  /** Extra content shown under the celebration message (e.g. a call to action). */
  afterYes?: React.ReactNode;
}

const DECOR = [
  { className: "left-[6%] top-[12%] size-5", r: "-12deg" },
  { className: "right-[8%] top-[20%] size-7", r: "14deg" },
  { className: "left-[10%] bottom-[18%] size-6", r: "8deg" },
  { className: "right-[12%] bottom-[10%] size-4", r: "-6deg" },
];

export function ProposalView({ proposal, compact = false, interactive = true, afterYes }: ProposalViewProps) {
  const [burst, setBurst] = useState(0);
  const accepted = burst > 0;
  const partner = proposal.partnerName.trim() || "my love";
  const you = proposal.yourName.trim() || "Me";
  const question = proposal.question.trim() || "Will you be mine?";

  function sayYes() {
    setBurst((b) => b + 1);
    void celebrate();
  }

  return (
    <section
      data-theme={proposal.theme}
      className={cn(
        "bg-proposal relative isolate overflow-hidden text-foreground transition-colors duration-500",
        compact ? "rounded-3xl px-6 py-10 shadow-soft" : "min-h-screen px-5 pb-16 pt-24 sm:pt-28",
      )}
    >
      {DECOR.map((d, i) => (
        <Heart
          key={i}
          aria-hidden
          className={cn("absolute -z-10 fill-current text-secondary animate-float-slow", d.className)}
          style={{ "--r": d.r, animationDelay: `${i * 0.8}s` } as React.CSSProperties}
        />
      ))}

      <div className={cn("mx-auto flex flex-col items-center text-center", compact ? "max-w-sm" : "max-w-xl")}>
        <p className="eyebrow animate-fade-up">A letter for {partner}</p>
        <h1
          className={cn(
            "animate-fade-up mt-4 leading-[1.05] [animation-delay:120ms]",
            compact ? "text-4xl" : "text-5xl sm:text-6xl md:text-7xl",
          )}
        >
          My dearest <em className="text-primary">{partner}</em>,
        </h1>

        {proposal.photo && (
          <div
            className={cn(
              "animate-fade-up relative mt-8 [animation-delay:240ms]",
              compact ? "w-40" : "w-56 sm:w-64",
            )}
          >
            <div className="absolute -inset-2.5 arch border border-primary/30" />
            <img
              src={proposal.photo}
              alt={`${you} and ${partner}`}
              className="aspect-[4/5] w-full arch object-cover shadow-lift"
            />
            <span className="absolute -bottom-3 -right-3 grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow animate-heartbeat">
              <Heart className="size-4 fill-current" />
            </span>
          </div>
        )}

        {proposal.message.trim() && (
          <blockquote
            className={cn(
              "animate-fade-up mt-10 whitespace-pre-line font-display italic leading-relaxed text-foreground/90 [animation-delay:360ms]",
              compact ? "text-lg" : "text-xl sm:text-2xl",
            )}
          >
            “{proposal.message.trim()}”
          </blockquote>
        )}
        <p className="animate-fade-up mt-5 text-sm text-muted-foreground [animation-delay:420ms]">
          — with all my love, <span className="font-medium text-foreground">{you}</span>
        </p>

        <div className="my-10 flex items-center gap-3 text-primary" aria-hidden>
          <span className="h-px w-12 bg-primary/40" />
          <Heart className="size-3.5 fill-current" />
          <span className="h-px w-12 bg-primary/40" />
        </div>

        {accepted ? (
          <div className="animate-pop-in flex flex-col items-center" role="status">
            <Sparkles className="size-8 text-primary" />
            <h2 className={cn("mt-3 leading-tight", compact ? "text-3xl" : "text-5xl sm:text-6xl")}>
              {partner} said <em className="text-gradient-rose">yes!</em>
            </h2>
            <p className={cn("mt-4 max-w-md text-muted-foreground", compact ? "text-sm" : "text-lg")}>
              Today just became our favourite memory. {you} can't wait to write every chapter that
              comes next — together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="quiet" size="lg" onClick={sayYes}>
                <RotateCcw /> Relive the moment
              </Button>
              {afterYes}
            </div>
          </div>
        ) : (
          <>
            <h2 className={cn("leading-tight", compact ? "text-3xl" : "text-4xl sm:text-5xl")}>{question}</h2>
            <div className="mt-2 w-full">
              <AnswerButtons onYes={sayYes} interactive={interactive} />
            </div>
          </>
        )}
      </div>

      {accepted && <HeartRain burst={burst} contained={compact} />}
    </section>
  );
}

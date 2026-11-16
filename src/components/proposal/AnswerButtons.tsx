import { useRef, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NO_LABELS = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again…",
  "Pretty please?",
  "One more chance?",
];
const MAX_DODGES = NO_LABELS.length;

interface AnswerButtonsProps {
  onYes: () => void;
  interactive?: boolean;
}

/**
 * YES / NO pair. NO playfully slips away a few times (mouse hover, tap or
 * keyboard press) but stays focusable, then settles so it can always be chosen.
 */
export function AnswerButtons({ onYes, interactive = true }: AnswerButtonsProps) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const lastDodge = useRef(0);
  const [dodges, setDodges] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [declined, setDeclined] = useState(false);

  const settled = dodges >= MAX_DODGES;

  function dodge() {
    const arena = arenaRef.current;
    const no = noRef.current;
    const yes = yesRef.current;
    const slot = slotRef.current;
    if (!arena || !no || !yes || !slot || settled) return;
    lastDodge.current = Date.now();

    const a = arena.getBoundingClientRect();
    const y = yes.getBoundingClientRect();
    // Labels grow as NO pleads, so reserve room for the longest one.
    const w = Math.max(no.offsetWidth, 170);
    const h = no.offsetHeight;
    const pad = 8;
    const s = slot.getBoundingClientRect();
    const baseX = s.left - a.left;
    const baseY = s.top - a.top;
    const currentX = baseX + offset.x;
    const currentY = baseY + offset.y;
    let target = { x: pad, y: pad };
    for (let i = 0; i < 40; i++) {
      const tx = pad + Math.random() * Math.max(0, a.width - w - pad * 2);
      const ty = pad + Math.random() * Math.max(0, a.height - h - pad * 2);
      const left = a.left + tx;
      const top = a.top + ty;
      const overlapsYes =
        left < y.right + 12 &&
        left + w > y.left - 12 &&
        top < y.bottom + 10 &&
        top + h > y.top - 10;
      const farEnough = Math.hypot(tx - currentX, ty - currentY) > 90;
      target = { x: tx, y: ty };
      if (!overlapsYes && farEnough) break;
    }
    setOffset({ x: target.x - baseX, y: target.y - baseY });
    setDodges((d) => d + 1);
  }

  function handleNoClick() {
    if (Date.now() - lastDodge.current < 450) return;
    if (settled) setDeclined(true);
    else dodge();
  }

  const label = NO_LABELS[Math.min(dodges, NO_LABELS.length - 1)];
  const yesScale = 1 + Math.min(dodges, MAX_DODGES) * 0.035;

  return (
    <div className="w-full" inert={!interactive}>
      <div ref={arenaRef} className="relative mx-auto h-48 w-full max-w-lg sm:h-56">
        <div className="absolute inset-0 flex items-center justify-center gap-4">
          <Button
            ref={yesRef}
            variant="hero"
            size="jumbo"
            onClick={onYes}
            style={{ transform: `scale(${yesScale})` }}
            className="transition-transform duration-300"
          >
            <Heart className="fill-current" /> Yes
          </Button>
          {/* Fixed-size slot keeps YES in place while NO wanders and its label grows. */}
          <span ref={slotRef} className="relative h-12 w-20 shrink-0">
            <Button
              ref={noRef}
              variant="quiet"
              size="xl"
              onPointerEnter={(e) => e.pointerType === "mouse" && dodge()}
              onPointerDown={(e) => e.pointerType !== "mouse" && dodge()}
              onClick={handleNoClick}
              style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
              className="absolute left-0 top-0 z-10 transition-transform duration-300 ease-out"
              aria-describedby={declined ? "no-reply" : undefined}
            >
              {label}
            </Button>
          </span>
        </div>
      </div>
      <p
        id="no-reply"
        aria-live="polite"
        className="min-h-6 text-center text-sm text-muted-foreground"
      >
        {declined
          ? "That's okay. Take all the time you need — my heart will wait for you."
          : settled
            ? "Alright, I'll stop running. The choice is all yours."
            : ""}
      </p>
    </div>
  );
}

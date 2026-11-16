import { useMemo } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/** Hearts drifting upward after a YES. Rendered only on the client after a click. */
export function HeartRain({ contained = false, burst }: { contained?: boolean; burst: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: `${burst}-${i}`,
        left: Math.random() * 100,
        size: 14 + Math.random() * 26,
        delay: Math.random() * 1.6,
        dur: 3.2 + Math.random() * 2.6,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() - 0.5) * 70,
        filled: Math.random() > 0.35,
      })),
    [burst],
  );

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none inset-0 z-50 overflow-hidden", contained ? "absolute" : "fixed")}
    >
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className={cn(
            "animate-heart-rise absolute -bottom-12 text-primary opacity-0",
            h.filled && "fill-current",
          )}
          style={
            {
              left: `${h.left}%`,
              width: h.size,
              height: h.size,
              "--delay": `${h.delay}s`,
              "--dur": `${h.dur}s`,
              "--drift": `${h.drift}px`,
              "--spin": `${h.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

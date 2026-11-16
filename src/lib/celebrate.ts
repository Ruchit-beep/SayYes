// canvas-confetti draws on a canvas and needs literal colors (it can't read CSS variables).
const COLORS = ["#C66B83", "#F4C6D2", "#FFF9F5", "#E89AAE", "#F6D7A7"];
const HEART_PATH =
  "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z";

export async function celebrate() {
  const confetti = (await import("canvas-confetti")).default;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heart = confetti.shapeFromPath({ path: HEART_PATH });
  const base = { colors: COLORS, shapes: [heart, "circle" as const], scalar: 1.3, zIndex: 60 };

  confetti({ ...base, particleCount: reduced ? 40 : 160, spread: 100, startVelocity: 45, origin: { y: 0.65 } });
  if (reduced) return;

  const end = Date.now() + 2200;
  const frame = () => {
    confetti({ ...base, particleCount: 3, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } });
    confetti({ ...base, particleCount: 3, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

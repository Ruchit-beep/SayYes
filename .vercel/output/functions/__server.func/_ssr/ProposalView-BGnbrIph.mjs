import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn, t as Button } from "./button-Da0fYki4.mjs";
import { a as RotateCcw, p as Heart, r as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProposalView-BGnbrIph.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"#C66B83",
	"#F4C6D2",
	"#FFF9F5",
	"#E89AAE",
	"#F6D7A7"
];
var HEART_PATH = "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z";
async function celebrate() {
	const confetti = (await import("../_libs/canvas-confetti.mjs").then((n) => n.t)).default;
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const base = {
		colors: COLORS,
		shapes: [confetti.shapeFromPath({ path: HEART_PATH }), "circle"],
		scalar: 1.3,
		zIndex: 60
	};
	confetti({
		...base,
		particleCount: reduced ? 40 : 160,
		spread: 100,
		startVelocity: 45,
		origin: { y: .65 }
	});
	if (reduced) return;
	const end = Date.now() + 2200;
	const frame = () => {
		confetti({
			...base,
			particleCount: 3,
			angle: 60,
			spread: 60,
			origin: {
				x: 0,
				y: .7
			}
		});
		confetti({
			...base,
			particleCount: 3,
			angle: 120,
			spread: 60,
			origin: {
				x: 1,
				y: .7
			}
		});
		if (Date.now() < end) requestAnimationFrame(frame);
	};
	frame();
}
var NO_LABELS = [
	"No",
	"Are you sure?",
	"Really sure?",
	"Think again…",
	"Pretty please?",
	"One more chance?"
];
var MAX_DODGES = NO_LABELS.length;
/**
* YES / NO pair. NO playfully slips away a few times (mouse hover, tap or
* keyboard press) but stays focusable, then settles so it can always be chosen.
*/
function AnswerButtons({ onYes, interactive = true }) {
	const arenaRef = (0, import_react.useRef)(null);
	const yesRef = (0, import_react.useRef)(null);
	const noRef = (0, import_react.useRef)(null);
	const slotRef = (0, import_react.useRef)(null);
	const lastDodge = (0, import_react.useRef)(0);
	const [dodges, setDodges] = (0, import_react.useState)(0);
	const [offset, setOffset] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [declined, setDeclined] = (0, import_react.useState)(false);
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
		const w = Math.max(no.offsetWidth, 170);
		const h = no.offsetHeight;
		const pad = 8;
		const s = slot.getBoundingClientRect();
		const baseX = s.left - a.left;
		const baseY = s.top - a.top;
		const currentX = baseX + offset.x;
		const currentY = baseY + offset.y;
		let target = {
			x: pad,
			y: pad
		};
		for (let i = 0; i < 40; i++) {
			const tx = pad + Math.random() * Math.max(0, a.width - w - 16);
			const ty = pad + Math.random() * Math.max(0, a.height - h - 16);
			const left = a.left + tx;
			const top = a.top + ty;
			const overlapsYes = left < y.right + 12 && left + w > y.left - 12 && top < y.bottom + 10 && top + h > y.top - 10;
			const farEnough = Math.hypot(tx - currentX, ty - currentY) > 90;
			target = {
				x: tx,
				y: ty
			};
			if (!overlapsYes && farEnough) break;
		}
		setOffset({
			x: target.x - baseX,
			y: target.y - baseY
		});
		setDodges((d) => d + 1);
	}
	function handleNoClick() {
		if (Date.now() - lastDodge.current < 450) return;
		if (settled) setDeclined(true);
		else dodge();
	}
	const label = NO_LABELS[Math.min(dodges, NO_LABELS.length - 1)];
	const yesScale = 1 + Math.min(dodges, MAX_DODGES) * .035;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full",
		inert: !interactive,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: arenaRef,
			className: "relative mx-auto h-48 w-full max-w-lg sm:h-56",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex items-center justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					ref: yesRef,
					variant: "hero",
					size: "jumbo",
					onClick: onYes,
					style: { transform: `scale(${yesScale})` },
					className: "transition-transform duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "fill-current" }), " Yes"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					ref: slotRef,
					className: "relative h-12 w-20 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						ref: noRef,
						variant: "quiet",
						size: "xl",
						onPointerEnter: (e) => e.pointerType === "mouse" && dodge(),
						onPointerDown: (e) => e.pointerType !== "mouse" && dodge(),
						onClick: handleNoClick,
						style: { transform: `translate(${offset.x}px, ${offset.y}px)` },
						className: "absolute left-0 top-0 z-10 transition-transform duration-300 ease-out",
						"aria-describedby": declined ? "no-reply" : void 0,
						children: label
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			id: "no-reply",
			"aria-live": "polite",
			className: "min-h-6 text-center text-sm text-muted-foreground",
			children: declined ? "That's okay. Take all the time you need — my heart will wait for you." : settled ? "Alright, I'll stop running. The choice is all yours." : ""
		})]
	});
}
/** Hearts drifting upward after a YES. Rendered only on the client after a click. */
function HeartRain({ contained = false, burst }) {
	const hearts = (0, import_react.useMemo)(() => Array.from({ length: 28 }, (_, i) => ({
		id: `${burst}-${i}`,
		left: Math.random() * 100,
		size: 14 + Math.random() * 26,
		delay: Math.random() * 1.6,
		dur: 3.2 + Math.random() * 2.6,
		drift: (Math.random() - .5) * 160,
		spin: (Math.random() - .5) * 70,
		filled: Math.random() > .35
	})), [burst]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: cn("pointer-events-none inset-0 z-50 overflow-hidden", contained ? "absolute" : "fixed"),
		children: hearts.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
			className: cn("animate-heart-rise absolute -bottom-12 text-primary opacity-0", h.filled && "fill-current"),
			style: {
				left: `${h.left}%`,
				width: h.size,
				height: h.size,
				"--delay": `${h.delay}s`,
				"--dur": `${h.dur}s`,
				"--drift": `${h.drift}px`,
				"--spin": `${h.spin}deg`
			}
		}, h.id))
	});
}
var DECOR = [
	{
		className: "left-[6%] top-[12%] size-5",
		r: "-12deg"
	},
	{
		className: "right-[8%] top-[20%] size-7",
		r: "14deg"
	},
	{
		className: "left-[10%] bottom-[18%] size-6",
		r: "8deg"
	},
	{
		className: "right-[12%] bottom-[10%] size-4",
		r: "-6deg"
	}
];
function ProposalView({ proposal, compact = false, interactive = true, afterYes }) {
	const [burst, setBurst] = (0, import_react.useState)(0);
	const accepted = burst > 0;
	const partner = proposal.partnerName.trim() || "my love";
	const you = proposal.yourName.trim() || "Me";
	const question = proposal.question.trim() || "Will you be mine?";
	function sayYes() {
		setBurst((b) => b + 1);
		celebrate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-theme": proposal.theme,
		className: cn("bg-proposal relative isolate overflow-hidden text-foreground transition-colors duration-500", compact ? "rounded-3xl px-6 py-10 shadow-soft" : "min-h-screen px-5 pb-16 pt-24 sm:pt-28"),
		children: [
			DECOR.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
				"aria-hidden": true,
				className: cn("absolute -z-10 fill-current text-secondary animate-float-slow", d.className),
				style: {
					"--r": d.r,
					animationDelay: `${i * .8}s`
				}
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mx-auto flex flex-col items-center text-center", compact ? "max-w-sm" : "max-w-xl"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow animate-fade-up",
						children: ["A letter for ", partner]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: cn("animate-fade-up mt-4 leading-[1.05] [animation-delay:120ms]", compact ? "text-4xl" : "text-5xl sm:text-6xl md:text-7xl"),
						children: [
							"My dearest ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "text-primary",
								children: partner
							}),
							","
						]
					}),
					proposal.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("animate-fade-up relative mt-8 [animation-delay:240ms]", compact ? "w-40" : "w-56 sm:w-64"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-2.5 arch border border-primary/30" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: proposal.photo,
								alt: `${you} and ${partner}`,
								className: "aspect-[4/5] w-full arch object-cover shadow-lift"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -bottom-3 -right-3 grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow animate-heartbeat",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4 fill-current" })
							})
						]
					}),
					proposal.message.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: cn("animate-fade-up mt-10 whitespace-pre-line font-display italic leading-relaxed text-foreground/90 [animation-delay:360ms]", compact ? "text-lg" : "text-xl sm:text-2xl"),
						children: [
							"“",
							proposal.message.trim(),
							"”"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "animate-fade-up mt-5 text-sm text-muted-foreground [animation-delay:420ms]",
						children: ["— with all my love, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: you
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-10 flex items-center gap-3 text-primary",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-primary/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3.5 fill-current" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-primary/40" })
						]
					}),
					accepted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-pop-in flex flex-col items-center",
						role: "status",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-8 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: cn("mt-3 leading-tight", compact ? "text-3xl" : "text-5xl sm:text-6xl"),
								children: [
									partner,
									" said ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "text-gradient-rose",
										children: "yes!"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("mt-4 max-w-md text-muted-foreground", compact ? "text-sm" : "text-lg"),
								children: [
									"Today just became our favourite memory. ",
									you,
									" can't wait to write every chapter that comes next — together."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "quiet",
									size: "lg",
									onClick: sayYes,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Relive the moment"]
								}), afterYes]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: cn("leading-tight", compact ? "text-3xl" : "text-4xl sm:text-5xl"),
						children: question
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnswerButtons, {
							onYes: sayYes,
							interactive
						})
					})] })
				]
			}),
			accepted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartRain, {
				burst,
				contained: compact
			})
		]
	});
}
//#endregion
export { ProposalView as t };

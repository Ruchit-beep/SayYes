import { a as SAMPLE_MESSAGE } from "./proposal-CBUjNdQ0.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-Da0fYki4.mjs";
import { c as Palette, d as Link2, i as Send, l as MessageCircleHeart, o as PenLine, p as Heart, r as Sparkles, s as PartyPopper, v as Camera } from "../_libs/lucide-react.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./Logo-DHGHbNJQ.mjs";
import { t as Navbar } from "./Navbar-D_bpvUPD.mjs";
import { t as sample_couple_default } from "./sample-couple-D7_fgLQY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CzxiUOOO.js
var import_jsx_runtime = require_jsx_runtime();
var hero_illustration_default = "/assets/hero-illustration-DRupVkR1.jpg";
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border/70 bg-card/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xs space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Beautiful proposal pages for the moments you'll remember forever."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-8 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/create",
					className: "text-muted-foreground transition-colors hover:text-foreground",
					children: "Create a proposal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/p/$id",
					params: { id: "sample" },
					className: "text-muted-foreground transition-colors hover:text-foreground",
					children: "See a sample"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto flex max-w-6xl items-center gap-1.5 px-5 py-5 text-xs text-muted-foreground sm:px-8",
				children: [
					"© 2026 SayYes · Made with ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3 fill-primary text-primary" }),
					" for every brave heart"
				]
			})
		})]
	});
}
var STEPS = [
	{
		icon: PenLine,
		title: "Tell your story",
		text: "Add both your names, a favourite photo and the words you've been holding in your heart."
	},
	{
		icon: Palette,
		title: "Make it yours",
		text: "Pick a theme that feels like you two and write the question you've been waiting to ask."
	},
	{
		icon: Send,
		title: "Share the link",
		text: "Preview every detail, then send your private link — and wait for the sweetest yes."
	}
];
var FEATURES = [
	{
		icon: Camera,
		title: "Your photo, beautifully framed",
		text: "Your favourite picture together, set in a soft arch frame."
	},
	{
		icon: MessageCircleHeart,
		title: "Words from the heart",
		text: "A love letter layout that makes every sentence feel special."
	},
	{
		icon: Palette,
		title: "Four romantic themes",
		text: "Blush, Midnight Rose, Garden or Golden Hour — switch anytime."
	},
	{
		icon: Heart,
		title: "A playful “No” button",
		text: "It shyly slips away… but never stops them from choosing."
	},
	{
		icon: PartyPopper,
		title: "A celebration to remember",
		text: "Hearts and confetti burst the moment they say yes."
	},
	{
		icon: Link2,
		title: "One private link",
		text: "Share it by text, email or a note slipped into their pocket."
	}
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-romance min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center lg:text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow animate-fade-up",
								children: "Proposal pages, made with love"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "animate-fade-up mt-5 text-5xl leading-[1.02] [animation-delay:100ms] sm:text-6xl lg:text-7xl",
								children: ["Some moments deserve ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "text-gradient-rose",
									children: "something special."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "animate-fade-up mx-auto mt-6 max-w-lg text-lg text-muted-foreground [animation-delay:200ms] lg:mx-0",
								children: "SayYes turns your feelings into a beautiful, personal proposal page — your photo, your words and one unforgettable question, shared with a single link."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "animate-fade-up mt-9 flex flex-col items-center gap-3 [animation-delay:300ms] sm:flex-row sm:justify-center lg:justify-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "hero",
									size: "jumbo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/create",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "fill-current" }), " Create Your Proposal"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "quiet",
									size: "xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/p/$id",
										params: { id: "sample" },
										children: "See a sample"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "animate-fade-up mt-6 text-sm text-muted-foreground [animation-delay:400ms]",
								children: "Ready in about three minutes · Preview before you share"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-up relative mx-auto w-full max-w-md [animation-delay:200ms]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "arch absolute -inset-4 -z-10 bg-secondary/40 blur-2xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hero_illustration_default,
								alt: "Watercolour illustration of a couple holding hands under an arch of pink peonies",
								width: 1024,
								height: 1152,
								style: {
									"--arch-ratio": .889,
									"--arch-base": "2.5rem"
								},
								className: "w-full arch border border-border object-cover shadow-lift"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass animate-float absolute -left-4 top-1/3 rounded-2xl border border-border px-4 py-3 shadow-soft sm:-left-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg italic leading-none",
									children: "Will you be mine?"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass animate-float-slow absolute -right-3 bottom-16 flex items-center gap-2 rounded-full border border-border px-4 py-2 shadow-soft sm:-right-8",
								style: { animationDelay: "1.2s" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-7 place-items-center rounded-full bg-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3.5 fill-current" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold",
									children: "She said yes!"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-y border-border/60 bg-card/60 py-20 sm:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-5 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-xl text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "How it works"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-4xl sm:text-5xl",
								children: "Three gentle steps to forever"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-14 grid gap-6 md:grid-cols-3",
							children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative rounded-3xl border border-border bg-background p-8 shadow-soft",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute right-7 top-6 font-display text-6xl leading-none text-secondary",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-12 place-items-center rounded-2xl bg-secondary text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-6 text-2xl",
										children: step.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-muted-foreground",
										children: step.text
									})
								]
							}, step.title))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-xl text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Every detail, considered"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-4xl sm:text-5xl",
							children: "Made for the moment you'll never forget"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 place-items-center rounded-full bg-secondary text-primary transition-transform duration-300 group-hover:scale-110",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 text-2xl",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-muted-foreground",
									children: f.text
								})
							]
						}, f.title))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mx-auto max-w-6xl px-5 pb-24 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-proposal grid items-center gap-10 overflow-hidden rounded-[2.5rem] border border-border p-8 shadow-soft sm:p-12 md:grid-cols-[auto_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sample_couple_default,
							alt: "Emma and Daniel embracing in a flower field at sunset",
							width: 896,
							height: 1120,
							loading: "lazy",
							className: "mx-auto aspect-[4/5] w-48 arch object-cover shadow-lift sm:w-56"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center md:text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "A real-feeling example"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-3 text-4xl sm:text-5xl",
									children: ["Daniel's proposal to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "text-primary",
										children: "Emma"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-5 font-display text-xl italic text-foreground/85 sm:text-2xl",
									children: [
										"“",
										SAMPLE_MESSAGE.split(". ")[0],
										".”"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "hero",
									size: "xl",
									className: "mt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/p/$id",
										params: { id: "sample" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " Open the sample proposal"]
									})
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-3xl px-5 pb-28 text-center sm:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mx-auto size-8 animate-heartbeat fill-primary text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-6 text-4xl sm:text-6xl",
							children: "Ready to ask the question?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-md text-lg text-muted-foreground",
							children: "Your words, your photo, your moment. We'll make it beautiful."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "hero",
							size: "jumbo",
							className: "mt-9",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/create",
								children: "Create Your Proposal"
							})
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { HomePage as component };

import { i as __toESM } from "../_runtime.mjs";
import { i as QUESTION_SUGGESTIONS, l as validateProposal, n as LIMITS, o as STEP_FIELDS, r as PROPOSAL_THEMES, s as firstInvalidStep, u as validateStep } from "./proposal-CBUjNdQ0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useProposalDraft } from "./proposal-draft-qQiFsnRr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-Da0fYki4.mjs";
import { _ as Check, b as ArrowLeft, f as ImagePlus, m as Eye, n as WandSparkles, t as X, u as LoaderCircle, y as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as ProposalView } from "./ProposalView-BGnbrIph.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Navbar } from "./Navbar-D_bpvUPD.mjs";
import { t as Input } from "./input-O-wfW1oP.mjs";
import { t as Label$1 } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-v2r3vFH3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Label$1.displayName;
function Field({ id, label, hint, error, optional, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
					htmlFor: id,
					className: "text-sm font-semibold",
					children: [label, optional && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 font-normal text-muted-foreground",
						children: "(optional)"
					})]
				}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: hint
				})]
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-error`,
				role: "alert",
				className: "animate-fade-up text-sm text-destructive",
				children: error
			})
		]
	});
}
/** Downscale an image file to a JPEG data URL so it fits in browser storage. */
function compressImage(file, maxSize = 1e3, quality = .82) {
	return new Promise((resolve, reject) => {
		if (!file.type.startsWith("image/")) {
			reject(/* @__PURE__ */ new Error("Please choose an image file (JPG, PNG or WebP)."));
			return;
		}
		if (file.size > 10485760) {
			reject(/* @__PURE__ */ new Error("That photo is over 10 MB. Please pick a smaller one."));
			return;
		}
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = () => {
			const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.round(img.width * scale);
			canvas.height = Math.round(img.height * scale);
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("Couldn't process that photo."));
				return;
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", quality));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Couldn't read that photo. Try another one."));
		};
		img.src = url;
	});
}
function PhotoUpload({ value, onChange }) {
	const inputRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function handleFile(file) {
		if (!file) return;
		setError(null);
		setBusy(true);
		try {
			onChange(await compressImage(file));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Couldn't add that photo.");
		} finally {
			setBusy(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				id: "photo",
				type: "file",
				accept: "image/*",
				className: "sr-only",
				onChange: (e) => handleFile(e.target.files?.[0])
			}),
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-6 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: "Your uploaded couple photo",
					className: "aspect-[4/5] w-36 arch object-cover shadow-soft"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-center sm:text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: "Lovely choice."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "This photo will appear in an arch frame on your proposal."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-center gap-2 sm:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "soft",
								size: "sm",
								onClick: () => inputRef.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {}), " Change photo"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "quiet",
								size: "sm",
								onClick: () => onChange(null),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), " Remove"]
							})]
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => inputRef.current?.click(),
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragging(false);
					handleFile(e.dataTransfer.files?.[0]);
				},
				className: cn("flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-all duration-300", dragging ? "border-primary bg-secondary/50" : "border-input bg-card hover:border-primary/60 hover:bg-muted"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-14 place-items-center rounded-full bg-secondary text-primary",
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl",
						children: "Add a photo of you two"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "Drag it here or click to browse · JPG, PNG or WebP up to 10 MB"
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-destructive",
				children: error
			})
		]
	});
}
function StepIndicator({ steps, current, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex items-center gap-2",
		"aria-label": "Progress",
		children: steps.map((label, i) => {
			const done = i < current;
			const active = i === current;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-1 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(i),
					"aria-current": active ? "step" : void 0,
					className: cn("group flex items-center gap-2 rounded-full text-left text-xs font-medium transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-7 shrink-0 place-items-center rounded-full border text-xs transition-all duration-300", done && "border-primary bg-primary text-primary-foreground", active && "border-primary bg-secondary text-foreground shadow-glow", !done && !active && "border-border bg-card"),
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden md:inline",
						children: label
					})]
				}), i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-px flex-1 transition-colors duration-500", done ? "bg-primary" : "bg-border") })]
			}, label);
		})
	});
}
function ThemePicker({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": "Proposal theme",
		className: "grid grid-cols-2 gap-3",
		children: PROPOSAL_THEMES.map((theme) => {
			const selected = theme.id === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "radio",
				"aria-checked": selected,
				onClick: () => onChange(theme.id),
				className: cn("relative rounded-2xl border-2 p-1 text-left transition-all duration-300", selected ? "border-primary shadow-glow" : "border-transparent hover:-translate-y-0.5"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-theme": theme.id,
					className: "bg-proposal rounded-xl border border-border p-4 text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-4 rounded-full bg-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-4 rounded-full bg-secondary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-4 rounded-full border border-border bg-background" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-display text-xl leading-none",
							children: theme.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: theme.description
						})
					]
				}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
				})]
			}, theme.id);
		})
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var STEPS = [
	{
		label: "You two",
		title: "Let's start with the two of you",
		text: "Who is asking, and who is the lucky one?"
	},
	{
		label: "Photo",
		title: "Add a photo you both love",
		text: "A favourite moment together makes it unforgettable."
	},
	{
		label: "Message",
		title: "Say what's in your heart",
		text: "Write it the way you'd whisper it to them."
	},
	{
		label: "The question",
		title: "Set the mood & ask",
		text: "Choose a theme, then write your question."
	}
];
var inputClass = "h-12 rounded-xl bg-card px-4 text-base";
function CreatePage() {
	const { draft, update, step, setStep } = useProposalDraft();
	const navigate = useNavigate();
	const [errors, setErrors] = (0, import_react.useState)({});
	const isLast = step === STEPS.length - 1;
	function change(key, value) {
		update({ [key]: value });
		if (errors[key]) setErrors((e) => ({
			...e,
			[key]: void 0
		}));
	}
	function goTo(target) {
		if (target <= step) {
			setErrors({});
			setStep(target);
			return;
		}
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
			const stepErrors = {};
			for (const f of STEP_FIELDS[bad] ?? []) if (all[f]) stepErrors[f] = all[f];
			setErrors(stepErrors);
			return;
		}
		navigate({ to: "/preview" });
	}
	const current = STEPS[step] ?? STEPS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-romance min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[2rem] border border-border bg-card/80 p-6 shadow-soft sm:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIndicator, {
					steps: STEPS.map((s) => s.label),
					current: step,
					onSelect: goTo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					noValidate: true,
					onSubmit: (e) => {
						e.preventDefault();
						if (isLast) preview();
						else goTo(step + 1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-up mt-10 space-y-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "eyebrow",
									children: [
										"Step ",
										step + 1,
										" of ",
										STEPS.length
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-3 text-4xl sm:text-5xl",
									children: current.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-muted-foreground",
									children: current.text
								})
							] }),
							step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "yourName",
									label: "Your name",
									error: errors.yourName,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "yourName",
										autoFocus: true,
										value: draft.yourName,
										maxLength: LIMITS.nameMax,
										placeholder: "e.g. Daniel",
										"aria-invalid": !!errors.yourName,
										"aria-describedby": errors.yourName ? "yourName-error" : void 0,
										onChange: (e) => change("yourName", e.target.value),
										className: inputClass
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "partnerName",
									label: "Partner's name",
									error: errors.partnerName,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "partnerName",
										value: draft.partnerName,
										maxLength: LIMITS.nameMax,
										placeholder: "e.g. Emma",
										"aria-invalid": !!errors.partnerName,
										"aria-describedby": errors.partnerName ? "partnerName-error" : void 0,
										onChange: (e) => change("partnerName", e.target.value),
										className: inputClass
									})
								})]
							}),
							step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "photo",
								label: "Couple photo",
								optional: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoUpload, {
									value: draft.photo,
									onChange: (v) => change("photo", v)
								})
							}),
							step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								id: "message",
								label: "Your love message",
								error: errors.message,
								hint: `${draft.message.trim().length} / ${LIMITS.messageMax}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "message",
									autoFocus: true,
									rows: 8,
									value: draft.message,
									maxLength: LIMITS.messageMax,
									placeholder: "From the first moment I met you…",
									"aria-invalid": !!errors.message,
									"aria-describedby": errors.message ? "message-error" : void 0,
									onChange: (e) => change("message", e.target.value),
									className: "rounded-xl bg-card px-4 py-3 text-base leading-relaxed"
								}), !draft.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "soft",
									size: "sm",
									onClick: () => change("message", "From the first rainy afternoon we spent laughing in that tiny bookshop, I knew my life had quietly changed. You make ordinary Tuesdays feel like holidays, and every plan I make has you in it. I don't want to imagine a single tomorrow without your hand in mine."),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, {}), " Need inspiration? Use a sample"]
								})]
							}),
							step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "theme",
									label: "Proposal theme",
									error: errors.theme,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemePicker, {
										value: draft.theme,
										onChange: (v) => change("theme", v)
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
									id: "question",
									label: "Your main question",
									error: errors.question,
									hint: `${draft.question.trim().length} / ${LIMITS.questionMax}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "question",
										value: draft.question,
										maxLength: LIMITS.questionMax,
										"aria-invalid": !!errors.question,
										"aria-describedby": errors.question ? "question-error" : void 0,
										onChange: (e) => change("question", e.target.value),
										className: cn(inputClass, "font-display text-xl")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2 pt-1",
										children: QUESTION_SUGGESTIONS.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => change("question", q),
											className: cn("rounded-full border px-3 py-1.5 text-sm transition-colors", draft.question === q ? "border-primary bg-secondary text-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"),
											children: q
										}, q))
									})]
								})]
							})
						]
					}, step), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between",
						children: [step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "quiet",
							size: "lg",
							onClick: () => goTo(step - 1),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " Back"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "lg",
							className: "rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " Home"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col-reverse gap-3 sm:flex-row",
							children: [!isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "quiet",
								size: "lg",
								onClick: preview,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), " Preview proposal"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								variant: "hero",
								size: "xl",
								children: isLast ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), " Preview proposal"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})] })
							})]
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:sticky lg:top-24 lg:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Live preview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "Updates as you type"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalView, {
					proposal: draft,
					compact: true,
					interactive: false
				})]
			})]
		})]
	});
}
//#endregion
export { CreatePage as component };

import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-Da0fYki4.mjs";
import { p as Heart } from "../_libs/lucide-react.mjs";
import { t as ProposalView } from "./ProposalView-BGnbrIph.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./p._id-BwGcpKkG.mjs";
import { i as readShareLink, r as getProposal } from "./share-link--Y8LSWGe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._id-vcMUiBPg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProposalPage() {
	const { id } = Route.useParams();
	const [state, setState] = (0, import_react.useState)({ status: "loading" });
	(0, import_react.useEffect)(() => {
		let active = true;
		(id === "s" ? readShareLink(window.location.hash) : getProposal(id)).then((proposal) => {
			if (active) setState(proposal ? {
				status: "ready",
				proposal
			} : { status: "missing" });
		});
		return () => {
			active = false;
		};
	}, [id]);
	if (state.status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-proposal grid min-h-screen place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
			className: "size-8 animate-heartbeat fill-primary text-primary",
			"aria-label": "Loading"
		})
	});
	if (state.status === "missing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-romance grid min-h-screen place-items-center px-5 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mx-auto size-8 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 text-4xl sm:text-5xl",
					children: "We couldn't find this proposal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "The link may be incomplete — ask the sender to copy the whole link again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "hero",
						size: "xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/create",
							children: "Create a proposal"
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
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalView, {
		proposal: state.proposal,
		afterYes: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "soft",
			size: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Made with SayYes"
			})
		})
	});
}
//#endregion
export { ProposalPage as component };

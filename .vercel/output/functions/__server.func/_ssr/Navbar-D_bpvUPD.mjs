import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-Da0fYki4.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./Logo-DHGHbNJQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Navbar-D_bpvUPD.js
var import_jsx_runtime = require_jsx_runtime();
function Navbar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 glass",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/p/$id",
					params: { id: "sample" },
					className: "hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline",
					children: "See a sample"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "hero",
					size: "sm",
					className: "px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/create",
						children: "Create proposal"
					})
				})]
			})]
		})
	});
}
//#endregion
export { Navbar as t };

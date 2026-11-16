import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { p as Heart } from "../_libs/lucide-react.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-DHGHbNJQ.js
var import_jsx_runtime = require_jsx_runtime();
function Logo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "group inline-flex items-center gap-2",
		"aria-label": "SayYes home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-9 place-items-center rounded-full bg-secondary text-primary transition-transform duration-300 group-hover:scale-110",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4 fill-current" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display text-2xl font-semibold tracking-tight",
			children: ["Say", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
				className: "text-primary",
				children: "Yes"
			})]
		})]
	});
}
//#endregion
export { Logo as t };

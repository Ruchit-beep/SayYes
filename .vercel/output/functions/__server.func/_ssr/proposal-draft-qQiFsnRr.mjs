import { i as __toESM } from "../_runtime.mjs";
import { t as EMPTY_DRAFT } from "./proposal-CBUjNdQ0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/proposal-draft-qQiFsnRr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SESSION_KEY = "sayyes:draft";
var DraftContext = (0, import_react.createContext)(null);
function ProposalDraftProvider({ children }) {
	const [draft, setDraft] = (0, import_react.useState)(EMPTY_DRAFT);
	const [step, setStep] = (0, import_react.useState)(0);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.sessionStorage.getItem(SESSION_KEY);
			if (raw) setDraft({
				...EMPTY_DRAFT,
				...JSON.parse(raw)
			});
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(draft));
		} catch {}
	}, [draft, hydrated]);
	const update = (0, import_react.useCallback)((patch) => {
		setDraft((d) => ({
			...d,
			...patch
		}));
	}, []);
	const reset = (0, import_react.useCallback)(() => {
		setDraft(EMPTY_DRAFT);
		setStep(0);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		draft,
		update,
		reset,
		step,
		setStep,
		hydrated
	}), [
		draft,
		update,
		reset,
		step,
		hydrated
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DraftContext.Provider, {
		value,
		children
	});
}
function useProposalDraft() {
	const ctx = (0, import_react.useContext)(DraftContext);
	if (!ctx) throw new Error("useProposalDraft must be used inside ProposalDraftProvider");
	return ctx;
}
//#endregion
export { useProposalDraft as n, ProposalDraftProvider as t };

import { a as SAMPLE_MESSAGE, t as EMPTY_DRAFT } from "./proposal-CBUjNdQ0.mjs";
import { t as sample_couple_default } from "./sample-couple-D7_fgLQY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-link--Y8LSWGe.js
var SAMPLE_PROPOSAL = {
	id: "sample",
	createdAt: "2026-02-14T18:30:00.000Z",
	yourName: "Daniel",
	partnerName: "Emma",
	photo: sample_couple_default,
	message: SAMPLE_MESSAGE,
	theme: "blush",
	question: "Will you be mine?"
};
var API_URL = ({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_API_URL"] || "").replace(/\/$/, "");
/** True once the app is pointed at your online server. */
var HAS_SERVER = !!API_URL;
var LOCAL_KEY = "sayyes:proposals";
function readLocal() {
	try {
		return JSON.parse(window.localStorage.getItem(LOCAL_KEY) || "{}");
	} catch {
		return {};
	}
}
function saveLocal(draft) {
	const proposal = {
		...draft,
		id: Math.random().toString(36).slice(2, 10),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const all = readLocal();
	all[proposal.id] = proposal;
	try {
		window.localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
	} catch {
		throw new Error("Your photo is too large to save. Try a smaller one.");
	}
	return proposal;
}
async function saveProposal(draft) {
	try {
		return await saveRemote(draft);
	} catch (e) {
		if (e instanceof TypeError) return saveLocal(draft);
		throw e;
	}
}
async function saveRemote(draft) {
	const response = await fetch(`${API_URL}/api/proposals`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			proposerName: draft.yourName,
			partnerName: draft.partnerName,
			message: draft.message,
			question: draft.question,
			theme: draft.theme,
			photoUrl: draft.photo || ""
		})
	});
	const data = await response.json();
	if (!response.ok || !data.success) throw new Error(data.message || "Could not create proposal.");
	return {
		...draft,
		id: data.proposal.slug,
		createdAt: data.proposal.createdAt
	};
}
async function getProposal(id) {
	if (id === SAMPLE_PROPOSAL.id) return SAMPLE_PROPOSAL;
	const local = readLocal()[id];
	if (local) return local;
	let response;
	try {
		response = await fetch(`${API_URL}/api/proposals/${encodeURIComponent(id)}`);
	} catch {
		return null;
	}
	if (response.status === 404) return null;
	if (!response.ok) throw new Error("Unable to load proposal.");
	const saved = (await response.json()).proposal;
	return {
		yourName: saved.proposerName,
		partnerName: saved.partnerName,
		message: saved.message,
		question: saved.question,
		theme: saved.theme,
		photo: saved.photoUrl || "",
		id: saved.slug,
		createdAt: saved.createdAt
	};
}
function toB64Url(bytes) {
	let bin = "";
	for (const b of bytes) bin += String.fromCharCode(b);
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64Url(s) {
	const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
	return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
async function pipe(bytes, stream) {
	const out = new Blob([bytes]).stream().pipeThrough(stream);
	return new Uint8Array(await new Response(out).arrayBuffer());
}
async function createShareLink(draft, origin) {
	const { yourName, partnerName, message, theme, question } = draft;
	const json = JSON.stringify([
		yourName,
		partnerName,
		message,
		theme,
		question
	]);
	return `${origin}/p/s#${toB64Url(await pipe(new TextEncoder().encode(json), new CompressionStream("deflate-raw")))}`;
}
async function readShareLink(hash) {
	const data = hash.replace(/^#/, "");
	if (!data) return null;
	try {
		const bytes = await pipe(fromB64Url(data), new DecompressionStream("deflate-raw"));
		const [yourName, partnerName, message, theme, question] = JSON.parse(new TextDecoder().decode(bytes));
		return {
			...EMPTY_DRAFT,
			yourName,
			partnerName,
			message,
			theme,
			question,
			photo: null,
			id: "s",
			createdAt: ""
		};
	} catch {
		return null;
	}
}
//#endregion
export { saveProposal as a, readShareLink as i, createShareLink as n, getProposal as r, HAS_SERVER as t };

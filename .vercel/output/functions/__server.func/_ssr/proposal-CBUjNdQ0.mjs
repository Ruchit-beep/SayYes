//#region node_modules/.nitro/vite/services/ssr/assets/proposal-CBUjNdQ0.js
var PROPOSAL_THEMES = [
	{
		id: "blush",
		name: "Blush",
		description: "Soft pink on warm ivory"
	},
	{
		id: "midnight",
		name: "Midnight Rose",
		description: "Candlelit and intimate"
	},
	{
		id: "garden",
		name: "Garden",
		description: "Fresh sage and cream"
	},
	{
		id: "golden",
		name: "Golden Hour",
		description: "Warm peach and amber"
	}
];
var QUESTION_SUGGESTIONS = [
	"Will you be mine?",
	"Will you marry me?",
	"Will you be my Valentine?",
	"Will you move in with me?"
];
var LIMITS = {
	nameMax: 40,
	messageMin: 20,
	messageMax: 600,
	questionMax: 80
};
var EMPTY_DRAFT = {
	yourName: "",
	partnerName: "",
	photo: null,
	message: "",
	theme: "blush",
	question: "Will you be mine?"
};
var SAMPLE_MESSAGE = "From the first rainy afternoon we spent laughing in that tiny bookshop, I knew my life had quietly changed. You make ordinary Tuesdays feel like holidays, and every plan I make has you in it. I don't want to imagine a single tomorrow without your hand in mine.";
/** Fields validated on each step of the creator, in order. */
var STEP_FIELDS = [
	["yourName", "partnerName"],
	["photo"],
	["message"],
	["theme", "question"]
];
function validateProposal(draft) {
	const errors = {};
	const yourName = draft.yourName.trim();
	const partnerName = draft.partnerName.trim();
	const message = draft.message.trim();
	const question = draft.question.trim();
	if (!yourName) errors.yourName = "Please tell us your name.";
	else if (yourName.length > LIMITS.nameMax) errors.yourName = `Keep it under ${LIMITS.nameMax} characters.`;
	if (!partnerName) errors.partnerName = "Who is this proposal for?";
	else if (partnerName.length > LIMITS.nameMax) errors.partnerName = `Keep it under ${LIMITS.nameMax} characters.`;
	if (!message) errors.message = "Your love message is the heart of the proposal.";
	else if (message.length < LIMITS.messageMin) errors.message = `Write at least ${LIMITS.messageMin} characters — say a little more.`;
	else if (message.length > LIMITS.messageMax) errors.message = `Keep it under ${LIMITS.messageMax} characters.`;
	if (!PROPOSAL_THEMES.some((t) => t.id === draft.theme)) errors.theme = "Choose a theme.";
	if (!question) errors.question = "Ask your question.";
	else if (question.length > LIMITS.questionMax) errors.question = `Keep it under ${LIMITS.questionMax} characters.`;
	return errors;
}
function validateStep(draft, step) {
	const all = validateProposal(draft);
	const fields = STEP_FIELDS[step] ?? [];
	const errors = {};
	for (const field of fields) if (all[field]) errors[field] = all[field];
	return errors;
}
function firstInvalidStep(draft) {
	const all = validateProposal(draft);
	return STEP_FIELDS.findIndex((fields) => fields.some((f) => all[f]));
}
function isComplete(draft) {
	return Object.keys(validateProposal(draft)).length === 0;
}
//#endregion
export { SAMPLE_MESSAGE as a, isComplete as c, QUESTION_SUGGESTIONS as i, validateProposal as l, LIMITS as n, STEP_FIELDS as o, PROPOSAL_THEMES as r, firstInvalidStep as s, EMPTY_DRAFT as t, validateStep as u };

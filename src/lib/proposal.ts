/**
 * Proposal domain model, themes and validation rules.
 * Shared by the creator, preview and recipient pages, and shaped so the same
 * object can be sent to / received from the Node + Express API later.
 */

export type ProposalThemeId = "blush" | "midnight" | "garden" | "golden";

export interface ProposalDraft {
  yourName: string;
  partnerName: string;
  /** Compressed image as a data URL (or a remote URL once a backend stores uploads). */
  photo: string | null;
  message: string;
  theme: ProposalThemeId;
  question: string;
}

export interface Proposal extends ProposalDraft {
  id: string;
  createdAt: string;
}

export interface ProposalTheme {
  id: ProposalThemeId;
  name: string;
  description: string;
}

export const PROPOSAL_THEMES: ProposalTheme[] = [
  { id: "blush", name: "Blush", description: "Soft pink on warm ivory" },
  { id: "midnight", name: "Midnight Rose", description: "Candlelit and intimate" },
  { id: "garden", name: "Garden", description: "Fresh sage and cream" },
  { id: "golden", name: "Golden Hour", description: "Warm peach and amber" },
];

export const QUESTION_SUGGESTIONS = [
  "Will you be mine?",
  "Will you marry me?",
  "Will you be my Valentine?",
  "Will you move in with me?",
];

export const LIMITS = {
  nameMax: 40,
  messageMin: 20,
  messageMax: 600,
  questionMax: 80,
} as const;

export const EMPTY_DRAFT: ProposalDraft = {
  yourName: "",
  partnerName: "",
  photo: null,
  message: "",
  theme: "blush",
  question: "Will you be mine?",
};

export const SAMPLE_MESSAGE =
  "From the first rainy afternoon we spent laughing in that tiny bookshop, I knew my life had quietly changed. You make ordinary Tuesdays feel like holidays, and every plan I make has you in it. I don't want to imagine a single tomorrow without your hand in mine.";

export type ProposalErrors = { [K in keyof ProposalDraft]?: string | undefined };

/** Fields validated on each step of the creator, in order. */
export const STEP_FIELDS: (keyof ProposalDraft)[][] = [
  ["yourName", "partnerName"],
  ["photo"],
  ["message"],
  ["theme", "question"],
];

export function validateProposal(draft: ProposalDraft): ProposalErrors {
  const errors: ProposalErrors = {};
  const yourName = draft.yourName.trim();
  const partnerName = draft.partnerName.trim();
  const message = draft.message.trim();
  const question = draft.question.trim();

  if (!yourName) errors.yourName = "Please tell us your name.";
  else if (yourName.length > LIMITS.nameMax)
    errors.yourName = `Keep it under ${LIMITS.nameMax} characters.`;

  if (!partnerName) errors.partnerName = "Who is this proposal for?";
  else if (partnerName.length > LIMITS.nameMax)
    errors.partnerName = `Keep it under ${LIMITS.nameMax} characters.`;

  if (!message) errors.message = "Your love message is the heart of the proposal.";
  else if (message.length < LIMITS.messageMin)
    errors.message = `Write at least ${LIMITS.messageMin} characters — say a little more.`;
  else if (message.length > LIMITS.messageMax)
    errors.message = `Keep it under ${LIMITS.messageMax} characters.`;

  if (!PROPOSAL_THEMES.some((t) => t.id === draft.theme)) errors.theme = "Choose a theme.";

  if (!question) errors.question = "Ask your question.";
  else if (question.length > LIMITS.questionMax)
    errors.question = `Keep it under ${LIMITS.questionMax} characters.`;

  return errors;
}

export function validateStep(draft: ProposalDraft, step: number): ProposalErrors {
  const all = validateProposal(draft);
  const fields = STEP_FIELDS[step] ?? [];
  const errors: ProposalErrors = {};
  for (const field of fields) if (all[field]) errors[field] = all[field];
  return errors;
}

export function firstInvalidStep(draft: ProposalDraft): number {
  const all = validateProposal(draft);
  return STEP_FIELDS.findIndex((fields) => fields.some((f) => all[f]));
}

export function isComplete(draft: ProposalDraft): boolean {
  return Object.keys(validateProposal(draft)).length === 0;
}

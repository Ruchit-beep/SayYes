
import type { Proposal, ProposalDraft } from "./proposal";
import { SAMPLE_PROPOSAL } from "./sample-proposal";

const API_URL = ((import.meta.env["VITE_API_URL"] as string | undefined) || "").replace(/\/$/, "");

/** True once the app is pointed at your online server. */
export const HAS_SERVER = !!API_URL;

const LOCAL_KEY = "sayyes:proposals";

function readLocal(): Record<string, Proposal> {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveLocal(draft: ProposalDraft): Proposal {
  const proposal: Proposal = {
    ...draft,
    id: Math.random().toString(36).slice(2, 10),
    createdAt: new Date().toISOString(),
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

export async function saveProposal(
  draft: ProposalDraft
): Promise<Proposal> {
  try {
    return await saveRemote(draft);
  } catch (e) {
    // Server unreachable (e.g. not running / not deployed): keep it in this browser.
    if (e instanceof TypeError) return saveLocal(draft);
    throw e;
  }
}

async function saveRemote(
  draft: ProposalDraft
): Promise<Proposal> {
  const response = await fetch(`${API_URL}/api/proposals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      proposerName: draft.yourName,
      partnerName: draft.partnerName,
      message: draft.message,
      question: draft.question,
      theme: draft.theme,
      photoUrl: draft.photo || "",
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Could not create proposal.");
  }

  return {
    ...draft,
    id: data.proposal.slug,
    createdAt: data.proposal.createdAt,
  };
}

export async function getProposal(
  id: string
): Promise<Proposal | null> {
  if (id === SAMPLE_PROPOSAL.id) {
    return SAMPLE_PROPOSAL;
  }

  const local = readLocal()[id];
  if (local) return local;

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/proposals/${encodeURIComponent(id)}`);
  } catch {
    return null;
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load proposal.");
  }

  const data = await response.json();
  const saved = data.proposal;

  return {
    yourName: saved.proposerName,
    partnerName: saved.partnerName,
    message: saved.message,
    question: saved.question,
    theme: saved.theme,
    photo: saved.photoUrl || "",
    id: saved.slug,
    createdAt: saved.createdAt,
  };
}

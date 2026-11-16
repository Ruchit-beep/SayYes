/**
 * Encodes a whole proposal into a link (`/p/s#<data>`) so it opens on any device
 * without a server. The photo is shrunk to a small thumbnail to keep links short.
 */
import { EMPTY_DRAFT, type Proposal, type ProposalDraft } from "./proposal";

export const SHARE_ID = "s";

function toB64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64Url(s: string): Uint8Array {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream) {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

export async function createShareLink(draft: ProposalDraft, origin: string): Promise<string> {
  // Photos are left out: even a tiny one makes the link thousands of characters long.
  const { yourName, partnerName, message, theme, question } = draft;
  const json = JSON.stringify([yourName, partnerName, message, theme, question]);
  const packed = await pipe(new TextEncoder().encode(json), new CompressionStream("deflate-raw"));
  return `${origin}/p/${SHARE_ID}#${toB64Url(packed)}`;
}

export async function readShareLink(hash: string): Promise<Proposal | null> {
  const data = hash.replace(/^#/, "");
  if (!data) return null;
  try {
    const bytes = await pipe(fromB64Url(data), new DecompressionStream("deflate-raw"));
    const [yourName, partnerName, message, theme, question] = JSON.parse(new TextDecoder().decode(bytes));
    return { ...EMPTY_DRAFT, yourName, partnerName, message, theme, question, photo: null, id: SHARE_ID, createdAt: "" };
  } catch {
    return null;
  }
}

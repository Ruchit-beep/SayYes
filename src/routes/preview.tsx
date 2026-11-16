import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy, ExternalLink, Heart, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { ProposalView } from "@/components/proposal/ProposalView";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProposalDraft } from "@/context/proposal-draft";
import { isComplete } from "@/lib/proposal";
import { createShareLink } from "@/lib/share-link";
import { HAS_SERVER, saveProposal } from "@/lib/proposal-store";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "Preview your proposal · SayYes" },
      { name: "description", content: "See your proposal exactly as your partner will, then share it." },
      { property: "og:title", content: "Preview your proposal · SayYes" },
      { property: "og:description", content: "See your proposal exactly as your partner will." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const { draft, hydrated } = useProposalDraft();
  const [sharing, setSharing] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Heart className="size-8 animate-heartbeat fill-primary text-primary" />
      </div>
    );
  }

  if (!isComplete(draft)) {
    return (
      <div className="bg-romance grid min-h-screen place-items-center px-5 text-center">
        <div className="max-w-md">
          <Heart className="mx-auto size-8 fill-primary text-primary" />
          <h1 className="mt-5 text-4xl sm:text-5xl">Nothing to preview yet</h1>
          <p className="mt-3 text-muted-foreground">
            Add your names, a love message and your question first — then come back to see it come to
            life.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <Link to="/create">Start creating</Link>
          </Button>
        </div>
      </div>
    );
  }

  async function share() {
    setSharing(true);
    try {
      if (HAS_SERVER) {
        const saved = await saveProposal(draft);
        setLink(`${window.location.origin}/p/${saved.id}`);
      } else {
        setLink(await createShareLink(draft, window.location.origin));
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't create your link. Please try again.");
    } finally {
      setSharing(false);
    }
  }

  async function copy() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied — send it with love.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy automatically. Select the link and copy it.");
    }
  }

  return (
    <div>
      <header className="glass fixed inset-x-0 top-0 z-40 border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex">
              <Logo />
            </span>
            <Button asChild variant="quiet" size="sm" className="px-4">
              <Link to="/create">
                <ArrowLeft /> Back to edit
              </Link>
            </Button>
          </div>
          <p className="hidden text-sm text-muted-foreground md:block">
            Preview · exactly what {draft.partnerName.trim()} will see
          </p>
          <Button variant="hero" size="sm" className="px-4" onClick={share} disabled={sharing}>
            {sharing ? <Loader2 className="animate-spin" /> : <Send />} Share proposal
          </Button>
        </div>
      </header>

      <ProposalView proposal={draft} />

      <Dialog open={!!link} onOpenChange={(open) => !open && setLink(null)}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl">Your proposal is ready</DialogTitle>
            <DialogDescription>
              Send this link to {draft.partnerName.trim()} whenever the moment feels right.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Input readOnly value={link ?? ""} onFocus={(e) => e.target.select()} className="h-11 rounded-xl" />
            <Button variant="hero" size="icon" className="size-11 shrink-0" onClick={copy} aria-label="Copy link">
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Copy the whole link — the proposal is tucked inside it, so it opens on any device.
          </p>
          {link && (
            <Button asChild variant="soft" size="lg">
              <a href={link} target="_blank" rel="noreferrer">
                <ExternalLink /> Open proposal
              </a>
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

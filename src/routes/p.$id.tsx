import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProposalView } from "@/components/proposal/ProposalView";
import { Button } from "@/components/ui/button";
import type { Proposal } from "@/lib/proposal";
import { getProposal } from "@/lib/proposal-store";
import { readShareLink, SHARE_ID } from "@/lib/share-link";

export const Route = createFileRoute("/p/$id")({
  head: () => ({
    meta: [
      { title: "A question, just for you · SayYes" },
      { name: "description", content: "Someone who loves you made this page for you. Open it when you're ready." },
      { property: "og:title", content: "A question, just for you 💌" },
      { property: "og:description", content: "Someone who loves you made this page for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProposalPage,
});

type State = { status: "loading" } | { status: "missing" } | { status: "ready"; proposal: Proposal };

function ProposalPage() {
  const { id } = Route.useParams();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let active = true;
    (id === SHARE_ID ? readShareLink(window.location.hash) : getProposal(id)).then((proposal) => {
      if (active) setState(proposal ? { status: "ready", proposal } : { status: "missing" });
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (state.status === "loading") {
    return (
      <div className="bg-proposal grid min-h-screen place-items-center">
        <Heart className="size-8 animate-heartbeat fill-primary text-primary" aria-label="Loading" />
      </div>
    );
  }

  if (state.status === "missing") {
    return (
      <div className="bg-romance grid min-h-screen place-items-center px-5 text-center">
        <div className="max-w-md">
          <Heart className="mx-auto size-8 text-primary" />
          <h1 className="mt-5 text-4xl sm:text-5xl">We couldn't find this proposal</h1>
          <p className="mt-3 text-muted-foreground">
            The link may be incomplete — ask the sender to copy the whole link again.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/create">Create a proposal</Link>
            </Button>
            <Button asChild variant="quiet" size="xl">
              <Link to="/p/$id" params={{ id: "sample" }}>
                See a sample
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProposalView
      proposal={state.proposal}
      afterYes={
        <Button asChild variant="soft" size="lg">
          <Link to="/">Made with SayYes</Link>
        </Button>
      }
    />
  );
}

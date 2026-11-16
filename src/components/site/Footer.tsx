import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xs space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Beautiful proposal pages for the moments you'll remember forever.
          </p>
        </div>
        <div className="flex gap-8 text-sm">
          <Link to="/create" className="text-muted-foreground transition-colors hover:text-foreground">
            Create a proposal
          </Link>
          <Link
            to="/p/$id"
            params={{ id: "sample" }}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            See a sample
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto flex max-w-6xl items-center gap-1.5 px-5 py-5 text-xs text-muted-foreground sm:px-8">
          © 2026 SayYes · Made with <Heart className="size-3 fill-primary text-primary" /> for every
          brave heart
        </p>
      </div>
    </footer>
  );
}

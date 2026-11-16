import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/p/$id"
            params={{ id: "sample" }}
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            See a sample
          </Link>
          <Button asChild variant="hero" size="sm" className="px-4">
            <Link to="/create">Create proposal</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

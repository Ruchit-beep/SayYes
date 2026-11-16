import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-2" aria-label="SayYes home">
      <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary transition-transform duration-300 group-hover:scale-110">
        <Heart className="size-4 fill-current" />
      </span>
      <span className="font-display text-2xl font-semibold tracking-tight">
        Say<em className="text-primary">Yes</em>
      </span>
    </Link>
  );
}

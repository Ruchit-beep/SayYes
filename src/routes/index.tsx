import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Heart, Link2, MessageCircleHeart, Palette, PartyPopper, PenLine, Send, Sparkles } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";
import samplePhoto from "@/assets/sample-couple.jpg";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Button } from "@/components/ui/button";
import { SAMPLE_MESSAGE } from "@/lib/proposal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SayYes — Create a romantic proposal page" },
      {
        name: "description",
        content:
          "Turn your feelings into a beautiful proposal page with your photo, your words and one unforgettable question. Share it with a single link.",
      },
      { property: "og:title", content: "SayYes — Some moments deserve something special" },
      {
        property: "og:description",
        content: "Create a personal, romantic proposal page and share it with the one you love.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const STEPS = [
  {
    icon: PenLine,
    title: "Tell your story",
    text: "Add both your names, a favourite photo and the words you've been holding in your heart.",
  },
  {
    icon: Palette,
    title: "Make it yours",
    text: "Pick a theme that feels like you two and write the question you've been waiting to ask.",
  },
  {
    icon: Send,
    title: "Share the link",
    text: "Preview every detail, then send your private link — and wait for the sweetest yes.",
  },
];

const FEATURES = [
  { icon: Camera, title: "Your photo, beautifully framed", text: "Your favourite picture together, set in a soft arch frame." },
  { icon: MessageCircleHeart, title: "Words from the heart", text: "A love letter layout that makes every sentence feel special." },
  { icon: Palette, title: "Four romantic themes", text: "Blush, Midnight Rose, Garden or Golden Hour — switch anytime." },
  { icon: Heart, title: "A playful “No” button", text: "It shyly slips away… but never stops them from choosing." },
  { icon: PartyPopper, title: "A celebration to remember", text: "Hearts and confetti burst the moment they say yes." },
  { icon: Link2, title: "One private link", text: "Share it by text, email or a note slipped into their pocket." },
];

function HomePage() {
  return (
    <div className="bg-romance min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="eyebrow animate-fade-up">Proposal pages, made with love</p>
            <h1 className="animate-fade-up mt-5 text-5xl leading-[1.02] [animation-delay:100ms] sm:text-6xl lg:text-7xl">
              Some moments deserve <em className="text-gradient-rose">something special.</em>
            </h1>
            <p className="animate-fade-up mx-auto mt-6 max-w-lg text-lg text-muted-foreground [animation-delay:200ms] lg:mx-0">
              SayYes turns your feelings into a beautiful, personal proposal page — your photo, your
              words and one unforgettable question, shared with a single link.
            </p>
            <div className="animate-fade-up mt-9 flex flex-col items-center gap-3 [animation-delay:300ms] sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild variant="hero" size="jumbo">
                <Link to="/create">
                  <Heart className="fill-current" /> Create Your Proposal
                </Link>
              </Button>
              <Button asChild variant="quiet" size="xl">
                <Link to="/p/$id" params={{ id: "sample" }}>
                  See a sample
                </Link>
              </Button>
            </div>
            <p className="animate-fade-up mt-6 text-sm text-muted-foreground [animation-delay:400ms]">
              Ready in about three minutes · Preview before you share
            </p>
          </div>

          <div className="animate-fade-up relative mx-auto w-full max-w-md [animation-delay:200ms]">
            <div className="arch absolute -inset-4 -z-10 bg-secondary/40 blur-2xl" />
            <img
              src={heroIllustration}
              alt="Watercolour illustration of a couple holding hands under an arch of pink peonies"
              width={1024}
              height={1152}
              style={{ "--arch-ratio": 0.889, "--arch-base": "2.5rem" } as React.CSSProperties}
              className="w-full arch border border-border object-cover shadow-lift"
            />
            <div className="glass animate-float absolute -left-4 top-1/3 rounded-2xl border border-border px-4 py-3 shadow-soft sm:-left-10">
              <p className="font-display text-lg italic leading-none">Will you be mine?</p>
            </div>
            <div
              className="glass animate-float-slow absolute -right-3 bottom-16 flex items-center gap-2 rounded-full border border-border px-4 py-2 shadow-soft sm:-right-8"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
                <Heart className="size-3.5 fill-current" />
              </span>
              <span className="text-sm font-semibold">She said yes!</span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border/60 bg-card/60 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="mx-auto max-w-xl text-center">
              <p className="eyebrow">How it works</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Three gentle steps to forever</h2>
            </div>
            <ol className="mt-14 grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative rounded-3xl border border-border bg-background p-8 shadow-soft">
                  <span className="absolute right-7 top-6 font-display text-6xl leading-none text-secondary">
                    {i + 1}
                  </span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
                    <step.icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-2xl">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Every detail, considered</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Made for the moment you'll never forget</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-2xl">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Sample teaser */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="bg-proposal grid items-center gap-10 overflow-hidden rounded-[2.5rem] border border-border p-8 shadow-soft sm:p-12 md:grid-cols-[auto_1fr]">
            <img
              src={samplePhoto}
              alt="Emma and Daniel embracing in a flower field at sunset"
              width={896}
              height={1120}
              loading="lazy"
              className="mx-auto aspect-[4/5] w-48 arch object-cover shadow-lift sm:w-56"
            />
            <div className="text-center md:text-left">
              <p className="eyebrow">A real-feeling example</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">
                Daniel's proposal to <em className="text-primary">Emma</em>
              </h2>
              <p className="mt-5 font-display text-xl italic text-foreground/85 sm:text-2xl">
                “{SAMPLE_MESSAGE.split(". ")[0]}.”
              </p>
              <Button asChild variant="hero" size="xl" className="mt-8">
                <Link to="/p/$id" params={{ id: "sample" }}>
                  <Sparkles /> Open the sample proposal
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-3xl px-5 pb-28 text-center sm:px-8">
          <Heart className="mx-auto size-8 animate-heartbeat fill-primary text-primary" />
          <h2 className="mt-6 text-4xl sm:text-6xl">Ready to ask the question?</h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
            Your words, your photo, your moment. We'll make it beautiful.
          </p>
          <Button asChild variant="hero" size="jumbo" className="mt-9">
            <Link to="/create">Create Your Proposal</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

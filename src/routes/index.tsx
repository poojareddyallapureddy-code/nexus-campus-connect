import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Lightbulb,
  Rocket,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexus — Stay in the loop. Stay connected." },
      {
        name: "description",
        content:
          "Nexus is the student platform to discover opportunities, connect with teammates and mentors, and act on deadlines before they pass.",
      },
      { property: "og:title", content: "Nexus — Stay in the loop. Stay connected." },
      {
        property: "og:description",
        content:
          "Discover opportunities, connect with the right people, and use the resources around you.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { title: "DISCOVER", icon: Compass, text: "Find opportunities beyond the classroom." },
  { title: "CONNECT", icon: Users, text: "Find students, teammates, mentors and clubs." },
  { title: "UTILIZE", icon: Wrench, text: "Make use of expertise and resources already available." },
  { title: "ACT", icon: Rocket, text: "Turn information into participation and results." },
];

const flow = ["Opportunity", "Student", "Team", "Resource", "Action"];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/40">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold">Nexus</span>
        </div>
        <Link
          to="/app"
          className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          Continue as Student
        </Link>
      </header>

      <section
        className="relative overflow-hidden px-6 pb-20 pt-14"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-muted-foreground">
            <span className="nexus-live-dot h-1.5 w-1.5 rounded-full bg-cyan" />
            A student opportunity ecosystem
          </span>
          <h1 className="mt-6 text-5xl font-semibold sm:text-7xl">
            <span className="gradient-text">Nexus</span>
          </h1>
          <p className="mt-3 text-lg text-foreground/90">Stay in the loop. Stay connected.</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            One platform to discover opportunities, connect with the right people, and make better
            use of the resources around you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Explore Nexus <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-medium transition-colors hover:border-cyan/50"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            {flow.map((f, i) => (
              <span key={f} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-card/70 px-3 py-1.5 text-foreground/90">
                  {f}
                </span>
                {i < flow.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-primary" /> : null}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-10 px-6 pb-24">
        <h2 className="text-center text-2xl font-semibold sm:text-3xl">
          Discover → Connect → Utilize → Act
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
          Nexus is not a notification feed. Every piece of information is attached to something you
          can actually do next.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6 transition-colors hover:border-primary/40">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <f.icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold tracking-[0.14em] text-cyan">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="glass-card mt-12 flex flex-wrap items-center justify-between gap-6 p-8">
          <div>
            <h3 className="text-xl font-semibold">Demo entry</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Aarav Sharma · CSE - AIML · 2nd Year
            </p>
          </div>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            <Lightbulb className="h-4 w-4" /> Continue as Student
          </Link>
        </div>
      </section>
    </div>
  );
}

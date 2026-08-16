import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Lightbulb,
  MessageSquareQuote,
  Search,
  Share2,
  Users,
} from "lucide-react";
import { DeadlineTicker } from "@/components/nexus/ticker";
import { ReminderList } from "@/components/nexus/reminder-list";
import { Chip, GlassCard } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNexus } from "@/lib/nexus-store";
import { academicUpdates, opportunities } from "@/lib/nexus-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Nexus Dashboard — Opportunities, Deadlines & Reminders" },
      {
        name: "description",
        content:
          "Your student dashboard: live deadlines, reminders, campus updates and opportunities in one place.",
      },
      { property: "og:title", content: "Nexus Dashboard" },
      {
        property: "og:description",
        content: "Live deadlines, reminders and opportunities for college students.",
      },
    ],
  }),
  component: DashboardPage,
});

const quickActions = [
  { label: "Find Opportunities", icon: Compass, to: "/app/opportunities" as const },
  { label: "Find Teammates", icon: Users, to: "/app/teams" as const },
  { label: "Share an Opportunity", icon: Share2, to: "/app/opportunities" as const },
  { label: "Ask for Guidance", icon: MessageSquareQuote, to: "/app/experts" as const },
  { label: "Submit an Idea", icon: Lightbulb, to: "/app/rnd" as const },
];

function DashboardPage() {
  const { profile, reminders } = useNexus();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return opportunities
      .filter((o) => (o.name + o.category + o.skills.join(" ")).toLowerCase().includes(s))
      .slice(0, 4);
  }, [q]);

  return (
    <div className="space-y-8">
      <div className="nexus-enter">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Good morning, {profile.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Stay in the loop. Stay connected.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/app/search", search: { q } });
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search opportunities, clubs, people, resources..."
          className="h-12 rounded-xl border-border bg-card/70 pl-11 text-sm"
        />
        {suggestions.length > 0 ? (
          <div className="glass-card absolute inset-x-0 top-14 z-20 overflow-hidden p-0">
            {suggestions.map((o) => (
              <Link
                key={o.id}
                to="/app/opportunities/$id"
                params={{ id: o.id }}
                className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm transition-colors last:border-0 hover:bg-secondary/60"
              >
                <Chip tone="indigo">{o.category}</Chip>
                <span className="truncate">{o.name}</span>
              </Link>
            ))}
            <button
              type="submit"
              className="w-full px-4 py-3 text-left text-xs text-cyan hover:bg-secondary/60"
            >
              See all results for "{q}"
            </button>
          </div>
        ) : null}
      </form>

      <DeadlineTicker />

      <div className="flex flex-wrap gap-2">
        {quickActions.map((a) => (
          <Button key={a.label} variant="secondary" asChild className="rounded-full">
            <Link to={a.to}>
              <a.icon className="h-4 w-4 text-primary" />
              {a.label}
            </Link>
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">🔔 Recent Reminders</h2>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/app/reminders">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ReminderList limitPerGroup={2} />
        </GlassCard>

        <div className="space-y-4">
          <GlassCard>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">This week</p>
            <p className="mt-2 text-3xl font-semibold text-primary">{reminders.length}</p>
            <p className="text-sm text-muted-foreground">active reminders</p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Open now</p>
            <p className="mt-2 text-3xl font-semibold text-cyan">{opportunities.length}</p>
            <p className="text-sm text-muted-foreground">opportunities to act on</p>
            <Button size="sm" variant="outline" className="mt-3 w-full" asChild>
              <Link to="/app/opportunities">Discover</Link>
            </Button>
          </GlassCard>
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Important Updates</h2>
          <Button size="sm" variant="ghost" asChild>
            <Link to="/app/academic">
              All updates <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {academicUpdates.slice(0, 4).map((u) => (
            <GlassCard key={u.id}>
              <div className="flex items-center gap-2">
                <Chip tone="indigo">{u.category}</Chip>
                <span className="text-xs text-muted-foreground">{u.date}</span>
                {u.deadline ? <Chip tone="warning">Due {u.deadline}</Chip> : null}
              </div>
              <h3 className="mt-2 text-base font-semibold">{u.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Source: {u.source}</p>
              <p className="mt-2 text-sm text-muted-foreground">{u.description}</p>
              <Button size="sm" className="mt-4" asChild>
                <Link to="/app/academic/$id" params={{ id: u.id }}>
                  View Details
                </Link>
              </Button>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}

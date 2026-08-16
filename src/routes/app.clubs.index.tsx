import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, UserRound, Users } from "lucide-react";
import { Chip, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clubs } from "@/lib/nexus-data";
import { useNexus } from "@/lib/nexus-store";

export const Route = createFileRoute("/app/clubs/")({
  head: () => ({
    meta: [
      { title: "Club Directory — Nexus" },
      {
        name: "description",
        content: "Browse campus clubs, their leadership, members and upcoming events, then join.",
      },
      { property: "og:title", content: "Club Directory — Nexus" },
      { property: "og:description", content: "Every campus club, searchable, with events and contacts." },
    ],
  }),
  component: ClubsPage,
});

function ClubsPage() {
  const [q, setQ] = useState("");
  const { joinedClubs } = useNexus();
  const list = clubs.filter((c) =>
    (c.name + c.category + c.president).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <PageHeader title="Clubs" subtitle="Find a community that matches what you want to build." />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search clubs..."
        className="mb-6 max-w-md border-border bg-card/60"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((c) => (
          <GlassCard key={c.id}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <Chip tone="indigo">{c.category}</Chip>
                <h3 className="mt-2 text-base font-semibold">{c.name}</h3>
              </div>
              {joinedClubs.includes(c.id) ? <Chip tone="success">Joined</Chip> : null}
            </div>
            <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <p className="inline-flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5 text-cyan" /> President: {c.president}
              </p>
              <p className="inline-flex items-center gap-1.5">
                <UserRound className="h-3.5 w-3.5 text-primary" /> Faculty: {c.faculty}
              </p>
              <p className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" /> {c.members} members
              </p>
              <p className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-warning" /> {c.upcomingEvent}
              </p>
            </div>
            <Button size="sm" className="mt-4" asChild>
              <Link to="/app/clubs/$id" params={{ id: c.id }}>
                View Club
              </Link>
            </Button>
          </GlassCard>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="glass-card p-10 text-center text-sm text-muted-foreground">
          No clubs match that search.
        </p>
      ) : null}
    </div>
  );
}

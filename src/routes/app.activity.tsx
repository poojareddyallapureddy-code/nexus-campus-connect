import { createFileRoute, Link } from "@tanstack/react-router";
import { Chip, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { ReminderList } from "@/components/nexus/reminder-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { certifications, clubs, opportunities } from "@/lib/nexus-data";
import { useNexus } from "@/lib/nexus-store";

export const Route = createFileRoute("/app/activity")({
  head: () => ({
    meta: [
      { title: "My Activity — Nexus" },
      {
        name: "description",
        content:
          "Saved opportunities, registrations, team requests, submitted ideas and mentorship requests in one place.",
      },
      { property: "og:title", content: "My Activity — Nexus" },
      { property: "og:description", content: "Everything you saved, joined, submitted and registered for." },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  const { saved, registered, joinedTeams, joinedClubs, ideas, mentorships, posts, reminders } =
    useNexus();

  const savedItems = opportunities.filter((o) => saved.includes(o.id));
  const registeredItems = opportunities.filter((o) => registered.includes(o.id));
  const upcoming = opportunities
    .filter((o) => saved.includes(o.id) || registered.includes(o.id))
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="My Activity" subtitle="Everything you've saved, joined and submitted." />

      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <Stat label="Saved" value={saved.length} />
        <Stat label="Registered" value={registered.length} />
        <Stat label="Reminders" value={reminders.length} />
        <Stat label="Ideas" value={ideas.length} />
      </div>

      <Tabs defaultValue="saved">
        <TabsList className="flex-wrap bg-secondary/60">
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="registered">Registered</TabsTrigger>
          <TabsTrigger value="deadlines">Upcoming</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="certs">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="pt-4">
          <List
            empty="Nothing saved yet. Save an opportunity from Discover."
            items={savedItems.map((o) => ({
              id: o.id,
              title: o.name,
              sub: `${o.organizer} · closes ${o.deadline}`,
              status: "Saved",
              to: `/app/opportunities/${o.id}`,
            }))}
          />
        </TabsContent>

        <TabsContent value="registered" className="pt-4">
          <List
            empty="No registrations yet."
            items={registeredItems.map((o) => ({
              id: o.id,
              title: o.name,
              sub: `${o.date} · ${o.location}`,
              status: "Registered",
              to: `/app/opportunities/${o.id}`,
            }))}
          />
        </TabsContent>

        <TabsContent value="deadlines" className="pt-4">
          <List
            empty="No upcoming deadlines tracked."
            items={upcoming.map((o) => ({
              id: o.id,
              title: o.name,
              sub: `Deadline ${o.deadline}`,
              status: "Upcoming",
              to: `/app/opportunities/${o.id}`,
            }))}
          />
        </TabsContent>

        <TabsContent value="reminders" className="pt-4">
          <GlassCard>
            <ReminderList />
          </GlassCard>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4 pt-4">
          <List
            empty="No team activity yet."
            items={[
              ...posts
                .filter((p) => p.postedBy.startsWith("Aarav"))
                .map((p) => ({
                  id: `post-${p.id}`,
                  title: `${p.teamName} — ${p.lookingFor}`,
                  sub: p.event,
                  status: "Posted",
                  to: "/app/teams",
                })),
              ...posts
                .filter((p) => joinedTeams.includes(p.id))
                .map((p) => ({
                  id: `join-${p.id}`,
                  title: p.teamName,
                  sub: p.event,
                  status: "Pending",
                  to: "/app/teams",
                })),
            ]}
          />
        </TabsContent>

        <TabsContent value="ideas" className="pt-4">
          <List
            empty="No ideas submitted yet. Submit one from R&D / Innovation."
            items={ideas.map((i) => ({
              id: i.id,
              title: i.title,
              sub: `${i.domain || "General"} · support: ${i.support.join(", ")}`,
              status: i.status,
              to: "/app/rnd",
            }))}
          />
        </TabsContent>

        <TabsContent value="mentorship" className="pt-4">
          <List
            empty="No mentorship requests yet."
            items={mentorships.map((m) => ({
              id: m.id,
              title: m.expert,
              sub: `${m.reason} · ${m.time}`,
              status: m.status,
              to: "/app/experts",
            }))}
          />
        </TabsContent>

        <TabsContent value="certs" className="pt-4">
          <List
            empty="No certificates tracked."
            items={certifications.slice(0, 3).map((c, i) => ({
              id: c.id,
              title: c.name,
              sub: `${c.provider} · exam ${c.examDate}`,
              status: i === 0 ? "Completed" : "Upcoming",
              to: "/app/certifications",
            }))}
          />
          <p className="mt-4 text-xs text-muted-foreground">
            Clubs joined:{" "}
            {joinedClubs.length === 0
              ? "none yet"
              : clubs
                  .filter((c) => joinedClubs.includes(c.id))
                  .map((c) => c.name)
                  .join(", ")}
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <GlassCard className="p-4">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-primary">{value}</p>
    </GlassCard>
  );
}

type Item = { id: string; title: string; sub: string; status: string; to: string };

function List({ items, empty }: { items: Item[]; empty: string }) {
  if (items.length === 0) {
    return <p className="glass-card p-8 text-center text-sm text-muted-foreground">{empty}</p>;
  }
  const tone = (s: string) =>
    s === "Registered" || s === "Completed"
      ? ("success" as const)
      : s === "Pending" || s === "Pending Review"
        ? ("warning" as const)
        : ("cyan" as const);

  return (
    <div className="space-y-2">
      {items.map((i) => (
        <div
          key={i.id}
          className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card/70 p-4"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{i.title}</p>
            <p className="truncate text-xs text-muted-foreground">{i.sub}</p>
          </div>
          <Chip tone={tone(i.status)}>{i.status}</Chip>
          <Button size="sm" variant="secondary" asChild>
            <Link to={i.to}>Open</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}

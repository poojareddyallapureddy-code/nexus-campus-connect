import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { Chip, GlassCard } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clubs } from "@/lib/nexus-data";
import { useNexus } from "@/lib/nexus-store";

export const Route = createFileRoute("/app/clubs/$id")({
  head: () => ({
    meta: [
      { title: "Club Profile — Nexus" },
      {
        name: "description",
        content: "Club leadership, members, events, announcements and contact details.",
      },
      { property: "og:title", content: "Club Profile — Nexus" },
      { property: "og:description", content: "Leadership, events and announcements for this campus club." },
    ],
  }),
  component: ClubDetail,
});

function ClubDetail() {
  const { id } = useParams({ from: "/app/clubs/$id" });
  const navigate = useNavigate();
  const { joinedClubs, joinClub } = useNexus();
  const [tab, setTab] = useState("about");
  const club = clubs.find((c) => c.id === id);

  if (!club) {
    return (
      <div className="glass-card p-10 text-center">
        <p className="text-sm text-muted-foreground">Club not found.</p>
        <Button className="mt-4" asChild>
          <Link to="/app/clubs">Back to clubs</Link>
        </Button>
      </div>
    );
  }

  const joined = joinedClubs.includes(club.id);

  return (
    <div className="nexus-enter space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/app/clubs" })}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <GlassCard className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Chip tone="indigo">{club.category}</Chip>
            <h1 className="mt-2 text-2xl font-semibold">{club.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {club.members} members · Faculty coordinator {club.faculty}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => joinClub(club.id, club.name)} disabled={joined}>
              {joined ? "Joined ✓" : "Join Club"}
            </Button>
            <Button variant="secondary" onClick={() => setTab("events")}>
              View Events
            </Button>
          </div>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-6">
          <TabsList className="flex-wrap bg-secondary/60">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="pt-4 text-sm text-muted-foreground">
            {club.about}
          </TabsContent>
          <TabsContent value="leadership" className="space-y-2 pt-4">
            {club.leadership.map((l) => (
              <div
                key={l.name}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm"
              >
                <span>{l.name}</span>
                <Chip tone="cyan">{l.role}</Chip>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="events" className="space-y-2 pt-4">
            {club.events.map((e) => (
              <div
                key={e.name}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm"
              >
                <span>{e.name}</span>
                <Chip tone="warning">{e.date}</Chip>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="announcements" className="space-y-2 pt-4">
            {club.announcements.map((a) => (
              <p
                key={a}
                className="rounded-lg border border-border bg-secondary/40 px-4 py-2.5 text-sm text-muted-foreground"
              >
                {a}
              </p>
            ))}
          </TabsContent>
          <TabsContent value="contact" className="pt-4">
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-cyan" /> {club.contact}
            </p>
          </TabsContent>
        </Tabs>
      </GlassCard>
    </div>
  );
}

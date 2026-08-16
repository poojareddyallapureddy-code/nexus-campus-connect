import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { Chip, FilterBar, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useNexus } from "@/lib/nexus-store";
import { opportunities, skillFilters, type TeamPost } from "@/lib/nexus-data";

type Search = { event?: string };

export const Route = createFileRoute("/app/teams")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    event: typeof s.event === "string" ? s.event : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Team Finder — Nexus" },
      {
        name: "description",
        content:
          "Find teammates by skill for hackathons, ideathons and projects, or post your own team requirement.",
      },
      { property: "og:title", content: "Team Finder — Nexus" },
      {
        property: "og:description",
        content: "Have an opportunity but need the right people? Find your team on Nexus.",
      },
    ],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  const { event } = Route.useSearch();
  const navigate = useNavigate();
  const { posts, joinedTeams, joinTeam } = useNexus();
  const [skills, setSkills] = useState<string[]>([]);
  const [detail, setDetail] = useState<TeamPost | null>(null);

  const filtered = posts.filter((p) => {
    const eventOk = !event || p.eventId === event;
    const skillOk = skills.length === 0 || p.skills.some((s) => skills.includes(s));
    return eventOk && skillOk;
  });

  const eventName = opportunities.find((o) => o.id === event)?.name;

  return (
    <div>
      <PageHeader
        title="Find Your Team"
        subtitle="Have an opportunity but need the right people?"
        action={<CreateTeamDialog />}
      />

      {event ? (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
          <span>
            Filtered for <strong>{eventName ?? event}</strong>
          </span>
          <Button size="sm" variant="ghost" onClick={() => navigate({ to: "/app/teams", search: {} })}>
            Clear event filter
          </Button>
        </div>
      ) : null}

      <FilterBar
        options={skillFilters}
        value={skills}
        multi
        onChange={(s) =>
          setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
        }
      />

      {filtered.length === 0 ? (
        <p className="glass-card p-10 text-center text-sm text-muted-foreground">
          No team requests match these filters. Try clearing a skill or post your own requirement.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((p) => {
            const joined = joinedTeams.includes(p.id);
            return (
              <GlassCard key={p.id} className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      Looking for
                    </p>
                    <h3 className="text-base font-semibold text-cyan">{p.lookingFor}</h3>
                  </div>
                  <Chip tone="warning">Deadline {p.deadline}</Chip>
                </div>
                <p className="mt-2 text-sm font-medium">{p.teamName}</p>
                <p className="text-xs text-muted-foreground">{p.event}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> Current team
                    </span>
                    <span>
                      {p.currentSize} / {p.maxSize}
                    </span>
                  </div>
                  <Progress value={(p.currentSize / p.maxSize) * 100} className="h-1.5" />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.skills.map((s) => (
                    <Chip key={s} tone="indigo">
                      {s}
                    </Chip>
                  ))}
                </div>

                <div className="mt-4 flex gap-2 border-t border-border pt-4">
                  <Button size="sm" variant="secondary" onClick={() => setDetail(p)}>
                    View Team
                  </Button>
                  <Button size="sm" disabled={joined} onClick={() => joinTeam(p.id, p.teamName)}>
                    {joined ? "Request Sent ✓" : "Join Team"}
                  </Button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>{detail?.teamName}</DialogTitle>
            <DialogDescription>{detail?.event}</DialogDescription>
          </DialogHeader>
          {detail ? (
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">{detail.description}</p>
              <p>
                <span className="text-muted-foreground">Looking for:</span> {detail.lookingFor}
              </p>
              <p>
                <span className="text-muted-foreground">Team size:</span> {detail.currentSize} /{" "}
                {detail.maxSize}
              </p>
              <p>
                <span className="text-muted-foreground">Posted by:</span> {detail.postedBy}
              </p>
              <p>
                <span className="text-muted-foreground">Contact preference:</span> {detail.contact}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {detail.skills.map((s) => (
                  <Chip key={s} tone="cyan">
                    {s}
                  </Chip>
                ))}
              </div>
              <Button
                className="w-full"
                disabled={joinedTeams.includes(detail.id)}
                onClick={() => joinTeam(detail.id, detail.teamName)}
              >
                {joinedTeams.includes(detail.id) ? "Request Sent ✓" : "Join Team"}
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CreateTeamDialog() {
  const { addPost } = useNexus();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    event: "",
    teamName: "",
    currentSize: "2",
    maxSize: "4",
    lookingFor: "",
    skills: "",
    description: "",
    contact: "WhatsApp",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Team Request</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle>Post a team requirement</DialogTitle>
          <DialogDescription>Tell people what you're building and who you need.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            addPost({
              teamName: form.teamName || "Untitled Team",
              event: form.event || "Campus event",
              lookingFor: form.lookingFor || "Team member",
              currentSize: Number(form.currentSize) || 1,
              maxSize: Number(form.maxSize) || 4,
              skills: form.skills
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
              deadline: "Aug 30",
              description: form.description,
              contact: form.contact,
              postedBy: "Aarav Sharma — 2nd Year CSE (AIML)",
            });
            setOpen(false);
          }}
        >
          <Field label="Event">
            <Input required value={form.event} onChange={(e) => set("event", e.target.value)} />
          </Field>
          <Field label="Team name">
            <Input required value={form.teamName} onChange={(e) => set("teamName", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Current team size">
              <Input
                type="number"
                min={1}
                value={form.currentSize}
                onChange={(e) => set("currentSize", e.target.value)}
              />
            </Field>
            <Field label="Members required (total)">
              <Input
                type="number"
                min={1}
                value={form.maxSize}
                onChange={(e) => set("maxSize", e.target.value)}
              />
            </Field>
          </div>
          <Field label="Role you're looking for">
            <Input
              required
              value={form.lookingFor}
              onChange={(e) => set("lookingFor", e.target.value)}
              placeholder="Python Developer"
            />
          </Field>
          <Field label="Required skills (comma separated)">
            <Input
              value={form.skills}
              onChange={(e) => set("skills", e.target.value)}
              placeholder="Python, AI/ML"
            />
          </Field>
          <Field label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
            />
          </Field>
          <Field label="Contact preference">
            <Input value={form.contact} onChange={(e) => set("contact", e.target.value)} />
          </Field>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Post Team Requirement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

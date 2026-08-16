import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Chip, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clubs } from "@/lib/nexus-data";
import { useNexus } from "@/lib/nexus-store";

export const Route = createFileRoute("/app/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile — Nexus" },
      {
        name: "description",
        content: "Your skills, interests, clubs, projects, certifications and achievements.",
      },
      { property: "og:title", content: "Student Profile — Nexus" },
      { property: "og:description", content: "Skills and interests that power your opportunity matches." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, updateProfile, joinedClubs, ideas, saved } = useNexus();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [newSkill, setNewSkill] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        subtitle="Your skills drive team matching and opportunity recommendations."
        action={
          <Button
            variant={editing ? "secondary" : "default"}
            onClick={() => {
              if (editing) {
                updateProfile(draft);
              } else {
                setDraft(profile);
              }
              setEditing((v) => !v);
            }}
          >
            {editing ? "Save Changes" : "Edit Profile"}
          </Button>
        }
      />

      <GlassCard className="p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-lg font-semibold text-primary ring-1 ring-primary/40">
            {profile.name.charAt(0)}
          </span>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">
              {profile.branch} · {profile.year}
            </p>
          </div>
        </div>

        {editing ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Name</Label>
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Branch</Label>
              <Input value={draft.branch} onChange={(e) => setDraft({ ...draft, branch: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Year</Label>
              <Input value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs text-muted-foreground">Bio</Label>
              <Textarea rows={3} value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">{profile.bio}</p>
        )}
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard>
          <h3 className="text-base font-semibold">Skills</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <Chip key={s} tone="cyan">
                {s}
                <button
                  type="button"
                  aria-label={`Remove ${s}`}
                  className="ml-1 text-muted-foreground hover:text-destructive"
                  onClick={() => updateProfile({ skills: profile.skills.filter((x) => x !== s) })}
                >
                  ×
                </button>
              </Chip>
            ))}
          </div>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newSkill.trim()) return;
              updateProfile({ skills: [...profile.skills, newSkill.trim()] });
              setNewSkill("");
            }}
          >
            <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill" />
            <Button type="submit" variant="secondary">
              Add
            </Button>
          </form>
        </GlassCard>

        <GlassCard>
          <h3 className="text-base font-semibold">Interests</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.interests.map((i) => (
              <Chip key={i} tone="indigo">
                {i}
              </Chip>
            ))}
          </div>
          <h3 className="mt-5 text-base font-semibold">Clubs</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {joinedClubs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Not part of any club yet.</p>
            ) : (
              clubs
                .filter((c) => joinedClubs.includes(c.id))
                .map((c) => (
                  <Chip key={c.id} tone="success">
                    {c.name}
                  </Chip>
                ))
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-base font-semibold">Projects & Ideas</h3>
          {ideas.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Campus Energy Monitor · Smart Attendance (coursework projects)
            </p>
          ) : (
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {ideas.map((i) => (
                <li key={i.id}>• {i.title}</li>
              ))}
            </ul>
          )}
        </GlassCard>

        <GlassCard>
          <h3 className="text-base font-semibold">Certifications & Achievements</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>• PCEP — Python Institute (in progress)</li>
            <li>• Runner-up, Intra-college Code Sprint 2025</li>
            <li>• {saved.length} opportunities saved this month</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}

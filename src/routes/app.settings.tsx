import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Nexus" },
      { name: "description", content: "Control notification preferences and reminder defaults in Nexus." },
      { property: "og:title", content: "Settings — Nexus" },
      { property: "og:description", content: "Notification and reminder preferences." },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  { id: "deadlines", label: "Deadline alerts", desc: "Ticker items and closing dates." },
  { id: "teams", label: "Team invitations", desc: "When someone wants you on their team." },
  { id: "clubs", label: "Club announcements", desc: "Updates from clubs you joined." },
  { id: "mentorship", label: "Mentorship replies", desc: "Responses from experts and mentors." },
  { id: "digest", label: "Weekly digest", desc: "A Monday summary of what's open." },
];

function SettingsPage() {
  const [state, setState] = useState<Record<string, boolean>>({
    deadlines: true,
    teams: true,
    clubs: true,
    mentorship: true,
    digest: false,
  });

  return (
    <div>
      <PageHeader title="Settings" subtitle="Tune what Nexus tells you and when." />
      <GlassCard className="divide-y divide-border p-0">
        {toggles.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-4 p-5">
            <div>
              <Label className="text-sm">{t.label}</Label>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
            <Switch
              checked={state[t.id] ?? false}
              onCheckedChange={(v) => setState((p) => ({ ...p, [t.id]: v }))}
            />
          </div>
        ))}
      </GlassCard>
      <Button className="mt-5" onClick={() => toast.success("Preferences saved.")}>
        Save Preferences
      </Button>
    </div>
  );
}

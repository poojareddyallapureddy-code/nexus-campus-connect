import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, BellRing } from "lucide-react";
import { Chip, GlassCard } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { academicUpdates } from "@/lib/nexus-data";
import { useNexus } from "@/lib/nexus-store";

export const Route = createFileRoute("/app/academic/$id")({
  head: () => ({
    meta: [
      { title: "Academic Update — Nexus" },
      { name: "description", content: "Full details of this campus academic update or circular." },
      { property: "og:title", content: "Academic Update — Nexus" },
      { property: "og:description", content: "Full details of this campus academic circular." },
    ],
  }),
  component: AcademicDetail,
});

function AcademicDetail() {
  const { id } = useParams({ from: "/app/academic/$id" });
  const navigate = useNavigate();
  const { addReminder, reminderKeys } = useNexus();
  const u = academicUpdates.find((x) => x.id === id);

  if (!u) {
    return (
      <div className="glass-card p-10 text-center">
        <p className="text-sm text-muted-foreground">Update not found.</p>
        <Button className="mt-4" asChild>
          <Link to="/app/academic">Back to updates</Link>
        </Button>
      </div>
    );
  }

  const key = `acad-${u.id}`;
  const hasReminder = reminderKeys.includes(key);

  return (
    <div className="nexus-enter space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/app/academic" })}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
      <GlassCard className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="indigo">{u.category}</Chip>
          <span className="text-xs text-muted-foreground">{u.date}</span>
          {u.deadline ? <Chip tone="warning">Deadline {u.deadline}</Chip> : null}
        </div>
        <h1 className="mt-3 text-2xl font-semibold">{u.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Source: {u.source}</p>
        <p className="mt-4 text-sm text-foreground/90">{u.description}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{u.details}</p>
        {u.deadline ? (
          <Button
            className="mt-6"
            variant="outline"
            disabled={hasReminder}
            onClick={() =>
              addReminder(
                {
                  title: u.title,
                  related: u.source,
                  when: "This Week",
                  time: u.deadline ?? u.date,
                  priority: "High",
                  linkTo: `/app/academic/${u.id}`,
                },
                key,
              )
            }
          >
            <BellRing className="h-4 w-4" /> {hasReminder ? "Reminder Added ✓" : "Add Reminder"}
          </Button>
        ) : null}
      </GlassCard>
    </div>
  );
}

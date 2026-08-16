import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Chip, FilterBar, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { academicUpdates } from "@/lib/nexus-data";

const categories = ["All", "Academic", "Club", "College", "Workshop", "Event"] as const;

export const Route = createFileRoute("/app/academic/")({
  head: () => ({
    meta: [
      { title: "Academic Updates & Circulars — Nexus" },
      {
        name: "description",
        content:
          "Exam notifications, assignment deadlines, circulars and department announcements in one feed.",
      },
      { property: "og:title", content: "Academic Updates — Nexus" },
      {
        property: "og:description",
        content: "Every circular, exam notice and assignment deadline, filtered by category.",
      },
    ],
  }),
  component: AcademicPage,
});

function AcademicPage() {
  const [cat, setCat] = useState<string>("All");
  const [onlyDeadlines, setOnlyDeadlines] = useState(false);

  const list = academicUpdates.filter(
    (u) => (cat === "All" || u.category === cat) && (!onlyDeadlines || !!u.deadline),
  );

  return (
    <div>
      <PageHeader
        title="Academic Updates"
        subtitle="Circulars, exam notices, assignments and department announcements."
        action={
          <Button
            variant={onlyDeadlines ? "default" : "secondary"}
            size="sm"
            onClick={() => setOnlyDeadlines((v) => !v)}
          >
            {onlyDeadlines ? "Showing deadlines only" : "Only items with deadlines"}
          </Button>
        }
      />
      <FilterBar options={categories} value={cat} onChange={setCat} />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((u) => (
          <GlassCard key={u.id}>
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="indigo">{u.category}</Chip>
              <span className="text-xs text-muted-foreground">{u.date}</span>
              {u.deadline ? <Chip tone="warning">Due {u.deadline}</Chip> : null}
            </div>
            <h3 className="mt-2 text-base font-semibold">{u.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Source: {u.source}</p>
            <p className="mt-2 text-sm text-muted-foreground">{u.description}</p>
            <Button size="sm" className="mt-4" asChild>
              <Link to="/app/academic/$id" params={{ id: u.id }}>
                View Details
              </Link>
            </Button>
          </GlassCard>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="glass-card p-10 text-center text-sm text-muted-foreground">
          No updates for this filter.
        </p>
      ) : null}
    </div>
  );
}

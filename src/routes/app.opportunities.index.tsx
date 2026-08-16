import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FilterBar, PageHeader } from "@/components/nexus/bits";
import { OpportunityCard } from "@/components/nexus/opportunity-card";
import { Input } from "@/components/ui/input";
import { opportunities, opportunityCategories } from "@/lib/nexus-data";

export const Route = createFileRoute("/app/opportunities/")({
  head: () => ({
    meta: [
      { title: "Discover Opportunities — Nexus" },
      {
        name: "description",
        content:
          "Browse hackathons, ideathons, internships, research roles, workshops and competitions for students.",
      },
      { property: "og:title", content: "Discover Opportunities — Nexus" },
      {
        property: "og:description",
        content: "Hackathons, internships, research and more, filtered by what you care about.",
      },
    ],
  }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  const list = opportunities.filter((o) => {
    const catOk = cat === "All" || o.category === cat;
    const s = q.trim().toLowerCase();
    const qOk =
      !s ||
      (o.name + o.organizer + o.description + o.skills.join(" ")).toLowerCase().includes(s);
    return catOk && qOk;
  });

  return (
    <div>
      <PageHeader
        title="Discover Opportunities"
        subtitle="Find opportunities beyond the classroom — and act on them."
      />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search within opportunities..."
        className="mb-4 max-w-md border-border bg-card/60"
      />
      <FilterBar options={opportunityCategories} value={cat} onChange={setCat} />
      {list.length === 0 ? (
        <p className="glass-card p-10 text-center text-sm text-muted-foreground">
          No opportunities match these filters.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((o) => (
            <OpportunityCard key={o.id} o={o} />
          ))}
        </div>
      )}
    </div>
  );
}

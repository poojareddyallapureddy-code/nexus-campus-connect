import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { Chip, FilterBar, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GuidanceForm } from "@/components/nexus/guidance-form";
import { resources, type Resource } from "@/lib/nexus-data";

const categories = [
  "All",
  "Industrial Experts",
  "Faculty Mentors",
  "R&D Cell",
  "Patent Support",
  "Innovation Support",
  "Labs",
  "Alumni",
  "Entrepreneurship Support",
] as const;

export const Route = createFileRoute("/app/resources")({
  head: () => ({
    meta: [
      { title: "Campus Resources — Nexus" },
      {
        name: "description",
        content:
          "Labs, mentors, R&D support, patent help and incubation — the resources already available to you.",
      },
      { property: "og:title", content: "Campus Resources — Nexus" },
      { property: "og:description", content: "Utilize what already exists on your campus." },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [cat, setCat] = useState<string>("All");
  const [detail, setDetail] = useState<Resource | null>(null);
  const [guidance, setGuidance] = useState<Resource | null>(null);

  const list = resources.filter((r) => cat === "All" || r.category === cat);

  return (
    <div>
      <PageHeader
        title="Utilize What Already Exists."
        subtitle="Labs, mentors, funding desks and support cells you can use today."
      />
      <FilterBar options={categories} value={cat} onChange={setCat} />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((r) => (
          <GlassCard key={r.id} className="flex h-full flex-col">
            <Chip tone="indigo">{r.category}</Chip>
            <h3 className="mt-2 text-base font-semibold">{r.name}</h3>
            <p className="mt-1 text-xs text-cyan">{r.expertise}</p>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.description}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {r.availability}
            </p>
            <div className="mt-4 flex gap-2 border-t border-border pt-4">
              <Button size="sm" onClick={() => setDetail(r)}>
                Explore
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setGuidance(r)}>
                Request Guidance
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>{detail?.name}</DialogTitle>
            <DialogDescription>{detail?.category}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{detail?.details}</p>
          <p className="text-xs text-muted-foreground">Availability: {detail?.availability}</p>
          <Button
            variant="secondary"
            onClick={() => {
              setGuidance(detail);
              setDetail(null);
            }}
          >
            Request Guidance
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!guidance} onOpenChange={(o) => !o && setGuidance(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Request guidance</DialogTitle>
            <DialogDescription>{guidance?.name}</DialogDescription>
          </DialogHeader>
          {guidance ? (
            <GuidanceForm target={guidance.name} onDone={() => setGuidance(null)} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Chip, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GuidanceForm } from "@/components/nexus/guidance-form";
import { experts, type Expert } from "@/lib/nexus-data";

export const Route = createFileRoute("/app/experts")({
  head: () => ({
    meta: [
      { title: "Experts & Mentors — Nexus" },
      {
        name: "description",
        content:
          "Faculty, industry experts and alumni available for mentorship, project, career and research guidance.",
      },
      { property: "og:title", content: "Experts & Mentors — Nexus" },
      { property: "og:description", content: "Request guidance from faculty, alumni and industry experts." },
    ],
  }),
  component: ExpertsPage,
});

function ExpertsPage() {
  const [profile, setProfile] = useState<Expert | null>(null);
  const [request, setRequest] = useState<Expert | null>(null);

  return (
    <div>
      <PageHeader
        title="Experts & Mentors"
        subtitle="The people who can shorten your learning curve."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {experts.map((e) => (
          <GlassCard key={e.id} className="flex h-full flex-col">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-sm font-semibold text-primary ring-1 ring-primary/40">
                {e.name
                  .split(" ")
                  .slice(-2)
                  .map((p) => p.charAt(0))
                  .join("")}
              </span>
              <div>
                <h3 className="text-base font-semibold">{e.name}</h3>
                <p className="text-xs text-muted-foreground">{e.role}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-cyan">{e.experience}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.expertise.map((x) => (
                <Chip key={x} tone="indigo">
                  {x}
                </Chip>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Available for
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {e.availableFor.map((a) => (
                  <Chip key={a} tone="cyan">
                    {a}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-2 border-t border-border pt-4">
              <Button size="sm" variant="secondary" onClick={() => setProfile(e)}>
                View Profile
              </Button>
              <Button size="sm" onClick={() => setRequest(e)}>
                Request Guidance
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      <Dialog open={!!profile} onOpenChange={(o) => !o && setProfile(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>{profile?.name}</DialogTitle>
            <DialogDescription>{profile?.role}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{profile?.bio}</p>
          <p className="text-xs text-muted-foreground">Experience: {profile?.experience}</p>
          <div className="flex flex-wrap gap-1.5">
            {profile?.expertise.map((x) => (
              <Chip key={x} tone="indigo">
                {x}
              </Chip>
            ))}
          </div>
          <Button
            onClick={() => {
              setRequest(profile);
              setProfile(null);
            }}
          >
            Request Guidance
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!request} onOpenChange={(o) => !o && setRequest(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Request guidance</DialogTitle>
            <DialogDescription>{request?.name}</DialogDescription>
          </DialogHeader>
          {request ? <GuidanceForm target={request.name} onDone={() => setRequest(null)} /> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BellRing, CalendarClock, ShieldCheck } from "lucide-react";
import { Chip, FilterBar, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { certifications, type Certification } from "@/lib/nexus-data";
import { useNexus } from "@/lib/nexus-store";

const domains = [
  "All",
  "AI/ML",
  "Programming",
  "Cloud",
  "Data Science",
  "Cybersecurity",
  "Management",
  "Other",
] as const;

export const Route = createFileRoute("/app/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications & Exam Deadlines — Nexus" },
      {
        name: "description",
        content:
          "Track certification drives across cloud, AI/ML, security and data with deadlines and reminders.",
      },
      { property: "og:title", content: "Certifications — Nexus" },
      { property: "og:description", content: "Certification drives, exam dates and reminders for students." },
    ],
  }),
  component: CertificationsPage,
});

function CertificationsPage() {
  const [domain, setDomain] = useState<string>("All");
  const [detail, setDetail] = useState<Certification | null>(null);
  const { addReminder, reminderKeys } = useNexus();

  const list = certifications.filter((c) => domain === "All" || c.domain === domain);

  const setReminder = (c: Certification) =>
    addReminder(
      {
        title: `${c.name} — registration closes`,
        related: c.provider,
        when: "This Week",
        time: c.deadline,
        priority: "High",
        linkTo: "/app/certifications",
      },
      `cert-${c.id}`,
    );

  return (
    <div>
      <PageHeader
        title="Certifications"
        subtitle="Credentials worth your time, with the deadlines that matter."
      />
      <FilterBar options={domains} value={domain} onChange={setDomain} />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((c) => {
          const has = reminderKeys.includes(`cert-${c.id}`);
          return (
            <GlassCard key={c.id} className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Chip tone="indigo">{c.domain}</Chip>
                  <h3 className="mt-2 text-base font-semibold">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.provider}</p>
                </div>
                <Chip tone={c.difficulty === "Advanced" ? "danger" : c.difficulty === "Intermediate" ? "warning" : "success"}>
                  {c.difficulty}
                </Chip>
              </div>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <BellRing className="h-3.5 w-3.5 text-warning" /> Closes {c.deadline}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5 text-cyan" /> Exam {c.examDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" /> Valid {c.validity}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.skills.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              <div className="mt-4 flex gap-2 border-t border-border pt-4">
                <Button size="sm" onClick={() => setDetail(c)}>
                  View
                </Button>
                <Button size="sm" variant="outline" disabled={has} onClick={() => setReminder(c)}>
                  {has ? "Reminder Added ✓" : "Set Reminder"}
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>{detail?.name}</DialogTitle>
            <DialogDescription>{detail?.provider}</DialogDescription>
          </DialogHeader>
          {detail ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{detail.description}</p>
              <p>Registration deadline: {detail.deadline}</p>
              <p>Exam date: {detail.examDate}</p>
              <p>Validity: {detail.validity}</p>
              <p>Difficulty: {detail.difficulty}</p>
              <Button
                className="w-full"
                disabled={reminderKeys.includes(`cert-${detail.id}`)}
                onClick={() => setReminder(detail)}
              >
                {reminderKeys.includes(`cert-${detail.id}`) ? "Reminder Added ✓" : "Set Reminder"}
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

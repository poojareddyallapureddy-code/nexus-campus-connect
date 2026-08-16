import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Chip, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNexus } from "@/lib/nexus-store";

const pipeline = ["Idea", "Guidance", "Team", "Development", "Innovation"];
const supportOptions = [
  "Mentor",
  "Team",
  "Research Guidance",
  "Patent Guidance",
  "Technical Support",
];

export const Route = createFileRoute("/app/rnd")({
  head: () => ({
    meta: [
      { title: "R&D and Innovation Pipeline — Nexus" },
      {
        name: "description",
        content:
          "Submit a student idea and get mentors, teammates, research guidance and patent support behind it.",
      },
      { property: "og:title", content: "R&D / Innovation — Nexus" },
      { property: "og:description", content: "Turn your idea into something real with campus R&D support." },
    ],
  }),
  component: RndPage,
});

function RndPage() {
  const { addIdea, ideas } = useNexus();
  const [form, setForm] = useState({
    title: "",
    problem: "",
    solution: "",
    domain: "",
    skills: "",
  });
  const [support, setSupport] = useState<string[]>(["Mentor"]);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-8">
      <PageHeader title="Have an Idea?" subtitle="Turn your idea into something real." />

      <GlassCard className="flex flex-wrap items-center gap-3 p-5">
        {pipeline.map((p, i) => (
          <div key={p} className="flex items-center gap-3">
            <span className="rounded-lg border border-primary/30 bg-primary/12 px-3 py-1.5 text-sm text-foreground">
              {p}
            </span>
            {i < pipeline.length - 1 ? (
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            ) : null}
          </div>
        ))}
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <h2 className="text-lg font-semibold">Submit your idea</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The R&D cell reviews submissions every fortnight.
          </p>
          {submitted ? (
            <div className="mt-4 rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
              Your idea has been submitted to the R&D support pipeline.
            </div>
          ) : null}
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              addIdea({ ...form, support });
              setSubmitted(true);
              setForm({ title: "", problem: "", solution: "", domain: "", skills: "" });
            }}
          >
            <Field label="Idea title">
              <Input required value={form.title} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field label="Problem statement">
              <Textarea
                required
                rows={3}
                value={form.problem}
                onChange={(e) => set("problem", e.target.value)}
              />
            </Field>
            <Field label="Proposed solution">
              <Textarea
                required
                rows={3}
                value={form.solution}
                onChange={(e) => set("solution", e.target.value)}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Domain">
                <Input
                  value={form.domain}
                  onChange={(e) => set("domain", e.target.value)}
                  placeholder="AI/ML, IoT, Fintech..."
                />
              </Field>
              <Field label="Skills required">
                <Input
                  value={form.skills}
                  onChange={(e) => set("skills", e.target.value)}
                  placeholder="Python, Hardware"
                />
              </Field>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Support needed</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {supportOptions.map((s) => {
                  const active = support.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setSupport((prev) =>
                          prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
                        )
                      }
                      className={
                        active
                          ? "rounded-full border border-primary/50 bg-primary/20 px-3.5 py-1.5 text-xs"
                          : "rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                      }
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            <Button type="submit">
              <Lightbulb className="h-4 w-4" /> Submit Idea
            </Button>
          </form>
        </GlassCard>

        <GlassCard>
          <h2 className="text-base font-semibold">Your submitted ideas</h2>
          {ideas.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing submitted yet. Your ideas will also appear in My Activity.
            </p>
          ) : (
            <div className="mt-3 space-y-3">
              {ideas.map((i) => (
                <div key={i.id} className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-sm font-medium">{i.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{i.domain || "General"}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Chip tone="warning">{i.status}</Chip>
                    {i.support.map((s) => (
                      <Chip key={s} tone="cyan">
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button variant="secondary" className="mt-4 w-full" asChild>
            <Link to="/app/activity">Open My Activity</Link>
          </Button>
        </GlassCard>
      </div>
    </div>
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

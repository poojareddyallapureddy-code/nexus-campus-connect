import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  BellRing,
  Bookmark,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  MapPin,
  Users,
} from "lucide-react";
import { Chip, GlassCard, urgencyTone } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { useNexus } from "@/lib/nexus-store";
import { opportunities } from "@/lib/nexus-data";

export const Route = createFileRoute("/app/opportunities/$id")({
  head: () => ({
    meta: [
      { title: "Opportunity Details — Nexus" },
      {
        name: "description",
        content:
          "Full details of a student opportunity: dates, eligibility, skills, prizes and how to register.",
      },
      { property: "og:title", content: "Opportunity Details — Nexus" },
      {
        property: "og:description",
        content: "Dates, eligibility, skills and registration details for this opportunity.",
      },
    ],
  }),
  component: OpportunityDetail,
});

function OpportunityDetail() {
  const { id } = useParams({ from: "/app/opportunities/$id" });
  const navigate = useNavigate();
  const { saved, toggleSave, reminderKeys, addReminder, registered, register } = useNexus();
  const o = opportunities.find((x) => x.id === id);

  if (!o) {
    return (
      <div className="glass-card p-10 text-center">
        <p className="text-sm text-muted-foreground">This opportunity could not be found.</p>
        <Button className="mt-4" asChild>
          <Link to="/app/opportunities">Back to Discover</Link>
        </Button>
      </div>
    );
  }

  const isSaved = saved.includes(o.id);
  const isRegistered = registered.includes(o.id);
  const key = `opp-${o.id}`;
  const hasReminder = reminderKeys.includes(key);

  return (
    <div className="nexus-enter space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/app/opportunities" })}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <GlassCard className="p-6">
        <div className="flex flex-wrap gap-2">
          <Chip tone="indigo">{o.category}</Chip>
          <Chip tone={urgencyTone(o.urgency)}>{o.urgency}</Chip>
          {isRegistered ? <Chip tone="success">Registered</Chip> : null}
        </div>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{o.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Organised by {o.organizer}</p>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{o.details}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Detail icon={<Calendar className="h-4 w-4 text-cyan" />} label="Event date" value={o.date} />
          <Detail
            icon={<BellRing className="h-4 w-4 text-warning" />}
            label="Registration deadline"
            value={o.deadline}
          />
          <Detail icon={<Users className="h-4 w-4 text-primary" />} label="Eligibility" value={o.eligibility} />
          <Detail icon={<MapPin className="h-4 w-4 text-primary" />} label="Location" value={o.location} />
          <Detail icon={<Award className="h-4 w-4 text-success" />} label="Prize / benefit" value={o.prize} />
          <Detail
            icon={<CheckCircle2 className="h-4 w-4 text-cyan" />}
            label="How to register"
            value={o.registration}
          />
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Skills required
          </p>
          <div className="flex flex-wrap gap-1.5">
            {o.skills.map((s) => (
              <Chip key={s} tone="cyan">
                {s}
              </Chip>
            ))}
          </div>
        </div>

        {isRegistered ? (
          <div className="mt-6 rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
            Registration initiated successfully. Check My Activity for status.
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
          <Button onClick={() => register(o.id, o.name)} disabled={isRegistered}>
            {isRegistered ? "Registered ✓" : "Register"}
          </Button>
          <Button variant="secondary" onClick={() => toggleSave(o.id, o.name)}>
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {isSaved ? "Saved ✓" : "Save Opportunity"}
          </Button>
          <Button
            variant="outline"
            disabled={hasReminder}
            onClick={() =>
              addReminder(
                {
                  title: `${o.name} — registration closes`,
                  related: o.organizer,
                  when:
                    o.urgency === "DUE TODAY"
                      ? "Today"
                      : o.urgency === "DUE TOMORROW"
                        ? "Tomorrow"
                        : "This Week",
                  time: o.deadline,
                  priority: o.urgency === "DUE TODAY" ? "Urgent" : "High",
                  linkTo: `/app/opportunities/${o.id}`,
                },
                key,
              )
            }
          >
            <BellRing className="h-4 w-4" /> {hasReminder ? "Reminder Added ✓" : "Add Reminder"}
          </Button>
          <Button variant="outline" asChild>
            <Link to="/app/teams" search={{ event: o.id }}>
              <Users className="h-4 w-4" /> Find Teammates
            </Link>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <p className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}

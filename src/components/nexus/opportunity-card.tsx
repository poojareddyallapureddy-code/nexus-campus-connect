import { Link } from "@tanstack/react-router";
import { Bell, BellRing, Bookmark, BookmarkCheck, Calendar, MapPin, Users } from "lucide-react";
import { Chip, GlassCard, urgencyTone } from "./bits";
import { Button } from "@/components/ui/button";
import { useNexus } from "@/lib/nexus-store";
import type { Opportunity } from "@/lib/nexus-data";

export function OpportunityCard({ o }: { o: Opportunity }) {
  const { saved, toggleSave, reminderKeys, addReminder, profile } = useNexus();
  const isSaved = saved.includes(o.id);
  const key = `opp-${o.id}`;
  const hasReminder = reminderKeys.includes(key);
  const matched = o.skills.filter((s) => profile.skills.includes(s));

  return (
    <GlassCard className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex flex-wrap gap-1.5">
            <Chip tone="indigo">{o.category}</Chip>
            <Chip tone={urgencyTone(o.urgency)}>{o.urgency}</Chip>
          </div>
          <h3 className="text-base font-semibold leading-snug">{o.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{o.organizer}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{o.description}</p>

      <div className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-cyan" /> {o.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Bell className="h-3.5 w-3.5 text-warning" /> Closes {o.deadline}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" /> {o.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-primary" /> {o.eligibility}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {o.skills.map((s) => (
          <Chip key={s} tone={matched.includes(s) ? "cyan" : "muted"}>
            {s}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        <Button asChild size="sm">
          <Link to="/app/opportunities/$id" params={{ id: o.id }}>
            View Details
          </Link>
        </Button>
        <Button size="sm" variant="secondary" onClick={() => toggleSave(o.id, o.name)}>
          {isSaved ? (
            <>
              <BookmarkCheck className="h-4 w-4" /> Saved
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4" /> Save
            </>
          )}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={hasReminder}
          onClick={() =>
            addReminder(
              {
                title: `${o.name} — registration closes`,
                related: o.organizer,
                when: o.urgency === "DUE TODAY" ? "Today" : o.urgency === "DUE TOMORROW" ? "Tomorrow" : "This Week",
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
      </div>
    </GlassCard>
  );
}

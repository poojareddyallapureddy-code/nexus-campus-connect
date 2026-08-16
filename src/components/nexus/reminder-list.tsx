import { useNavigate } from "@tanstack/react-router";
import { Bell, X } from "lucide-react";
import { Chip } from "./bits";
import { useNexus } from "@/lib/nexus-store";
import { Button } from "@/components/ui/button";
import type { Reminder } from "@/lib/nexus-data";

const groups: Reminder["when"][] = ["Today", "Tomorrow", "This Week"];

function tone(p: Reminder["priority"]) {
  return p === "Urgent" ? "danger" : p === "High" ? "warning" : "cyan";
}

export function ReminderList({ limitPerGroup }: { limitPerGroup?: number }) {
  const { reminders, dismissReminder } = useNexus();
  const navigate = useNavigate();

  if (reminders.length === 0) {
    return <p className="text-sm text-muted-foreground">No reminders left. You're all caught up.</p>;
  }

  return (
    <div className="space-y-5">
      {groups.map((g) => {
        let items = reminders.filter((r) => r.when === g);
        if (limitPerGroup) items = items.slice(0, limitPerGroup);
        if (items.length === 0) return null;
        return (
          <div key={g}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {g}
            </p>
            <div className="space-y-2">
              {items.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3 transition-colors hover:border-primary/40"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Bell className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.related} · {r.time}
                    </p>
                  </div>
                  <Chip tone={tone(r.priority)}>{r.priority}</Chip>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate({ to: r.linkTo ?? "/app/reminders" })}
                    >
                      View
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Dismiss reminder"
                      onClick={() => dismissReminder(r.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

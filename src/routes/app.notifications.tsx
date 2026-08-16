import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Chip, FilterBar, PageHeader } from "@/components/nexus/bits";
import { Button } from "@/components/ui/button";
import { useNexus } from "@/lib/nexus-store";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Academic",
  "Clubs",
  "Opportunities",
  "Teams",
  "Deadlines",
  "Mentorship",
  "R&D",
  "Reminders",
] as const;

export const Route = createFileRoute("/app/notifications")({
  head: () => ({
    meta: [
      { title: "Notification Center — Nexus" },
      {
        name: "description",
        content: "All campus notifications by category, with read state and direct links.",
      },
      { property: "og:title", content: "Notification Center — Nexus" },
      { property: "og:description", content: "Academic, club, team and deadline notifications in one feed." },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { notifications, markRead, markAllRead, unread } = useNexus();
  const navigate = useNavigate();
  const [cat, setCat] = useState<string>("All");

  const list = notifications.filter((n) => cat === "All" || n.category === cat);

  return (
    <div>
      <PageHeader
        title="Notification Center"
        subtitle={`${unread} unread notification${unread === 1 ? "" : "s"}`}
        action={
          <Button variant="secondary" onClick={markAllRead}>
            Mark All as Read
          </Button>
        }
      />
      <FilterBar options={categories} value={cat} onChange={setCat} />
      <div className="space-y-2">
        {list.map((n) => (
          <div
            key={n.id}
            className={cn(
              "flex flex-wrap items-center gap-3 rounded-lg border border-border p-4",
              n.read ? "bg-card/50" : "border-primary/35 bg-primary/8",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={n.read ? "muted" : "indigo"}>{n.category}</Chip>
                <span className="text-[11px] text-muted-foreground">{n.time}</span>
              </div>
              <p className="mt-1.5 text-sm font-medium">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.body}</p>
            </div>
            <div className="flex gap-2">
              {!n.read ? (
                <Button size="sm" variant="ghost" onClick={() => markRead(n.id)}>
                  Mark as Read
                </Button>
              ) : null}
              <Button
                size="sm"
                onClick={() => {
                  markRead(n.id);
                  navigate({ to: n.linkTo });
                }}
              >
                Open
              </Button>
            </div>
          </div>
        ))}
        {list.length === 0 ? (
          <p className="glass-card p-10 text-center text-sm text-muted-foreground">
            No notifications in this category.
          </p>
        ) : null}
      </div>
    </div>
  );
}

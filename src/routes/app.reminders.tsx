import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageHeader } from "@/components/nexus/bits";
import { ReminderList } from "@/components/nexus/reminder-list";

export const Route = createFileRoute("/app/reminders")({
  head: () => ({
    meta: [
      { title: "All Reminders — Nexus" },
      {
        name: "description",
        content: "Every reminder you've set, grouped by today, tomorrow and this week.",
      },
      { property: "og:title", content: "Reminders — Nexus" },
      { property: "og:description", content: "Your deadlines and reminders, grouped by urgency." },
    ],
  }),
  component: RemindersPage,
});

function RemindersPage() {
  return (
    <div>
      <PageHeader title="Reminders" subtitle="Everything you asked Nexus to keep an eye on." />
      <GlassCard>
        <ReminderList />
      </GlassCard>
    </div>
  );
}

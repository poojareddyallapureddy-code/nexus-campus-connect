import { useNavigate } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { tickerItems } from "@/lib/nexus-data";
import { cn } from "@/lib/utils";

function dotClass(u: string) {
  if (u === "DUE TODAY") return "bg-destructive";
  if (u === "DUE TOMORROW") return "bg-warning";
  if (u === "DUE THIS WEEK") return "bg-cyan";
  return "bg-muted-foreground";
}

export function DeadlineTicker() {
  const navigate = useNavigate();
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="nexus-marquee-paused relative flex items-stretch overflow-hidden rounded-xl border border-destructive/25 bg-surface/90 shadow-[0_10px_40px_-28px_var(--destructive)]">
      <div className="flex shrink-0 items-center gap-2 border-r border-destructive/25 bg-destructive/12 px-4 py-3">
        <span className="nexus-live-dot h-2 w-2 rounded-full bg-destructive" />
        <span className="text-xs font-bold tracking-[0.16em] text-destructive">LIVE DEADLINES</span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="nexus-marquee flex w-max items-center gap-8 py-3 pl-6">
          {items.map((item, i) => (
            <button
              key={`${item.id}-${i}`}
              type="button"
              onClick={() => navigate({ to: item.linkTo })}
              className="group flex shrink-0 items-center gap-2.5 text-sm text-foreground/90 transition-colors hover:text-cyan"
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", dotClass(item.urgency))} />
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">
                {item.urgency}
              </span>
              <span className="font-medium group-hover:underline">{item.label}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {item.date}
              </span>
              <span className="ml-6 text-border">•</span>
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface to-transparent" />
      </div>
    </div>
  );
}

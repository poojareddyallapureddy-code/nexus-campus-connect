import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="nexus-enter mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Chip({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "indigo" | "cyan" | "success" | "warning" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    muted: "bg-secondary text-muted-foreground border-border",
    indigo: "bg-primary/15 text-primary border-primary/30",
    cyan: "bg-cyan/12 text-cyan border-cyan/30",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    danger: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function FilterBar({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: readonly string[];
  value: string | string[];
  onChange: (v: string) => void;
  multi?: boolean;
}) {
  const isActive = (o: string) => (multi ? (value as string[]).includes(o) : value === o);
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
            isActive(o)
              ? "border-primary/50 bg-primary/20 text-foreground shadow-[0_0_0_1px_var(--primary)]"
              : "border-border bg-secondary/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function GlassCard({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-[0_16px_50px_-30px_var(--primary)]",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="glass-card p-10 text-center text-sm text-muted-foreground">{text}</div>
  );
}

export function urgencyTone(u: string) {
  if (u === "DUE TODAY") return "danger" as const;
  if (u === "DUE TOMORROW") return "warning" as const;
  if (u === "DUE THIS WEEK") return "cyan" as const;
  return "muted" as const;
}

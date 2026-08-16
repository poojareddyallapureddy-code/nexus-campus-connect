import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Award,
  Bell,
  BookOpen,
  Compass,
  FlaskConical,
  Home,
  Layers,
  LibraryBig,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNexus } from "@/lib/nexus-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Chip } from "./bits";

const nav = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/opportunities", label: "Discover", icon: Compass },
  { to: "/app/academic", label: "Academic Updates", icon: BookOpen },
  { to: "/app/clubs", label: "Clubs", icon: UsersRound },
  { to: "/app/teams", label: "Teams", icon: Users },
  { to: "/app/resources", label: "Resources", icon: LibraryBig },
  { to: "/app/experts", label: "Experts & Mentors", icon: Sparkles },
  { to: "/app/rnd", label: "R&D / Innovation", icon: FlaskConical },
  { to: "/app/certifications", label: "Certifications", icon: Award },
  { to: "/app/activity", label: "My Activity", icon: Layers },
];

const mobileNav = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/opportunities", label: "Discover", icon: Compass },
  { to: "/app/teams", label: "Teams", icon: Users },
  { to: "/app/activity", label: "Activity", icon: Layers },
  { to: "/app/profile", label: "Profile", icon: User },
] as const;

const bottomNav = [
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const { unread } = useNexus();

  const item = (i: (typeof nav)[number], showBadge = false) => {
    const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
    return (
      <Link
        key={i.to}
        to={i.to}
        onClick={onNavigate}
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
          active
            ? "bg-primary/18 font-medium text-foreground shadow-[inset_2px_0_0_0_var(--primary)]"
            : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        )}
      >
        <i.icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
        <span className="flex-1">{i.label}</span>
        {showBadge && unread > 0 ? <Chip tone="danger">{unread}</Chip> : null}
      </Link>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <nav className="flex-1 space-y-1">{nav.map((i) => item(i))}</nav>
      <div className="mt-6 space-y-1 border-t border-border pt-4">
        {bottomNav.map((i) => item(i, i.label === "Notifications"))}
      </div>
    </div>
  );
}

function Brand() {
  return (
    <Link to="/" className="block px-1 pb-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/40">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-lg font-semibold leading-none tracking-tight">Nexus</p>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Stay in the loop. Stay connected.
          </p>
        </div>
      </div>
    </Link>
  );
}

export function AppShell() {
  const navigate = useNavigate();
  const { unread, profile, notifications, markRead, markAllRead } = useNexus();
  const [query, setQuery] = useState("");
  const [openMobile, setOpenMobile] = useState(false);
  const [openNotifs, setOpenNotifs] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/app/search", search: { q: query } });
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col overflow-y-auto border-r border-border bg-sidebar px-4 py-6 lg:flex">
        <Brand />
        <NavItems />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur-xl sm:px-6">
          <Sheet open={openMobile} onOpenChange={setOpenMobile}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 overflow-y-auto bg-sidebar p-4">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <Brand />
              <NavItems onNavigate={() => setOpenMobile(false)} />
            </SheetContent>
          </Sheet>

          <form onSubmit={submitSearch} className="relative flex-1 max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities, clubs, people, resources..."
              className="border-border bg-secondary/50 pl-9"
            />
          </form>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              onClick={() => setOpenNotifs((v) => !v)}
            >
              <Bell className="h-5 w-5" />
              {unread > 0 ? (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-foreground">
                  {unread}
                </span>
              ) : null}
            </Button>
            {openNotifs ? (
              <div className="glass-card absolute right-0 top-12 z-40 w-[min(92vw,22rem)] p-0">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold">Notifications</p>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" onClick={markAllRead}>
                      Mark all read
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Close notifications"
                      onClick={() => setOpenNotifs(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 6).map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => {
                        markRead(n.id);
                        setOpenNotifs(false);
                        navigate({ to: n.linkTo });
                      }}
                      className={cn(
                        "flex w-full flex-col items-start gap-1 border-b border-border px-4 py-3 text-left transition-colors hover:bg-secondary/60",
                        !n.read && "bg-primary/8",
                      )}
                    >
                      <div className="flex w-full items-center gap-2">
                        <Chip tone={n.read ? "muted" : "indigo"}>{n.category}</Chip>
                        <span className="ml-auto text-[10px] text-muted-foreground">{n.time}</span>
                      </div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.body}</p>
                    </button>
                  ))}
                </div>
                <div className="p-3">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      setOpenNotifs(false);
                      navigate({ to: "/app/notifications" });
                    }}
                  >
                    Open notification center
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          <Link
            to="/app/profile"
            className="hidden items-center gap-2 rounded-full border border-border bg-secondary/50 py-1 pl-1 pr-3 transition-colors hover:border-primary/40 sm:flex"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/25 text-xs font-semibold text-primary">
              {profile.name.charAt(0)}
            </span>
            <span className="text-xs">{profile.name.split(" ")[0]}</span>
          </Link>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 lg:pb-12">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-sidebar/95 py-2 backdrop-blur-xl lg:hidden">
        {mobileNav.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            className="flex flex-col items-center gap-1 px-3 py-1 text-[10px] text-muted-foreground [&.active]:text-primary"
            activeProps={{ className: "active" }}
            activeOptions={{ exact: i.to === "/app" }}
          >
            <i.icon className="h-4 w-4" />
            {i.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

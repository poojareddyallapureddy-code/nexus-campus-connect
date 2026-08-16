import { createFileRoute, Link } from "@tanstack/react-router";
import { Chip, GlassCard, PageHeader } from "@/components/nexus/bits";
import { Input } from "@/components/ui/input";
import {
  academicUpdates,
  certifications,
  clubs,
  experts,
  opportunities,
  resources,
  students,
  teamPosts,
} from "@/lib/nexus-data";
import { useNavigate } from "@tanstack/react-router";

type Search = { q?: string | undefined };

export const Route = createFileRoute("/app/search")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s["q"] === "string" ? (s["q"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Universal Search — Nexus" },
      {
        name: "description",
        content:
          "Search opportunities, students, teams, clubs, resources, experts, certifications and updates.",
      },
      { property: "og:title", content: "Universal Search — Nexus" },
      { property: "og:description", content: "One search across every corner of your campus." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const query = (q ?? "").trim().toLowerCase();
  const match = (s: string) => query.length > 0 && s.toLowerCase().includes(query);

  const oppHits = opportunities.filter((o) => match(o.name + o.category + o.skills.join(" ")));
  const teamHits = teamPosts.filter((t) => match(t.teamName + t.event + t.skills.join(" ") + t.lookingFor));
  const studentHits = students.filter((s) => match(s.name + s.skills.join(" ") + s.branch));
  const clubHits = clubs.filter((c) => match(c.name + c.category));
  const certHits = certifications.filter((c) => match(c.name + c.domain + c.skills.join(" ")));
  const expertHits = experts.filter((e) => match(e.name + e.expertise.join(" ") + e.role));
  const resHits = resources.filter((r) => match(r.name + r.category + r.expertise));
  const updateHits = academicUpdates.filter((u) => match(u.title + u.category + u.source));

  const total =
    oppHits.length +
    teamHits.length +
    studentHits.length +
    clubHits.length +
    certHits.length +
    expertHits.length +
    resHits.length +
    updateHits.length;

  return (
    <div>
      <PageHeader
        title="Search"
        subtitle={query ? `${total} result${total === 1 ? "" : "s"} for "${q}"` : "Search across all of Nexus."}
      />
      <Input
        defaultValue={q ?? ""}
        placeholder="Search opportunities, clubs, people, resources..."
        className="mb-6 max-w-lg border-border bg-card/60"
        onChange={(e) => navigate({ to: "/app/search", search: { q: e.target.value } })}
      />

      {query === "" ? (
        <p className="glass-card p-10 text-center text-sm text-muted-foreground">
          Start typing to search opportunities, teams, students, clubs and more.
        </p>
      ) : total === 0 ? (
        <p className="glass-card p-10 text-center text-sm text-muted-foreground">
          No results found for "{q}".
        </p>
      ) : (
        <div className="space-y-8">
          <Group title="Opportunities">
            {oppHits.map((o) => (
              <Row key={o.id} to={`/app/opportunities/${o.id}`} title={o.name} sub={o.organizer} tag={o.category} />
            ))}
          </Group>
          <Group title="Teams">
            {teamHits.map((t) => (
              <Row key={t.id} to="/app/teams" title={`${t.teamName} — ${t.lookingFor}`} sub={t.event} tag="Team" />
            ))}
          </Group>
          <Group title="Students">
            {studentHits.map((s) => (
              <Row key={s.id} to="/app/teams" title={s.name} sub={`${s.branch} · ${s.year} · ${s.skills.join(", ")}`} tag="Student" />
            ))}
          </Group>
          <Group title="Clubs">
            {clubHits.map((c) => (
              <Row key={c.id} to={`/app/clubs/${c.id}`} title={c.name} sub={`${c.members} members`} tag={c.category} />
            ))}
          </Group>
          <Group title="Certifications">
            {certHits.map((c) => (
              <Row key={c.id} to="/app/certifications" title={c.name} sub={c.provider} tag={c.domain} />
            ))}
          </Group>
          <Group title="Experts">
            {expertHits.map((e) => (
              <Row key={e.id} to="/app/experts" title={e.name} sub={e.role} tag="Mentor" />
            ))}
          </Group>
          <Group title="Resources">
            {resHits.map((r) => (
              <Row key={r.id} to="/app/resources" title={r.name} sub={r.expertise} tag={r.category} />
            ))}
          </Group>
          <Group title="Academic Updates">
            {updateHits.map((u) => (
              <Row key={u.id} to={`/app/academic/${u.id}`} title={u.title} sub={u.source} tag={u.category} />
            ))}
          </Group>
        </div>
      )}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode[] }) {
  if (!children || children.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Row({ to, title, sub, tag }: { to: string; title: string; sub: string; tag: string }) {
  return (
    <GlassCard className="p-0">
      <Link to={to} className="flex items-center gap-3 px-4 py-3">
        <Chip tone="indigo">{tag}</Chip>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{sub}</p>
        </div>
      </Link>
    </GlassCard>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/nexus/app-shell";

export const Route = createFileRoute("/app")({
  component: AppShell,
});

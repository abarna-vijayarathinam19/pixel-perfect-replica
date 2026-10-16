import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { meta } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy Policy — Avenset", "How Avenset collects, uses and protects your personal and booking information."),
  component: () => <LegalPage kind="privacy" />,
});

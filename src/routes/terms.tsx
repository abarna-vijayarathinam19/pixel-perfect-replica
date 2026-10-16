import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal";
import { meta } from "@/components/site";

export const Route = createFileRoute("/terms")({
  head: () => meta("Terms & Conditions — Avenset", "The terms that apply when you use Avenset consultations and online booking."),
  component: () => <LegalPage kind="terms" />,
});

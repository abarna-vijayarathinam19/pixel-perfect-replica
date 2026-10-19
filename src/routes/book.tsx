import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CalendarCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { websiteCopy } from "@/lib/website-copy";
import { BOOKING_URL } from "@/lib/booking";
import { Button } from "@/components/ui/button";
import { PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/book")({
  head: () => meta("Book with Avenset — Appointments and demos", "Continue to the Avenset booking portal to book or manage your appointments and request a demo."),
  component: Book,
});

function Book() {
  const { t, lang } = useI18n();
  const c = websiteCopy(lang);
  return <><PageHero title={c.portal} sub={c.portalSub} /><section className="mx-auto max-w-3xl px-4 text-center"><CalendarCheck className="mx-auto mb-8 h-12 w-12 text-primary" /><div className="flex flex-wrap justify-center gap-3"><Button asChild size="lg"><a href={BOOKING_URL}>{t.booking.btn1}<ArrowUpRight /></a></Button><Button asChild variant="outline" size="lg"><a href={BOOKING_URL}>{t.booking.btn2}<ArrowUpRight /></a></Button></div></section></>;
}

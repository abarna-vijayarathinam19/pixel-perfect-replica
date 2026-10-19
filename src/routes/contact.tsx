import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Mail, Phone, Facebook, Linkedin, Twitter } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHero, meta } from "@/components/site";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { submitContact } from "@/lib/appointments.functions";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact Avenset — Offices in Colombo & Jaffna", "Reach the Avenset team about demos, pricing or support. Offices in Colombo and Jaffna, Sri Lanka."),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const c = t.contactPage;
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [busy, setBusy] = useState(false);
  return (
    <>
      <PageHero title={c.title} sub={c.sub} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[{ t: c.office1, a: "No. 42, Galle Road, Colombo 03" }, { t: c.office2, a: "No. 18, Hospital Road, Jaffna" }].map((o) => (
            <div key={o.t} className="flex gap-4 rounded-2xl border bg-card p-5"><MapPin className="h-6 w-6 text-primary" /><div><h3 className="font-bold">{o.t}</h3><p className="text-sm text-muted-foreground">{o.a}</p></div></div>
          ))}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl border bg-card p-5"><Mail className="h-5 w-5 text-primary" /><div><p className="text-xs text-muted-foreground">{c.email}</p><p className="text-sm">hello@avenset.com</p></div></div>
            <div className="flex gap-3 rounded-2xl border bg-card p-5"><Phone className="h-5 w-5 text-primary" /><div><p className="text-xs text-muted-foreground">{c.phone}</p><p className="text-sm">+94 11 234 5678</p></div></div>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm font-bold">{c.social}</p>
            <div className="mt-3 flex gap-3">{[Facebook, Linkedin, Twitter].map((I, i) => <a key={i} href="#" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-full border hover:bg-accent"><I className="h-4 w-4" /></a>)}</div>
          </div>
          <iframe title="Colombo office map" className="h-64 w-full rounded-2xl border" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=79.84%2C6.89%2C79.87%2C6.92&layer=mapnik&marker=6.905%2C79.855" />
        </div>
        <form className="space-y-4 rounded-3xl border bg-card p-6 sm:p-8" onSubmit={async (e) => {
          e.preventDefault(); setBusy(true);
          try { await submitContact({ data: { ...f, subject: f.subject || undefined } }); toast.success(c.sent); setF({ name: "", email: "", subject: "", message: "" }); }
          catch { toast.error(t.bookPage.required); } finally { setBusy(false); }
        }}>
          <h2 className="text-2xl font-bold">{c.formT}</h2>
          <input className="field" required maxLength={120} placeholder={c.name} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input type="email" className="field" required maxLength={255} placeholder={c.emailF} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <input className="field" maxLength={200} placeholder={c.subject} value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} />
          <textarea className="field" required rows={6} maxLength={3000} placeholder={c.message} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
          <button disabled={busy} className="w-full rounded-[25px] bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-glow">{busy ? c.sending : c.send}</button>
        </form>
      </section>
      <section className="mx-auto max-w-3xl px-4 pt-24">
        <h2 className="text-center text-3xl font-bold">{c.faqT}</h2>
        <Accordion type="single" collapsible className="mt-8 rounded-2xl border bg-card px-6">
          {c.faq.map((x, i) => <AccordionItem key={x.q} value={String(i)}><AccordionTrigger>{x.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{x.a}</AccordionContent></AccordionItem>)}
        </Accordion>
      </section>
    </>
  );
}

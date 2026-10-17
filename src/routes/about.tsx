import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Stethoscope, Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHero, meta } from "@/components/site";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => meta("About Avenset — Healthcare conversation intelligence", "Our mission is to give every healthcare team a secure, searchable memory of their conversations."),
  component: About,
});

const icons = [ShieldCheck, Stethoscope, Languages];

function About() {
  const { t } = useI18n();
  const a = t.aboutPage;
  return (
    <>
      <PageHero title={a.title} sub={a.sub} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
        <img src={aboutImg} alt="Doctor wearing a headset" className="rounded-3xl border shadow-card" />
        <div className="space-y-6">
          <div className="rounded-2xl border bg-card p-6"><h2 className="text-2xl font-bold text-primary">{a.missionT}</h2><p className="mt-2 text-muted-foreground">{a.mission}</p></div>
          <div className="rounded-2xl border bg-card p-6"><h2 className="text-2xl font-bold text-primary">{a.visionT}</h2><p className="mt-2 text-muted-foreground">{a.vision}</p></div>
          <div className="grid grid-cols-2 gap-4">
            {a.stats.map((s) => <div key={s.l} className="rounded-2xl border bg-gradient-deep p-5"><p className="font-display text-3xl font-extrabold text-gradient">{s.v}</p><p className="text-sm text-muted-foreground">{s.l}</p></div>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pt-24">
        <h2 className="text-center text-3xl font-bold">{a.valuesT}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {a.values.map((v, i) => { const I = icons[i]!; return (
            <div key={v.t} className="rounded-2xl border bg-card p-6"><I className="h-8 w-8 text-primary" /><h3 className="mt-4 font-bold">{v.t}</h3><p className="mt-2 text-sm text-muted-foreground">{v.d}</p></div>); })}
        </div>
      </section>
    </>
  );
}

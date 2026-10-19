import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Stethoscope, Languages, UserRound, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { websiteCopy } from "@/lib/website-copy";
import { Eyebrow, meta } from "@/components/site";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => meta("About Avenset — Our mission, doctors and leadership", "Discover Avenset’s mission, vision and benefits for healthcare teams, and meet our doctors and board of directors."),
  component: About,
});
const icons = [ShieldCheck, Stethoscope, Languages];
function About() {
  const { t, lang } = useI18n();
  const a = t.aboutPage;
  const c = websiteCopy(lang);
  return <>
    <section className="about-hero relative overflow-hidden"><img src={aboutImg} alt="Doctor ready for a video consultation" className="absolute inset-0 h-full w-full object-cover" /><div className="about-shade absolute inset-0" /><div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"><Eyebrow>Avenset</Eyebrow><h1 className="mt-5 max-w-2xl text-4xl font-bold sm:text-5xl">{a.title}</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-hero-foreground">{a.sub}</p></div></section>
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2"><div><Eyebrow>{a.missionT}</Eyebrow><h2 className="mt-5 text-3xl font-bold">{a.missionT}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{a.mission}</p></div><div className="border-t pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0"><Eyebrow>{a.visionT}</Eyebrow><h2 className="mt-5 text-3xl font-bold">{a.visionT}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{a.vision}</p></div></section>
    <section className="border-y bg-secondary/30 py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="text-3xl font-bold sm:text-4xl">{c.benefits}</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{a.values.map((v, i) => { const Icon = icons[i] ?? ShieldCheck; return <div key={v.t}><Icon className="h-8 w-8 text-primary" /><h3 className="mt-5 text-xl font-semibold">{v.t}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{v.d}</p></div>; })}</div><ul className="mt-10 grid gap-4 md:grid-cols-2">{t.about.points.map((point) => <li key={point} className="flex gap-3 text-sm"><Check className="h-5 w-5 shrink-0 text-primary" />{point}</li>)}</ul></div></section>
    {[c.doctors, c.directors].map((title) => <section key={title} className="mx-auto max-w-7xl px-4 pt-16 sm:px-6"><h2 className="text-3xl font-bold sm:text-4xl">{title}</h2><p className="mt-3 text-muted-foreground">{c.pendingTeam}</p><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <article key={i} className="overflow-hidden rounded-lg border bg-card"><div className="grid aspect-[4/3] place-items-center bg-secondary"><UserRound className="h-16 w-16 text-muted-foreground/50" aria-hidden="true" /></div><div className="p-5"><h3 className="font-semibold">{c.profile}</h3><dl className="mt-4 space-y-3 text-sm">{[c.name, c.position, c.specialty].map((label) => <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><dt className="text-muted-foreground">{label}</dt><dd>—</dd></div>)}</dl></div></article>)}</div></section>)}
  </>;
}

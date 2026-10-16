import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Video, Mic, Sparkles, ListChecks, Check, Quote, Search, CalendarCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Eyebrow, meta } from "@/components/site";
import { HOSPITALS, SPECIALIZATIONS } from "@/lib/doctors";
import hero from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => meta("Avenset — AI meeting intelligence for healthcare", "Secure doctor video consultations with live transcription, AI summaries, decisions and action items."),
  component: Index,
});

const icons = [Video, Mic, Sparkles, ListChecks];

function Index() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [f, setF] = useState({ doctor: "", spec: "", hospital: "", date: "" });
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-spotlight" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-16 lg:grid-cols-2 lg:pt-24">
          <div>
            <Eyebrow>{t.hero.badge}</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl text-gradient">{t.hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{t.hero.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className="rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow">{t.hero.primary}</Link>
              <Link to="/product" className="rounded-full border px-6 py-3 font-semibold hover:bg-secondary">{t.hero.secondary}</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
            <img src={hero} alt="Doctor on a secure video consultation" width={1200} height={900} className="relative rounded-3xl border shadow-card" />
          </div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); nav({ to: "/book", search: f }); }}
          className="relative mx-auto -mb-6 grid max-w-6xl gap-3 rounded-2xl glass p-4 shadow-card sm:grid-cols-2 lg:grid-cols-5 mx-4 lg:mx-auto"
        >
          <input className="field" placeholder={t.filter.doctorPh} aria-label={t.filter.doctor} value={f.doctor} onChange={(e) => setF({ ...f, doctor: e.target.value })} />
          <select className="field" aria-label={t.filter.spec} value={f.spec} onChange={(e) => setF({ ...f, spec: e.target.value })}>
            <option value="">{t.filter.specPh}</option>{SPECIALIZATIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="field" aria-label={t.filter.hospital} value={f.hospital} onChange={(e) => setF({ ...f, hospital: e.target.value })}>
            <option value="">{t.filter.hospitalPh}</option>{HOSPITALS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <input type="date" className="field" aria-label={t.filter.date} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-3 font-semibold text-primary-foreground"><Search className="h-4 w-4" />{t.filter.search}</button>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28">
        <div className="text-center"><Eyebrow>{t.services.eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.services.title}</h2></div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => { const I = icons[i]; return (
            <div key={s.t} className="group rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-glow">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><I className="h-5 w-5" /></span>
              <h3 className="mt-5 font-bold">{s.t}</h3><p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>); })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-28 lg:grid-cols-2">
        <img src={aboutImg} alt="Doctor wearing a headset" loading="lazy" className="rounded-3xl border shadow-card" />
        <div>
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.about.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.about.body}</p>
          <ul className="mt-6 space-y-3">{t.about.points.map((p) => <li key={p} className="flex items-center gap-3"><Check className="h-5 w-5 text-primary" />{p}</li>)}</ul>
          <Link to="/about" className="mt-8 inline-block rounded-full border px-6 py-3 font-semibold hover:bg-secondary">{t.about.btn}</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28">
        <div className="text-center"><Eyebrow>{t.testi.eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.testi.title}</h2></div>
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {t.testi.items.map((x) => (
            <figure key={x.n} className="mb-5 break-inside-avoid rounded-2xl border bg-card p-6">
              <Quote className="h-6 w-6 text-primary" /><blockquote className="mt-3">{x.q}</blockquote>
              <figcaption className="mt-4 text-sm"><b>{x.n}</b> <span className="text-muted-foreground">· {x.r}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28">
        <div className="text-center"><Eyebrow>{t.pricing.eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.pricing.title}</h2></div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((p, i) => (
            <div key={p.n} className={`relative rounded-3xl border p-8 ${i === 1 ? "bg-gradient-deep shadow-glow border-primary/50" : "bg-card"}`}>
              {i === 1 && <span className="absolute -top-3 left-8 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">{t.pricing.popular}</span>}
              <h3 className="text-xl font-bold">{p.n}</h3><p className="text-sm text-muted-foreground">{p.d}</p>
              <p className="mt-6 font-display text-4xl font-extrabold">{p.p}{p.p.startsWith("$") && <span className="text-base font-normal text-muted-foreground">{t.pricing.month}</span>}</p>
              <ul className="mt-6 space-y-2 text-sm">{p.f.map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-primary" />{x}</li>)}</ul>
              <Link to="/contact" className={`mt-8 block rounded-full py-3 text-center font-semibold ${i === 1 ? "bg-gradient-primary text-primary-foreground" : "border hover:bg-secondary"}`}>{t.pricing.choose}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-28">
        <div className="grid items-center gap-8 rounded-3xl border bg-card p-10 lg:grid-cols-[1fr_auto]">
          <div className="flex gap-5">
            <CalendarCheck className="h-12 w-12 shrink-0 text-primary" />
            <div><Eyebrow>{t.booking.eyebrow}</Eyebrow><h2 className="mt-3 text-2xl font-bold sm:text-3xl">{t.booking.title}</h2><p className="mt-2 text-muted-foreground">{t.booking.body}</p></div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/book" className="rounded-full bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground">{t.booking.btn1}</Link>
            <Link to="/book" search={{ tab: "manage" }} className="rounded-full border px-6 py-3 font-semibold hover:bg-secondary">{t.booking.btn2}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-deep p-12 text-center shadow-glow">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">{t.cta.title}</h2>
          <p className="relative mt-3 text-muted-foreground">{t.cta.body}</p>
          <Link to="/book" className="relative mt-8 inline-block rounded-full bg-gradient-primary px-8 py-3 font-semibold text-primary-foreground">{t.cta.btn}</Link>
        </div>
      </section>
    </>
  );
}

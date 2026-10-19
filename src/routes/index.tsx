import { createFileRoute, Link } from "@tanstack/react-router";
import { Video, Mic, Sparkles, ListChecks, Check, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Eyebrow, meta } from "@/components/site";
import { Button } from "@/components/ui/button";
import { DoctorSearch } from "@/components/doctor-search";
import { Testimonials, OnlineBooking, DemoVideo } from "@/components/home-sections";
import { BOOKING_URL } from "@/lib/booking";
import hero from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => meta("Avenset — AI meeting intelligence for healthcare", "Secure doctor video consultations with live transcription, AI summaries, decisions and action items."),
  component: Index,
});

const icons = [Video, Mic, Sparkles, ListChecks];

function Index() {
  const { t } = useI18n();
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
              <Button asChild size="lg"><a href={BOOKING_URL}>{t.hero.primary}<ArrowUpRight /></a></Button>
              <Link to="/product" className="rounded-[25px] border px-6 py-3 font-semibold hover:bg-secondary">{t.hero.secondary}</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
            <img src={hero} alt="Doctor on a secure video consultation" width={1200} height={900} className="relative rounded-3xl border shadow-card" />
          </div>
        </div>
      </section>

      <DoctorSearch />

      <section className="mx-auto max-w-7xl px-4 pt-16">
        <div className="text-center"><Eyebrow>{t.services.eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.services.title}</h2></div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => { const I = icons[i] ?? Video; return (
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
          <Link to="/about" className="mt-8 inline-block rounded-[25px] border px-6 py-3 font-semibold hover:bg-secondary">{t.about.btn}</Link>
        </div>
      </section>

      <Testimonials />

      <section className="mx-auto max-w-7xl px-4 pt-28">
        <div className="text-center"><Eyebrow>{t.pricing.eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.pricing.title}</h2></div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((p, i) => (
            <div key={p.n} className={`relative rounded-3xl border p-8 ${i === 1 ? "bg-gradient-deep shadow-glow border-primary/50" : "bg-card"}`}>
              {i === 1 && <span className="absolute -top-3 left-8 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold text-primary-foreground">{t.pricing.popular}</span>}
              <h3 className="text-xl font-bold">{p.n}</h3><p className="text-sm text-muted-foreground">{p.d}</p>
              <p className="mt-6 font-display text-4xl font-extrabold">{p.p}{p.p.startsWith("$") && <span className="text-base font-normal text-muted-foreground">{t.pricing.month}</span>}</p>
              <ul className="mt-6 space-y-2 text-sm">{p.f.map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-primary" />{x}</li>)}</ul>
              <Link to="/contact" className={`mt-8 block rounded-[25px] py-3 text-center font-semibold ${i === 1 ? "bg-gradient-primary text-primary-foreground" : "border hover:bg-secondary"}`}>{t.pricing.choose}</Link>
            </div>
          ))}
        </div>
      </section>

      <OnlineBooking />
      <DemoVideo />

      <section className="mx-auto max-w-7xl px-4 pt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-deep p-12 text-center shadow-glow">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <h2 className="relative text-3xl font-bold sm:text-4xl">{t.cta.title}</h2>
          <p className="relative mt-3 text-muted-foreground">{t.cta.body}</p>
          <Button asChild size="lg" className="relative mt-8"><a href={BOOKING_URL}>{t.cta.btn}<ArrowUpRight /></a></Button>
        </div>
      </section>
    </>
  );
}

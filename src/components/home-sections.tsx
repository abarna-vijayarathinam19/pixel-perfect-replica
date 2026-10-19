import { Quote, Film, ArrowUpRight, CalendarCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site";
import { useI18n } from "@/lib/i18n";
import { websiteCopy } from "@/lib/website-copy";
import { BOOKING_URL } from "@/lib/booking";
import aboutImg from "@/assets/about.jpg";
import hero from "@/assets/hero.jpg";

export function Testimonials() {
  const { t } = useI18n();
  return <section className="testimonial-band mt-24 py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-center"><Eyebrow>{t.testi.eyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-bold text-gradient sm:text-4xl">{t.testi.title}</h2></div>
      <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">{t.testi.items.map((item, index) => <figure key={item.n} className="testimonial-card mb-5 break-inside-avoid rounded-lg p-6">
        <Quote className="h-5 w-5 text-pale" />
        <blockquote className={`mt-4 text-base leading-relaxed ${index % 3 === 0 ? "pb-7" : "pb-2"}`}>{item.q}</blockquote>
        <figcaption className="mt-7 flex min-w-0 items-center gap-3"><span className={`avatar-tone-${index % 3} grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-xs font-bold`} aria-hidden="true">{item.n.replace(/^Dr\. /, "").split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div className="min-w-0"><p className="text-sm font-semibold">{item.n}</p><p className="mt-0.5 text-xs text-muted-foreground">{item.r}</p></div></figcaption>
      </figure>)}</div>
    </div>
  </section>;
}

export function OnlineBooking() {
  const { t } = useI18n();
  return <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-24 sm:px-6 lg:grid-cols-2 lg:gap-16">
    <img src={aboutImg} alt="Doctor ready for an online consultation" loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
    <div className="min-w-0"><CalendarCheck className="mb-5 h-9 w-9 text-primary" /><Eyebrow>{t.booking.eyebrow}</Eyebrow><h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">{t.booking.title}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{t.booking.body}</p><ul className="mt-6 space-y-3">{t.about.points.slice(0, 2).map((point) => <li key={point} className="flex gap-3 text-sm"><Check className="h-5 w-5 shrink-0 text-primary" />{point}</li>)}</ul><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><a href={BOOKING_URL}>{t.booking.btn1}<ArrowUpRight /></a></Button><Button asChild size="lg" variant="outline"><a href={BOOKING_URL}>{t.booking.btn2}</a></Button></div></div>
  </section>;
}

export function DemoVideo() {
  const { lang } = useI18n();
  const c = websiteCopy(lang);
  return <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
    <div className="text-center"><Eyebrow>Avenset</Eyebrow><h2 className="mt-4 text-3xl font-bold sm:text-4xl">{c.demo}</h2><p className="mt-4 text-muted-foreground">{c.demoSub}</p></div>
    <div className="demo-frame relative mx-auto mt-10 aspect-video max-w-5xl overflow-hidden rounded-lg"><img src={hero} alt="Avenset video consultation preview" loading="lazy" className="h-full w-full object-cover" /><div className="media-shade absolute inset-0" /><div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center text-hero-foreground"><span className="grid h-16 w-16 place-items-center rounded-full border border-hero-foreground/30 bg-hero-foreground/10 backdrop-blur-sm"><Film className="h-7 w-7" /></span><p className="font-display text-lg font-semibold sm:text-xl">{c.pendingVideo}</p></div></div>
  </section>;
}
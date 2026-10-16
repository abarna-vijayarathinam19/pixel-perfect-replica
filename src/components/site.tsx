import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Globe, Activity } from "lucide-react";
import { useI18n, LANGS, type Lang } from "@/lib/i18n";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow"><Activity className="h-4 w-4" /></span>
      Avenset
    </Link>
  );
}

export function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <label className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs">
      <Globe className="h-3.5 w-3.5 text-primary" />
      <select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value as Lang)} className="bg-transparent outline-none">
        {LANGS.map((l) => <option key={l.code} value={l.code} className="bg-popover">{l.label}</option>)}
      </select>
    </label>
  );
}

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", l: t.nav.home }, { to: "/about", l: t.nav.about }, { to: "/product", l: t.nav.product },
    { to: "/book", l: t.nav.book }, { to: "/contact", l: t.nav.contact },
  ] as const;
  return (
    <header className="sticky top-0 z-50 glass border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((x) => (
            <Link key={x.to} to={x.to} activeOptions={{ exact: true }} className="text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-primary" }}>{x.l}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <Link to="/book" className="rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">{t.nav.cta}</Link>
        </div>
        <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="flex flex-col gap-3 border-t px-4 py-4 lg:hidden">
          {links.map((x) => <Link key={x.to} to={x.to} onClick={() => setOpen(false)} className="text-sm">{x.l}</Link>)}
          <LangSwitch />
          <Link to="/book" onClick={() => setOpen(false)} className="rounded-full bg-gradient-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground">{t.nav.cta}</Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3"><Logo /><p className="text-sm text-muted-foreground">{t.footer.tag}</p></div>
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold">{t.footer.company}</h4>
          <Link to="/about" className="block text-muted-foreground hover:text-primary">{t.nav.about}</Link>
          <Link to="/product" className="block text-muted-foreground hover:text-primary">{t.nav.product}</Link>
          <Link to="/book" className="block text-muted-foreground hover:text-primary">{t.nav.book}</Link>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold">{t.footer.legal}</h4>
          <Link to="/privacy" className="block text-muted-foreground hover:text-primary">{t.footer.privacy}</Link>
          <Link to="/terms" className="block text-muted-foreground hover:text-primary">{t.footer.terms}</Link>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold">{t.footer.contact}</h4>
          <p className="text-muted-foreground">hello@avenset.com</p>
          <p className="text-muted-foreground">+94 11 234 5678</p>
          <Link to="/contact" className="block text-primary">{t.nav.contact} →</Link>
        </div>
      </div>
      <p className="border-t py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Avenset. {t.footer.rights}</p>
    </footer>
  );
}

export function PageHero({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-spotlight" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl text-gradient">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-full border bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">{children}</span>;
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

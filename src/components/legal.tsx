import { useI18n } from "@/lib/i18n";
import { PageHero } from "@/components/site";

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useI18n();
  const l = t.legal;
  return (
    <>
      <PageHero title={kind === "privacy" ? l.privacyT : l.termsT} sub={l.updated} />
      <article className="mx-auto max-w-3xl space-y-6 px-4">
        {l[kind].map((s) => <section key={s.h} className="rounded-2xl border bg-card p-6"><h2 className="text-xl font-bold text-primary">{s.h}</h2><p className="mt-2 text-muted-foreground">{s.p}</p></section>)}
      </article>
    </>
  );
}

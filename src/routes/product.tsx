import { createFileRoute } from "@tanstack/react-router";
import { FileText, AudioLines, ScrollText, Gavel, ListTodo, ClipboardCheck, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHero, meta } from "@/components/site";

export const Route = createFileRoute("/product")({
  head: () => meta("Avenset Platform — Transcripts, summaries & action items", "Consultation records, transcripts, AI summaries, decisions, action items and review activity in one workspace."),
  component: Product,
});

const icons = [FileText, AudioLines, ScrollText, Gavel, ListTodo, ClipboardCheck];

function Product() {
  const { t } = useI18n();
  const p = t.productPage;
  return (
    <>
      <PageHero title={p.title} sub={p.sub} />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {p.features.map((f, i) => { const I = icons[i]; return (
          <div key={f.t} className="rounded-2xl border bg-card p-6 transition hover:shadow-glow"><I className="h-7 w-7 text-primary" /><h3 className="mt-4 font-bold">{f.t}</h3><p className="mt-2 text-sm text-muted-foreground">{f.d}</p></div>); })}
      </section>
      <section className="mx-auto max-w-5xl px-4 pt-24">
        <h2 className="text-center text-3xl font-bold">{p.archT}</h2>
        <div className="mt-10 space-y-3">
          {p.arch.map((a, i) => (
            <div key={a.t} className="flex items-start gap-4 rounded-2xl border bg-card p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-primary font-bold text-primary-foreground">{i + 1}</span>
              <div><h3 className="font-bold">{a.t}</h3><p className="text-sm text-muted-foreground">{a.d}</p></div>
            </div>
          ))}
        </div>
        <p className="mt-6 flex gap-2 rounded-xl border border-primary/30 bg-accent/30 p-4 text-sm text-muted-foreground"><Info className="h-5 w-5 shrink-0 text-primary" />{p.archNote}</p>
      </section>
    </>
  );
}

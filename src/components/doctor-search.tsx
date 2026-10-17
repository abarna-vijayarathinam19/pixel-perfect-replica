import { useState } from "react";
import { Search, ArrowUpRight, RotateCcw, Stethoscope, Building2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { websiteCopy } from "@/lib/website-copy";
import { HOSPITALS, SPECIALIZATIONS } from "@/lib/doctors";
import { filterDoctors, type DoctorFilters } from "@/lib/doctor-filter";
import { BOOKING_URL } from "@/lib/booking";

const empty: DoctorFilters = { doctor: "", spec: "", hospital: "", date: "" };

export function DoctorSearch() {
  const { t, lang } = useI18n();
  const c = websiteCopy(lang);
  const [filters, setFilters] = useState(empty);
  const [submitted, setSubmitted] = useState<DoctorFilters | null>(null);
  const results = submitted ? filterDoctors(submitted) : [];
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <form className="doctor-search grid items-end gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr_auto]" onSubmit={(event) => { event.preventDefault(); setSubmitted({ ...filters }); }}>
        <label className="min-w-0 space-y-2 text-sm"><span className="flex items-center gap-2 font-medium"><Stethoscope className="h-4 w-4 text-primary" />{t.filter.doctor}</span><input className="field" placeholder={t.filter.doctorPh} value={filters.doctor} onChange={(e) => setFilters({ ...filters, doctor: e.target.value })} /></label>
        <label className="min-w-0 space-y-2 text-sm"><span className="block font-medium">{t.filter.spec}</span><select className="field" value={filters.spec} onChange={(e) => setFilters({ ...filters, spec: e.target.value })}><option value="">{t.filter.specPh}</option>{SPECIALIZATIONS.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="min-w-0 space-y-2 text-sm"><span className="flex items-center gap-2 font-medium"><Building2 className="h-4 w-4 text-primary" />{t.filter.hospital}</span><select className="field" value={filters.hospital} onChange={(e) => setFilters({ ...filters, hospital: e.target.value })}><option value="">{t.filter.hospitalPh}</option>{HOSPITALS.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="min-w-0 space-y-2 text-sm"><span className="flex items-center gap-2 font-medium"><CalendarDays className="h-4 w-4 text-primary" />{t.filter.date}</span><input type="date" className="field" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} /></label>
        <Button type="submit" size="lg" className="h-12 w-full whitespace-normal xl:w-auto"><Search />{t.filter.search}</Button>
      </form>
      {submitted && <div className="mt-6" aria-live="polite">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><h2 className="min-w-0 font-semibold">{c.results} · {results.length}{submitted.date && <span className="ml-3 text-sm font-normal text-muted-foreground">{submitted.date}</span>}</h2><Button variant="ghost" size="icon" title={c.clear} aria-label={c.clear} onClick={() => { setFilters(empty); setSubmitted(null); }}><RotateCcw /></Button></div>
        {results.length === 0 ? <p className="py-6 text-muted-foreground">{c.noResults}</p> : <div className="mt-3 grid gap-3 md:grid-cols-2">{results.map((doctor) => <article key={doctor.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border bg-card p-4"><div className="min-w-0"><h3 className="font-semibold">{doctor.name}</h3><p className="mt-1 text-sm text-primary">{doctor.spec}</p><p className="mt-1 text-sm text-muted-foreground">{doctor.hospital}</p></div><Button asChild variant="outline" size="icon"><a href={BOOKING_URL} aria-label={`${t.booking.btn1}: ${doctor.name}`}><ArrowUpRight /></a></Button></article>)}</div>}
      </div>}
    </section>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PageHero, meta } from "@/components/site";
import { DOCTORS, HOSPITALS, SPECIALIZATIONS, TIMES } from "@/lib/doctors";
import { createAppointment, deleteAppointment, findAppointment, getBookedSlots, updateAppointment } from "@/lib/appointments.functions";

const search = z.object({
  tab: z.enum(["new", "manage"]).optional(),
  doctor: z.string().optional(), spec: z.string().optional(), hospital: z.string().optional(), date: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: search,
  head: () => meta("Book an Appointment — Avenset", "Book, reschedule or cancel an online video consultation with a doctor in minutes."),
  component: Book,
});

type Appt = { full_name: string; email: string; phone: string; doctor: string; specialization: string; hospital: string; appointment_date: string; appointment_time: string; notes: string | null; ref_code: string; status: string };
const today = () => new Date().toISOString().slice(0, 10);

function Book() {
  const s = Route.useSearch();
  const { t } = useI18n();
  const [tab, setTab] = useState<"new" | "manage">(s.tab ?? "new");
  const b = t.bookPage;
  return (
    <>
      <PageHero title={b.title} sub={b.sub} />
      <section className="mx-auto max-w-3xl px-4">
        <div className="mb-6 flex rounded-full border bg-card p-1">
          {(["new", "manage"] as const).map((k) => (
            <button key={k} onClick={() => setTab(k)} className={`flex-1 rounded-full py-2 text-sm font-semibold ${tab === k ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground"}`}>{k === "new" ? b.tabNew : b.tabManage}</button>
          ))}
        </div>
        {tab === "new" ? <NewBooking init={s} /> : <Manage />}
      </section>
    </>
  );
}

function initialFrom(init: z.infer<typeof search>) {
  const match = DOCTORS.find((d) => (init.doctor && d.name.toLowerCase().includes(init.doctor.toLowerCase())) || (!init.doctor && (init.spec ? d.spec === init.spec : true) && (init.hospital ? d.hospital === init.hospital : false)));
  return {
    doctor: match?.name ?? "", specialization: match?.spec ?? init.spec ?? "", hospital: match?.hospital ?? init.hospital ?? "",
    appointment_date: init.date && init.date >= today() ? init.date : "", appointment_time: "", notes: "",
  };
}

function AppointmentFields({ v, set }: { v: ReturnType<typeof initialFrom>; set: (p: Partial<ReturnType<typeof initialFrom>>) => void }) {
  const { t } = useI18n();
  const b = t.bookPage;
  const [booked, setBooked] = useState<string[]>([]);
  useEffect(() => {
    if (!v.doctor || !v.appointment_date) { setBooked([]); return; }
    getBookedSlots({ data: { doctor: v.doctor, date: v.appointment_date } }).then((r) => setBooked(r.map((x) => x.slice(0, 5)))).catch(() => setBooked([]));
  }, [v.doctor, v.appointment_date]);
  const docs = useMemo(() => DOCTORS.filter((d) => (!v.specialization || d.spec === v.specialization) && (!v.hospital || d.hospital === v.hospital)), [v.specialization, v.hospital]);
  return (
    <>
      <Field label={b.spec}><select className="field" value={v.specialization} onChange={(e) => set({ specialization: e.target.value, doctor: "" })}><option value="">—</option>{SPECIALIZATIONS.map((x) => <option key={x}>{x}</option>)}</select></Field>
      <Field label={b.hospital}><select className="field" value={v.hospital} onChange={(e) => set({ hospital: e.target.value, doctor: "" })}><option value="">—</option>{HOSPITALS.map((x) => <option key={x}>{x}</option>)}</select></Field>
      <Field label={b.doctor} full>
        <select className="field" required value={v.doctor} onChange={(e) => { const d = DOCTORS.find((x) => x.name === e.target.value); set({ doctor: e.target.value, ...(d ? { specialization: d.spec, hospital: d.hospital } : {}) }); }}>
          <option value="">—</option>{(docs.length ? docs : DOCTORS).map((d) => <option key={d.name} value={d.name}>{d.name} · {d.spec} · {d.hospital}</option>)}
        </select>
      </Field>
      <Field label={b.date}><input type="date" min={today()} required className="field" value={v.appointment_date} onChange={(e) => set({ appointment_date: e.target.value, appointment_time: "" })} /></Field>
      <Field label={b.time}>
        <select className="field" required value={v.appointment_time} onChange={(e) => set({ appointment_time: e.target.value })}>
          <option value="">—</option>{TIMES.map((x) => <option key={x} value={x} disabled={booked.includes(x)}>{x}{booked.includes(x) ? " ✕" : ""}</option>)}
        </select>
      </Field>
      <Field label={b.notes} full><textarea rows={3} maxLength={1000} className="field" value={v.notes} onChange={(e) => set({ notes: e.target.value })} /></Field>
    </>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return <label className={`block space-y-1.5 text-sm ${full ? "sm:col-span-2" : ""}`}><span className="text-muted-foreground">{label}</span>{children}</label>;
}

function NewBooking({ init }: { init: z.infer<typeof search> }) {
  const { t } = useI18n();
  const b = t.bookPage;
  const [who, setWho] = useState({ full_name: "", email: "", phone: "" });
  const [v, setV] = useState(() => initialFrom(init));
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  if (done) return (
    <div className="rounded-3xl border bg-card p-10 text-center shadow-glow">
      <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
      <h2 className="mt-4 text-2xl font-bold">{b.success}</h2>
      <p className="mt-4 text-sm text-muted-foreground">{b.refLabel}</p>
      <p className="font-display text-4xl font-extrabold tracking-widest text-gradient">{done}</p>
      <p className="mt-3 text-sm text-muted-foreground">{b.refHint}</p>
      <button onClick={() => { setDone(null); setV(initialFrom({})); }} className="mt-6 rounded-full border px-6 py-2 text-sm font-semibold">{b.another}</button>
    </div>
  );
  return (
    <form className="grid gap-4 rounded-3xl border bg-card p-6 sm:grid-cols-2 sm:p-8" onSubmit={async (e) => {
      e.preventDefault();
      if (!who.full_name || !who.email || !who.phone || !v.doctor || !v.appointment_date || !v.appointment_time) return toast.error(b.required);
      if (v.appointment_date < today()) return toast.error(b.pastDate);
      setSaving(true);
      try {
        const r = await createAppointment({ data: { ...who, ...v, notes: v.notes || null } });
        if (!r.ok) toast.error(b.taken); else setDone(r.appointment.ref_code);
      } catch { toast.error(b.required); } finally { setSaving(false); }
    }}>
      <Field label={b.name} full><input className="field" required maxLength={120} value={who.full_name} onChange={(e) => setWho({ ...who, full_name: e.target.value })} /></Field>
      <Field label={b.email}><input type="email" className="field" required maxLength={255} value={who.email} onChange={(e) => setWho({ ...who, email: e.target.value })} /></Field>
      <Field label={b.phone}><input type="tel" className="field" required minLength={5} maxLength={30} value={who.phone} onChange={(e) => setWho({ ...who, phone: e.target.value })} /></Field>
      <AppointmentFields v={v} set={(p) => setV((o) => ({ ...o, ...p }))} />
      <button disabled={saving} className="rounded-full bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-glow disabled:opacity-60 sm:col-span-2">{saving ? b.saving : b.submit}</button>
    </form>
  );
}

function Manage() {
  const { t } = useI18n();
  const b = t.bookPage;
  const [auth, setAuth] = useState({ email: "", ref_code: "" });
  const [appt, setAppt] = useState<Appt | null>(null);
  const [v, setV] = useState(() => initialFrom({}));
  const [busy, setBusy] = useState(false);
  const load = (a: Appt) => { setAppt(a); setV({ doctor: a.doctor, specialization: a.specialization, hospital: a.hospital, appointment_date: a.appointment_date, appointment_time: a.appointment_time.slice(0, 5), notes: a.notes ?? "" }); };
  if (!appt) return (
    <form className="grid gap-4 rounded-3xl border bg-card p-6 sm:grid-cols-2 sm:p-8" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true);
      try { const r = await findAppointment({ data: auth }); if (r) load(r as Appt); else toast.error(b.notFound); } catch { toast.error(b.notFound); } finally { setBusy(false); }
    }}>
      <h2 className="text-xl font-bold sm:col-span-2">{b.lookupT}</h2>
      <Field label={b.email}><input type="email" required className="field" value={auth.email} onChange={(e) => setAuth({ ...auth, email: e.target.value })} /></Field>
      <Field label={b.ref}><input required className="field uppercase" maxLength={16} value={auth.ref_code} onChange={(e) => setAuth({ ...auth, ref_code: e.target.value })} /></Field>
      <button disabled={busy} className="rounded-full bg-gradient-primary py-3 font-semibold text-primary-foreground sm:col-span-2">{b.find}</button>
    </form>
  );
  return (
    <form className="grid gap-4 rounded-3xl border bg-card p-6 sm:grid-cols-2 sm:p-8" onSubmit={async (e) => {
      e.preventDefault();
      if (v.appointment_date < today()) return toast.error(b.pastDate);
      setBusy(true);
      try {
        const r = await updateAppointment({ data: { ...auth, ...v, notes: v.notes || null } });
        if (r.ok) { load(r.appointment as Appt); toast.success(b.updated); } else toast.error(r.error === "taken" ? b.taken : b.notFound);
      } finally { setBusy(false); }
    }}>
      <div className="flex flex-wrap items-center justify-between gap-2 sm:col-span-2">
        <h2 className="text-xl font-bold">{appt.full_name} · <span className="text-gradient">{appt.ref_code}</span></h2>
        <span className="rounded-full bg-accent px-3 py-1 text-xs">{b.status}: {appt.status}</span>
      </div>
      <AppointmentFields v={v} set={(p) => setV((o) => ({ ...o, ...p }))} />
      <button disabled={busy} className="rounded-full bg-gradient-primary py-3 font-semibold text-primary-foreground">{b.update}</button>
      <button type="button" disabled={busy} className="rounded-full border border-destructive py-3 font-semibold text-destructive" onClick={async () => {
        if (!confirm(b.confirmCancel)) return;
        setBusy(true);
        try { const r = await deleteAppointment({ data: auth }); if (r.ok) { toast.success(b.cancelled); setAppt(null); setAuth({ email: "", ref_code: "" }); } } finally { setBusy(false); }
      }}>{b.cancel}</button>
    </form>
  );
}

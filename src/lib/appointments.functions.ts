import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const base = {
  doctor: z.string().trim().min(1).max(120),
  specialization: z.string().trim().min(1).max(120),
  hospital: z.string().trim().min(1).max(160),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  appointment_time: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().trim().max(1000).optional().nullable(),
};

const createSchema = z.object({
  ...base,
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
});

const authSchema = z.object({
  email: z.string().trim().email().max(255),
  ref_code: z.string().trim().min(4).max(16),
});

const cols = "id, ref_code, full_name, email, phone, doctor, specialization, hospital, appointment_date, appointment_time, notes, status, created_at";

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function slotTaken(db: Awaited<ReturnType<typeof admin>>, doctor: string, date: string, time: string, excludeId?: string) {
  let q = db.from("appointments").select("id").eq("doctor", doctor).eq("appointment_date", date).eq("appointment_time", time);
  if (excludeId) q = q.neq("id", excludeId);
  const { data } = await q.limit(1);
  return (data?.length ?? 0) > 0;
}

export const getBookedSlots = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ doctor: z.string().max(120), date: z.string().max(10) }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: rows } = await db.from("appointments").select("appointment_time").eq("doctor", data.doctor).eq("appointment_date", data.date);
    return (rows ?? []).map((r) => r.appointment_time);
  });

export const createAppointment = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => createSchema.parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    if (await slotTaken(db, data.doctor, data.appointment_date, data.appointment_time)) return { ok: false as const, error: "taken" };
    const { data: row, error } = await db.from("appointments").insert({ ...data, notes: data.notes ?? null, email: data.email.toLowerCase() }).select(cols).single();
    if (error) throw new Error(error.message);
    return { ok: true as const, appointment: row };
  });

export const findAppointment = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => authSchema.parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: row } = await db.from("appointments").select(cols).eq("email", data.email.toLowerCase()).eq("ref_code", data.ref_code.toUpperCase()).maybeSingle();
    return row ?? null;
  });

export const updateAppointment = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => authSchema.extend(base).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { email, ref_code, ...fields } = data;
    const { data: existing } = await db.from("appointments").select("id").eq("email", email.toLowerCase()).eq("ref_code", ref_code.toUpperCase()).maybeSingle();
    if (!existing) return { ok: false as const, error: "notFound" };
    if (await slotTaken(db, fields.doctor, fields.appointment_date, fields.appointment_time, existing.id)) return { ok: false as const, error: "taken" };
    const { data: row, error } = await db.from("appointments").update({ ...fields, notes: fields.notes ?? null, status: "rescheduled", updated_at: new Date().toISOString() }).eq("id", existing.id).select(cols).single();
    if (error) throw new Error(error.message);
    return { ok: true as const, appointment: row };
  });

export const deleteAppointment = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => authSchema.parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const { error, count } = await db.from("appointments").delete({ count: "exact" }).eq("email", data.email.toLowerCase()).eq("ref_code", data.ref_code.toUpperCase());
    if (error) throw new Error(error.message);
    return { ok: (count ?? 0) > 0 };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      name: z.string().trim().min(1).max(120),
      email: z.string().trim().email().max(255),
      subject: z.string().trim().max(200).optional(),
      message: z.string().trim().min(1).max(3000),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const { error } = await db.from("contact_submissions").insert({ ...data, subject: data.subject ?? null });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

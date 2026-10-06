import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  es_mar_del_plata: z.boolean(),
  telefono: z.string().trim().max(30).regex(/^[0-9+()\s-]*$/).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d) => leadSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("simulador_leads")
      .insert({ ...data, telefono: data.telefono || null, email: data.email.toLowerCase() })
      .select("id")
      .single();
    if (error || !row) throw new Error("No se pudo guardar el lead");
    return { id: row.id };
  });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const FROM = "ABC Conducción <avisos@abcconduccion.com.ar>"; // dominio verificado en Resend
const TO = "abconduccion@gmail.com";

export const notifyLead = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ id: z.string().uuid(), examen: z.string().trim().max(60).optional() }).parse(d),
  )
  .handler(async ({ data }) => {
    console.log(`[notifyLead] inicio lead=${data.id} examen=${data.examen ?? "-"}`);
    const key = process.env["RESEND_API_KEY"];
    if (!key) {
      console.error("[notifyLead] RESEND_API_KEY no configurada");
      throw new Error("RESEND_API_KEY no configurada");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead, error: dbError } = await supabaseAdmin
      .from("simulador_leads")
      .select("nombre,email,telefono,es_mar_del_plata,created_at")
      .eq("id", data.id)
      .maybeSingle();
    if (dbError) {
      console.error("[notifyLead] error leyendo lead:", dbError);
      throw new Error(`No se pudo leer el lead: ${dbError.message}`);
    }
    // Only notify for freshly created leads (prevents replay spam)
    if (!lead || Date.now() - new Date(lead.created_at).getTime() > 10 * 60 * 1000) {
      console.warn(`[notifyLead] lead ${data.id} inexistente o antiguo; no se envía`);
      return { sent: false };
    }
    const fecha = new Date(lead.created_at).toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
    });
    const html = `<h2>Nuevo lead del Simulador Teórico</h2>
<p><b>Nombre:</b> ${esc(lead.nombre)}</p>
<p><b>Email:</b> ${esc(lead.email)}</p>
<p><b>Teléfono / WhatsApp:</b> ${lead.telefono ? esc(lead.telefono) : "No informado"}</p>
<p><b>Ubicación:</b> ${lead.es_mar_del_plata ? "Sí, Mar del Plata" : "No / Otra localidad"}</p>
<p><b>Examen seleccionado:</b> ${data.examen ? esc(data.examen) : "No informado"}</p>
<p><b>Fecha:</b> ${esc(fecha)}</p>`;
    let res: Response;
    try {
      res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: FROM, to: [TO], subject: "¡Nuevo Lead! - Simulador Teórico", html }),
      });
    } catch (err) {
      console.error("[notifyLead] fallo de red llamando a Resend:", err);
      throw err;
    }
    const body = await res.text();
    if (!res.ok) {
      console.error(`[notifyLead] Resend error [${res.status}]: ${body}`);
      throw new Error(`Resend failed [${res.status}]: ${body}`);
    }
    console.log(`[notifyLead] Resend OK [${res.status}] to=${TO}: ${body}`);
    return { sent: true, status: res.status, resend: body };
  });

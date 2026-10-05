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

export const notifyLead = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const key = process.env["RESEND_API_KEY"];
    if (!key) throw new Error("RESEND_API_KEY no configurada");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead } = await supabaseAdmin
      .from("simulador_leads")
      .select("nombre,email,telefono,es_mar_del_plata,created_at")
      .eq("id", data.id)
      .maybeSingle();
    // Only notify for freshly created leads (prevents replay spam)
    if (!lead || Date.now() - new Date(lead.created_at).getTime() > 10 * 60 * 1000) {
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
<p><b>Fecha:</b> ${esc(fecha)}</p>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "ABC Conducción <avisos@abcconduccion.com.ar>",
        to: ["abconduccion@hotmail.com"],
        subject: "¡Nuevo Lead! - Simulador Teórico",
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend failed [${res.status}]: ${body}`);
      throw new Error(`Resend failed [${res.status}]: ${body}`);
    }
    return { sent: true };
  });

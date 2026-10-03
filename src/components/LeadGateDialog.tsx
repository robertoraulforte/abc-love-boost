import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { submitLead, notifyLead } from "@/lib/leads.functions";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const LEAD_STORAGE_KEY = "abc_simulador_lead_ok";

const schema = z.object({
  nombre: z.string().trim().min(2, "Ingresá tu nombre y apellido").max(120),
  email: z.string().trim().email("Ingresá un correo válido").max(255),
  mdp: z.enum(["si", "no"], { message: "Elegí una opción" }),
});

export default function LeadGateDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSuccess: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ nombre, email, mdp });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisá los datos");
      return;
    }
    setError(null);
    setSending(true);
    let leadId: string;
    try {
      const r = await submitLead({
        data: {
          nombre: parsed.data.nombre,
          email: parsed.data.email,
          es_mar_del_plata: parsed.data.mdp === "si",
        },
      });
      leadId = r.id;
    } catch {
      setSending(false);
      toast.error("No pudimos registrar tus datos. Intentá de nuevo.");
      return;
    }
    setSending(false);
    // Background notification: never blocks the exam
    notifyLead({ data: { id: leadId } }).catch((err) => console.error("notifyLead", err));
    trackEvent("lead_simulador_submitted", {
      ubicacion: parsed.data.mdp === "si" ? "Sí" : "No / Otra localidad",
    });
    try {
      localStorage.setItem(LEAD_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    onSuccess();
  };

  const field =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-smooth focus:border-primary";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">Antes de empezar</DialogTitle>
          <DialogDescription>
            Completá tus datos para acceder al Simulador Teórico.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          <label className="grid gap-1.5 text-sm font-semibold">
            Nombre y Apellido
            <input className={field} value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={120} required autoComplete="name" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Correo Electrónico
            <input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} required autoComplete="email" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            ¿Sos de Mar del Plata?
            <select className={field} value={mdp} onChange={(e) => setMdp(e.target.value)} required>
              <option value="" disabled>Seleccioná una opción</option>
              <option value="si">Sí</option>
              <option value="no">No / Otra localidad</option>
            </select>
          </label>
          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
          <Button
            type="submit"
            size="lg"
            disabled={sending}
            className="gradient-primary font-black uppercase tracking-wide text-primary-foreground"
          >
            {sending ? "Enviando..." : "Iniciar Simulador Teórico"}
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Al hacer clic en 'Iniciar Simulador Teórico', aceptas recibir promociones, novedades y
            ofertas exclusivas de ABC Conducción en tu correo electrónico.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { useState, type ReactNode } from "react";
import { MessageCircle, MapPin, Navigation } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ZONES, waUrl } from "@/lib/whatsapp";

interface ZoneDialogProps {
  trigger: ReactNode;
  /** Optional override; by default each zone uses its own tailored message. */
  message?: string;
  title?: string;
}

const ZoneDialog = ({
  trigger,
  message,
  title = "1. Seleccioná tu zona",
}: ZoneDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>
            Elegí la zona donde vivís y te conectamos automáticamente con la
            sucursal de tu área por WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 pt-2">
          {ZONES.map((z, i) => {
            const Icon = i === 0 ? MapPin : Navigation;
            return (
              <a
                key={z.id}
                href={waUrl(z.phone, message ?? z.message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-smooth hover:border-primary hover:shadow-elegant"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-extrabold text-foreground">
                    {z.label}
                  </p>
                  <p className="text-sm">
                    WhatsApp:{" "}
                    <span className="font-bold text-foreground">
                      {z.display}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {z.barrios}
                  </p>
                </div>
                <MessageCircle className="h-5 w-5 shrink-0 text-[oklch(0.7_0.17_145)]" />
              </a>
            );
          })}
        </div>

        <p className="pt-1 text-center text-xs text-muted-foreground">
          Te conectamos con la sucursal más cercana a tu domicilio.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ZoneDialog;

import { useState, type ReactNode } from "react";
import { MessageCircle, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WHATSAPP_MESSAGE, ZONES, waUrl } from "@/lib/whatsapp";

interface ZoneDialogProps {
  trigger: ReactNode;
  message?: string;
  title?: string;
}

const ZoneDialog = ({
  trigger,
  message = WHATSAPP_MESSAGE,
  title = "Elegí tu zona",
}: ZoneDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Te conectamos al WhatsApp de la sucursal más cercana.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 pt-2">
          {ZONES.map((z) => (
            <a
              key={z.id}
              href={waUrl(z.phone, message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-smooth hover:border-primary hover:shadow-elegant"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">{z.label}</p>
                <p className="text-xs text-muted-foreground">{z.display}</p>
              </div>
              <MessageCircle className="h-5 w-5 text-[oklch(0.7_0.17_145)]" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoneDialog;

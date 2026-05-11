import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";

const Contact = () => {
  return (
    <section id="contacto" className="bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-card md:p-12">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Hablemos
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            ¿Listo para arrancar?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Escribinos por WhatsApp y un asesor te responde al instante.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ZoneDialog
              trigger={
                <Button
                  size="lg"
                  className="bg-[oklch(0.7_0.17_145)] font-black uppercase tracking-wide text-white hover:bg-[oklch(0.65_0.17_145)]"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consultar por WhatsApp
                </Button>
              }
            />
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <a
              href="https://instagram.com/abc_conduccion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-smooth hover:border-primary hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com/AbcConduccion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-smooth hover:border-primary hover:text-primary"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

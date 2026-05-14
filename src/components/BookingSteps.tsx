import { CheckCircle, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";

const steps = [
  {
    icon: CheckCircle,
    title: "Elegí tu curso",
    description: "Seleccioná el plan que mejor se adapte a tu nivel.",
  },
  {
    icon: MessageSquare,
    title: "Contactanos",
    description: "Coordiná días y horarios por WhatsApp.",
  },
  {
    icon: MapPin,
    title: "¡Empezá a manejar!",
    description: "Te buscamos por tu domicilio para tu primera clase.",
  },
];

const BookingSteps = () => {
  return (
    <section id="como-contratar" className="scroll-mt-24 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Cómo contratar
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Empezá en 3 simples pasos
          </h2>
          <p className="mt-3 text-muted-foreground">
            Un proceso simple y rápido para que arranques a manejar cuanto antes.
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="relative flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-foreground text-xs font-black text-background">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                {i === 0 && (
                  <a
                    href="#cursos"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary underline-offset-4 transition-smooth hover:underline"
                  >
                    Ver cursos →
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <ZoneDialog
            trigger={
              <Button
                size="lg"
                className="bg-primary font-black uppercase tracking-wide text-primary-foreground hover:bg-primary/90 shadow-elegant"
              >
                Quiero empezar ahora
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;

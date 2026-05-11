import { MessageCircle, Calendar, Car, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Contactanos",
    desc: "Escribinos por WhatsApp y te asesoramos sobre el curso ideal.",
  },
  {
    icon: Calendar,
    title: "2. Inscripción Online",
    desc: "Completá tu inscripción de forma rápida y 100% online.",
  },
  {
    icon: Car,
    title: "3. Aprendé a manejar",
    desc: "Clases prácticas en auto moderno con instructor matriculado.",
  },
  {
    icon: Trophy,
    title: "4. Sacá tu licencia",
    desc: "Te preparamos para el examen teórico y práctico municipal.",
  },
];

const HowToHire = () => {
  return (
    <section id="como-contratar" className="gradient-dark py-20 text-white md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-glow">
            ¿Cómo arrancar?
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">Cómo contratar</h2>
          <p className="mt-3 text-white/70">
            Empezar a manejar con nosotros es simple. Seguí estos pasos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-smooth hover:border-primary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
              </div>
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
                Empezar ahora
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default HowToHire;

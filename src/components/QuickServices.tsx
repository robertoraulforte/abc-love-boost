import { Clock, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";

const services = [
  {
    icon: Clock,
    title: "Clase Individual",
    duration: "45 min",
    desc: "Sumá una clase suelta cuando lo necesites, sin contratar un curso completo.",
    message:
      "Hola! Quiero consultar por una Clase Individual (45 min).",
  },
  {
    icon: Timer,
    title: "Sistema de Clases Doble",
    duration: "90 min",
    desc: "Aprovechá el doble de tiempo en una sola sesión para avanzar más rápido.",
    message:
      "Hola! Quiero consultar por el Sistema de Clases Doble (90 min).",
  },
];

const QuickServices = () => {
  return (
    <section className="pb-16 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant md:flex-row md:items-center"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black">{s.title}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                      {s.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
                <ZoneDialog
                  trigger={
                    <Button className="bg-primary font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90">
                      Consultar
                    </Button>
                  }
                  message={s.message}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickServices;

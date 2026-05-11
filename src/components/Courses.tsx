import { Car, GraduationCap, Repeat, Truck, Bike, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";

const courses = [
  {
    icon: GraduationCap,
    title: "Curso inicial",
    desc: "Para principiantes absolutos. Aprendé desde cero con un plan paso a paso.",
    badge: "+ Vendido",
  },
  {
    icon: Repeat,
    title: "Curso de práctica",
    desc: "Para quienes ya tienen nociones y necesitan ganar confianza al volante.",
  },
  {
    icon: Car,
    title: "Auto particular",
    desc: "Licencia clase B. Caja manual o automática, vos elegís.",
  },
  {
    icon: Truck,
    title: "Vehículos pesados",
    desc: "Preparación para clases C, D y E con autos y horarios disponibles.",
  },
  {
    icon: Bike,
    title: "Moto",
    desc: "Aprendé a manejar moto con seguridad y técnica defensiva.",
  },
  {
    icon: Clock,
    title: "Clases sueltas",
    desc: "Reservá clases individuales según tu disponibilidad horaria.",
  },
];

const Courses = () => {
  return (
    <section id="cursos" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Nuestros cursos
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Un curso para cada conductor
          </h2>
          <p className="mt-3 text-muted-foreground">
            Planes flexibles para que aprendas a tu ritmo, con instructores que se adaptan a vos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant"
              >
                {c.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                    {c.badge}
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                <ZoneDialog
                  trigger={
                    <Button variant="link" className="mt-3 h-auto p-0 font-bold text-primary">
                      Consultar →
                    </Button>
                  }
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;

import { Car, GraduationCap, Repeat, Bike, BookOpen, Home, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";

interface Course {
  icon: typeof Car;
  title: string;
  badge?: string;
  highlight?: boolean;
  extra?: string;
}

const courses: Course[] = [
  {
    icon: GraduationCap,
    title: "Curso 10 clases",
    badge: "+ Vendido",
  },
  {
    icon: Car,
    title: "Curso 16 clases",
    badge: "Completo",
    highlight: true,
    extra: "Vehículo sin cargo para rendir",
  },
  {
    icon: Repeat,
    title: "Clases sueltas",
  },
  {
    icon: Bike,
    title: "Moto",
  },
];

const commonBenefits = (
  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
    <li className="flex items-start gap-2">
      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <span>Incluye material teórico.</span>
    </li>
    <li className="flex items-start gap-2">
      <Home className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <span>Servicio a domicilio / Puntos de encuentro.</span>
    </li>
  </ul>
);

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

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className={`group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant ${
                  c.highlight ? "border-primary" : "border-border hover:border-primary"
                }`}
              >
                {c.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                    {c.badge}
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-black">{c.title}</h3>

                {commonBenefits}

                {c.extra && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/10 p-2.5 text-sm font-bold text-primary">
                    <Car className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      {c.extra}
                    </span>
                  </div>
                )}

                <ZoneDialog
                  trigger={
                    <Button variant="link" className="mt-4 h-auto p-0 font-bold text-primary">
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

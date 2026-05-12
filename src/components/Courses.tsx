import { Car, GraduationCap, Gauge, BookOpen, Home, Check, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";

interface Course {
  icon: typeof Car;
  level: string;
  classes: string;
  description: string;
  badge?: string;
  highlight?: boolean;
  extra?: string;
}

const courses: Course[] = [
  {
    icon: GraduationCap,
    level: "PRINCIPIANTE",
    classes: "16 clases",
    description:
      "Ideal para personas sin ningún tipo de experiencia ni conocimiento. Enseñanza de conducción en vía pública y maniobras específicas para la obtención de la licencia de conducir.",
    extra: "Auto Gratis para rendir",
  },
  {
    icon: Car,
    level: "INTERMEDIO",
    classes: "10 clases",
    description:
      "Destinado a personas sin conocimiento o escasa práctica. Enseñanza de conducción en vía pública y maniobras específicas para la obtención de la licencia de conducir.",
    badge: "Más elegido",
    highlight: true,
  },
  {
    icon: Gauge,
    level: "AVANZADO",
    classes: "6 clases",
    description:
      "Pensado para personas que requieran perfeccionar algún aspecto específico de manejo y aprender las maniobras del examen práctico.",
  },
  {
    icon: Target,
    level: "INTENSIVO",
    classes: "4 clases",
    description:
      "Pensado para personas que requieran aprender las maniobras específicas de examen para la obtención de la licencia de conducir.",
  },
];

const CommonBenefits = () => (
  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
    <li className="flex items-start gap-2 rounded-md bg-primary/5 px-2 py-1.5">
      <Check className="mt-0.5 h-5 w-5 shrink-0 stroke-[3] text-primary" />
      <span className="font-bold italic text-foreground">
        Servicio a domicilio o puntos de encuentro
      </span>
    </li>
    <li className="flex items-start gap-2">
      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span>Material teórico incluido.</span>
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
                key={c.level}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:red-glow ${
                  c.highlight
                    ? "border-primary red-glow"
                    : "border-border hover:border-primary"
                }`}
              >
                {c.badge && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-primary-foreground shadow-elegant">
                    <Sparkles className="h-3 w-3" />
                    {c.badge}
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-widest text-primary">
                  {c.level}
                </p>
                <h3 className="mt-1 text-2xl font-black">{c.classes}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>

                <CommonBenefits />

                {c.extra && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/10 p-2.5 text-sm font-bold text-primary">
                    <Check className="h-4 w-4 shrink-0 stroke-[3]" />
                    <Car className="h-4 w-4 shrink-0" />
                    <span>{c.extra}</span>
                  </div>
                )}

                <div className="mt-auto pt-4">
                  <ZoneDialog
                    trigger={
                      <Button variant="link" className="h-auto p-0 font-bold text-primary">
                        Consultar →
                      </Button>
                    }
                    message={`Hola! Quiero consultar por el curso ${c.level} (${c.classes}).`}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;

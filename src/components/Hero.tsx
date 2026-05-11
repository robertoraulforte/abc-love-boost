import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";
import heroImg from "@/assets/hero.jpg";

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-20">
      <img
        src={heroImg}
        alt="Estudiante feliz aprendiendo a manejar con ABC Conducción"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        width={1600}
        height={1067}
      />
      <div className="absolute inset-0 -z-10 gradient-hero" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
            <Star className="h-3.5 w-3.5 text-[oklch(0.85_0.18_95)]" />
            Escuela de manejo en Mar del Plata
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            Tu primera experiencia al volante,
            <br />
            <span className="text-primary-glow">bien acompañada.</span>
          </h1>

          <p className="mt-5 text-lg font-bold text-primary-glow md:text-xl">
            Formamos conductores, no solo alumnos.
          </p>

          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Clases personalizadas, instructores matriculados y autos modernos. Aprendé a manejar con
            confianza y seguridad, a tu ritmo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ZoneDialog
              trigger={
                <Button
                  size="lg"
                  className="bg-primary font-black uppercase tracking-wide text-primary-foreground hover:bg-primary/90 shadow-elegant"
                >
                  Inscribirme ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              }
            />
            <a href="#cursos">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
              >
                Ver cursos
              </Button>
            </a>
          </div>

          <ul className="mt-10 grid max-w-xl grid-cols-1 gap-3 text-sm font-medium text-white/90 sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary-glow" />
              Instructores matriculados
            </li>
            <li className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-glow" />
              +5.000 alumnos egresados
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary-glow" />
              2 sucursales en MdP
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;

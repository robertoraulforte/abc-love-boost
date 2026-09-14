import { ArrowRight, ShieldCheck, MapPin, Home, GraduationCap, Sparkles, Tag, Car, FileQuestion } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";
import heroImg from "@/assets/abc-mobi.jpg";
import { trackEvent } from "@/lib/analytics";

const benefits = [
  { icon: Car, label: "Vehículos doble comando" },
  { icon: Home, label: "Servicio a Domicilio" },
  { icon: MapPin, label: "Puntos de Encuentro" },
  { icon: GraduationCap, label: "Instructores Expertos" },
  { icon: Sparkles, label: "Clases adaptadas a vos" },
];

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-20">
      <img
        src={heroImg}
        alt="Auto escuela ABC Conducción - Fiat Mobi en Mar del Plata"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
        width={1600}
        height={1067}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,color-mix(in_oklab,var(--primary)_25%,transparent),transparent_60%)]" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl text-white">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-black uppercase tracking-wider text-primary-foreground shadow-elegant">
              <Home className="h-3.5 w-3.5" />
              Servicio a Domicilio
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-yellow)] px-3 py-1 text-xs font-black uppercase tracking-wider text-[var(--accent-yellow-foreground)] shadow-elegant">
              <ShieldCheck className="h-3.5 w-3.5" />
              Desde 2009
            </span>
          </div>

          <Link
            to="/examen-teorico"
            onClick={() => trackEvent("click_simulador_teorico", { ubicacion: "hero" })}
            className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-gradient-to-r from-primary/20 to-primary/5 px-4 py-2.5 text-sm font-bold text-white shadow-card backdrop-blur transition-smooth hover:border-primary hover:bg-primary/30 hover:red-glow sm:w-auto"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant">
              <FileQuestion className="h-3.5 w-3.5" />
            </span>
            <span className="truncate">✨ Practicá el Examen Teórico Online</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-primary-glow transition-transform group-hover:translate-x-1" />
          </Link>

          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            Tu primera experiencia al volante,
            <br />
            <span className="text-primary-glow">bien acompañada.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">
            Tu escuela de manejo en Mar del Plata. Aprendé a tu ritmo, con todo incluido.
          </p>

          <ul className="mt-6 grid max-w-2xl grid-cols-2 gap-3 text-sm font-semibold text-white/95 sm:grid-cols-3 lg:grid-cols-5">
            {benefits.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-xl border border-primary/30 bg-background/40 px-3 py-2 backdrop-blur transition-smooth hover:border-primary hover:red-glow"
              >
                <Icon className="h-5 w-5 shrink-0 text-primary-glow" />
                <span className="leading-tight">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ZoneDialog
              ubicacion="hero"
              trigger={
                <Button
                  size="lg"
                  className="gradient-primary animate-pulse-glow font-black uppercase tracking-wide text-primary-foreground hover:opacity-95"
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
            <a href="#promos">
              <Button
                size="lg"
                className="bg-[var(--accent-yellow)] font-black uppercase tracking-wide text-[var(--accent-yellow-foreground)] hover:bg-[var(--accent-yellow)]/90 shadow-elegant"
              >
                <Tag className="mr-2 h-5 w-5" />
                PROMOS
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { Car, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";
import autoTrailer from "@/assets/alquiler-auto-trailer.jpeg";
import { trackEvent } from "@/lib/analytics";

const features = [
  "Preparación y práctica para maniobras con remolque",
  "Habilitación para examen práctico Categoría B2",
  "Coordinación con tu turno municipal",
];

const CarTrailerIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 64 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role="img"
    aria-label="Auto con trailer"
  >
    {/* Auto */}
    <path d="M4 22v-5l4-1 3-4h8l4 5h4v5" />
    <circle cx="10" cy="24" r="3" />
    <circle cx="24" cy="24" r="3" />
    {/* Enganche */}
    <path d="M27 22h6" />
    {/* Trailer */}
    <path d="M33 22v-7h25v7" />
    <circle cx="45" cy="24" r="3" />
    <path d="M36 22h6M48 22h8" />
  </svg>
);

const RentalTrailer = () => {
  return (
    <section id="alquiler-trailer" className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-2 md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Car className="h-3.5 w-3.5" />
              Alquiler de vehículo con trailer
            </span>
            <h2 className="mt-3 text-3xl font-black uppercase md:text-4xl">
              <span className="flex items-center gap-3">
                <span>Alquiler de</span>
                <CarTrailerIcon className="h-9 w-16 text-red-600 md:h-11 md:w-20" />
              </span>
              <span>para examen</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Clases y alquiler de auto con trailer para examen de categoría B2.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ZoneDialog
                ubicacion="alquiler_trailer"
                trigger={
                  <Button
                    onClick={() => trackEvent("click_alquiler_trailer")}
                    className="bg-primary font-black uppercase tracking-wide text-primary-foreground hover:bg-primary/90 shadow-elegant"
                  >
                    Consultar alquiler
                  </Button>
                }
                message="¡Hola! Quiero consultar por el alquiler de auto con trailer para el examen de categoría B2."
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={autoTrailer}
              alt="Fiat Mobi rojo de ABC Conducción con trailer verde en la pista de examen categoría B2"
              loading="lazy"
              width={740}
              height={1280}
              className="h-64 w-full rounded-2xl object-cover object-center md:h-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalTrailer;

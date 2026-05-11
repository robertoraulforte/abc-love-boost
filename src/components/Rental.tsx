import { Car, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";

const features = [
  "Auto preparado con doble comando",
  "Disponible para rendir el examen práctico",
  "Coordinación con tu turno municipal",
  "Atención y traslado en Mar del Plata",
];

const Rental = () => {
  return (
    <section id="alquiler" className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-2 md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Car className="h-3.5 w-3.5" />
              Alquiler de Vehículo
            </span>
            <h2 className="mt-3 text-3xl font-black uppercase md:text-4xl">
              Alquiler de{" "}
              <span className="group/auto relative inline-block align-middle">
                <span className="inline-block transition-all duration-300 group-hover/auto:opacity-0 group-hover/auto:scale-75">
                  AUTO
                </span>
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover/auto:opacity-100 group-hover/auto:scale-125">
                  <Car className="h-8 w-8 text-red-600 md:h-10 md:w-10" strokeWidth={2.5} />
                </span>
              </span>{" "}
              para examen
            </h2>
            <p className="mt-3 text-muted-foreground">
              Si ya sabés manejar y solo necesitás un vehículo para el examen práctico, te
              acompañamos con un auto preparado.
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
                trigger={
                  <Button className="bg-primary font-black uppercase tracking-wide text-primary-foreground hover:bg-primary/90 shadow-elegant">
                    Consultar alquiler
                  </Button>
                }
              />
            </div>
          </div>
          <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8">
            <Car className="h-32 w-32 text-primary md:h-40 md:w-40" strokeWidth={1.25} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rental;

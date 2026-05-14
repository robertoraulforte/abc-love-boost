import { Car, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";
import fiatMobi from "@/assets/fiat-mobi.jpeg";

const features = [
  "Auto preparado con doble comando",
  "Disponible para rendir el examen práctico",
  "Coordinación con tu turno municipal",
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
            <h2 className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-3xl font-black uppercase md:text-4xl">
              <span>Alquiler de</span>
              <Car
                className="h-9 w-9 text-red-600 md:h-11 md:w-11"
                strokeWidth={2.5}
                aria-label="Auto"
              />
              <span>para examen</span>
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
          <div className="overflow-hidden rounded-2xl">
            <img
              src={fiatMobi}
              alt="Fiat Mobi negro de ABC Conducción con cartel Auto Escuela"
              loading="lazy"
              className="h-64 w-full rounded-2xl object-cover object-[30%_center] md:h-80 md:object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rental;

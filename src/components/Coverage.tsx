import { MapPin, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZONES, waUrl, trackZoneConversion } from "@/lib/whatsapp";
import { trackWhatsApp } from "@/lib/analytics";

const branches = [
  {
    ...ZONES[0],
    address: "Gascón 2508",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Gasc%C3%B3n+2508+Mar+del+Plata",
  },
  {
    ...ZONES[1],
    address: "11 de Septiembre 3287",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=11+de+Septiembre+3287+Mar+del+Plata",
  },
];

const Coverage = () => {
  return (
    <section id="cobertura" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Cobertura
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">2 sucursales en Mar del Plata</h2>
          <p className="mt-3 text-muted-foreground">
            Elegí la sucursal más cercana y empezá a manejar esta semana.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {branches.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:border-primary hover:shadow-elegant"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{b.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.address}, Mar del Plata</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                    <Phone className="h-4 w-4 text-primary" />
                    {b.display}
                  </p>
                  <div className="mt-3 rounded-lg border border-border bg-background/40 p-3">
                    <p className="text-[11px] font-black uppercase tracking-wider text-primary">
                      Barrios que cubre
                    </p>
                    <p className="mt-1 text-sm text-foreground/80">{b.barrios}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={waUrl(b.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackZoneConversion(b.id);
                        trackWhatsApp("cobertura_sucursales");
                      }}
                    >
                      <Button className="bg-[oklch(0.7_0.17_145)] font-bold uppercase text-white hover:bg-[oklch(0.65_0.17_145)]">
                        WhatsApp
                      </Button>
                    </a>
                    <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="font-bold">
                        Cómo llegar
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coverage;

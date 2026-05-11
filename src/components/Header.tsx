import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, ExternalLink, Car, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";
import logo from "@/assets/abc-logo.png";

const links = [
  { href: "#cursos", label: "Cursos" },
  { href: "#promos", label: "Promos" },
  { href: "#alquiler", label: "Alquiler de vehículo examen" },
  { href: "#como-contratar", label: "Cómo contratar" },
  { href: "#cobertura", label: "Zonas" },
  { href: "#contacto", label: "Contacto" },
];

const MATERIAL_ESTUDIO =
  "https://www.argentina.gob.ar/sites/default/files/manual_del_conductor_2024.pdf";
const MUNICIPALIDAD_TURNOS =
  "https://www.mardelplata.gob.ar/movilidadurbana/licenciasdeconducir";
const MUNICIPALIDAD_TURNOS_ONLINE =
  "https://turnos.mardelplata.gob.ar/";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-smooth ${
        scrolled
          ? "bg-background/90 backdrop-blur border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="ABC Conducción"
            className="h-10 w-auto md:h-12"
            width={120}
            height={48}
          />
          <span
            className={`hidden text-xs font-bold uppercase tracking-wider sm:inline ${
              scrolled ? "text-foreground/80" : "text-white/90"
            }`}
          >
            Servicio a Domicilio
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-smooth hover:text-primary ${
                scrolled ? "text-foreground/80" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}

          {/* Tramitá tu licencia dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLicenseOpen(true)}
            onMouseLeave={() => setLicenseOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-semibold transition-smooth hover:text-primary ${
                scrolled ? "text-foreground/80" : "text-white/90"
              }`}
              onClick={() => setLicenseOpen((v) => !v)}
              aria-expanded={licenseOpen}
            >
              Tramitá tu licencia
              <ChevronDown className="h-4 w-4" />
            </button>
            {licenseOpen && (
              <div className="absolute right-0 top-full w-96 rounded-xl border border-border bg-background p-4 shadow-elegant">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Pasos a tener en cuenta
                </p>
                <ol className="mt-2 space-y-2 text-sm text-foreground/80">
                  <li>
                    <span className="font-bold text-foreground">1. Obtené turnos para:</span>
                    <ul className="ml-4 mt-1 list-disc space-y-0.5 text-foreground/70">
                      <li>Trámite Original (examen médico + foto)</li>
                      <li>Charlas (Teórico principiante de Seguridad vial y Legislación)</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-bold text-foreground">2.</span> Realizado lo anterior, sacá turno para el examen teórico.
                  </li>
                  <li>
                    <span className="font-bold text-foreground">3.</span> Una vez aprobado el teórico, solicitá turno para el examen práctico (del cual se encarga la academia).
                  </li>
                </ol>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href={MUNICIPALIDAD_TURNOS_ONLINE}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Obtener Turnos
                      <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </a>
                  <a href={MUNICIPALIDAD_TURNOS} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="w-full">
                      Web Municipalidad MDP
                      <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>

          <a
            href={MATERIAL_ESTUDIO}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-smooth hover:text-primary ${
              scrolled ? "text-foreground/80" : "text-white/90"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Material de estudio
          </a>
        </nav>

        <div className="hidden lg:block">
          <ZoneDialog
            trigger={
              <Button className="bg-primary font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90">
                Inscribite
              </Button>
            }
          />
        </div>

        <button
          className={`rounded-md p-2 lg:hidden ${scrolled ? "text-foreground" : "text-white"}`}
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
              >
                {l.label}
              </a>
            ))}

            <a
              href="#alquiler"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-bold text-primary"
            >
              <Car className="h-4 w-4" />
              Alquiler de Vehículo
            </a>

            <div className="rounded-md border border-border px-3 py-2">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Tramitá tu licencia · Pasos a tener en cuenta
              </p>
              <ol className="mt-1 space-y-0.5 text-xs text-foreground/70">
                <li>1. Licencia Original · 2. Charlas · 3. Teórico · 4. Práctico</li>
              </ol>
              <div className="mt-2 flex flex-col gap-1.5">
                <a href={MUNICIPALIDAD_TURNOS_ONLINE} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="w-full">Sacar turno online</Button>
                </a>
                <a href={MUNICIPALIDAD_TURNOS} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="w-full">Info Municipalidad</Button>
                </a>
              </div>
            </div>

            <ZoneDialog
              trigger={
                <Button className="mt-2 w-full bg-primary font-bold uppercase text-primary-foreground hover:bg-primary/90">
                  Inscribite
                </Button>
              }
            />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

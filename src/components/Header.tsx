import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Car, FileCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";
import logo from "@/assets/abc-logo.png";

const links = [
  { href: "#cursos", label: "Cursos" },
  { href: "#promos", label: "Promos" },
  { href: "#como-contratar", label: "Cómo contratar" },
  { href: "#cobertura", label: "Zonas" },
  { href: "#contacto", label: "Contacto" },
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-smooth ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-card"
          : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className={`container mx-auto flex items-center justify-between px-4 transition-smooth ${scrolled ? "h-14 md:h-16" : "h-16 md:h-20"}`}>
        <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={scrollToTop}>
          <img
            src={logo}
            alt="ABC Conducción"
            className={`w-auto transition-smooth ${scrolled ? "h-9 md:h-11" : "h-11 md:h-14"}`}
          />
          <span
            className={`flex items-center text-[9px] font-light uppercase leading-tight tracking-wide sm:text-[10px] md:text-xs ${
              scrolled ? "text-foreground/70" : "text-white/80"
            }`}
          >
            Escuela de Conductores - Servicio a Domicilio
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          <button
            onClick={scrollToTop}
            className={`text-sm font-semibold transition-smooth hover:text-primary ${
              scrolled ? "text-foreground/80" : "text-white/90"
            }`}
          >
            Inicio
          </button>
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

          <a
            href="#licencia"
            className={`text-sm font-semibold transition-smooth hover:text-primary ${
              scrolled ? "text-foreground/80" : "text-white/90"
            }`}
          >
            Tramitá tu licencia
          </a>

          <Link
            to="/examen-teorico"
            className={`rounded-full border px-3 py-1.5 text-sm font-bold transition-smooth hover:border-primary hover:text-primary ${
              scrolled
                ? "border-primary/40 text-primary"
                : "border-white/40 text-white hover:bg-white/10"
            }`}
          >
            <GraduationCap className="mr-1.5 inline h-4 w-4" />
            Simulador Teórico
          </Link>
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
            <button
              onClick={() => {
                setOpen(false);
                scrollToTop();
              }}
              className="rounded-md px-3 py-2 text-left text-sm font-semibold text-foreground hover:bg-muted"
            >
              Inicio
            </button>
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

            <Link
              to="/examen-teorico"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-elegant"
            >
              <GraduationCap className="h-4 w-4" />
              Simulador Teórico / Examen Online
            </Link>

            <a
              href="#alquiler"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-bold text-primary"
            >
              <Car className="h-4 w-4" />
              Alquiler de Auto para Examen
            </a>

            <a
              href="#licencia"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-bold text-primary"
            >
              <FileCheck className="h-4 w-4" />
              Tramitá tu Licencia
            </a>

            <ZoneDialog
              trigger={
                <Button className="mt-2 h-12 w-full bg-primary text-base font-bold uppercase text-primary-foreground hover:bg-primary/90">
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

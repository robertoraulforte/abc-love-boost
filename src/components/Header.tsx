import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Car, FileCheck } from "lucide-react";
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
            Escuela de Conductores - Servicio a Domicilio
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

          <a
            href="#licencia"
            className={`text-sm font-semibold transition-smooth hover:text-primary ${
              scrolled ? "text-foreground/80" : "text-white/90"
            }`}
          >
            Tramitá tu licencia
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
